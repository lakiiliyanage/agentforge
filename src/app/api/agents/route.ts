import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

// Next.js App Router automatically returns 405 for methods that have no
// named export, but these explicit handlers ensure the response is JSON
// with a consistent shape — not the framework's plain-text default.
const methodNotAllowed = () =>
  NextResponse.json(
    { error: 'Method not allowed.' },
    { status: 405, headers: { Allow: 'POST' } }
  )

export const GET    = methodNotAllowed
export const PUT    = methodNotAllowed
export const PATCH  = methodNotAllowed
export const DELETE = methodNotAllowed

export async function POST(request: Request) {
  // Outer catch — guards against anything unexpected (malformed JSON body,
  // a thrown exception we didn't predict) so the server never crashes.
  try {

    // ── Authentication ──────────────────────────────────────────────
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorised — please sign in.' },
        { status: 401 }
      )
    }

    // ── Validation ──────────────────────────────────────────────────
    const body = await request.json()
    const { name, description, personality, goal } = body

    // Collect every empty field so the error message names them all at once.
    // .trim() is essential — a field filled with spaces must count as missing.
    const missing = (
      [
        ['name',        name],
        ['description', description],
        ['personality', personality],
        ['goal',        goal],
      ] as [string, unknown][]
    )
      .filter(([, v]) => !v || !String(v).trim())
      .map(([k]) => k)

    if (missing.length > 0) {
      return NextResponse.json(
        { error: `Missing required fields: ${missing.join(', ')}.` },
        { status: 400 }
      )
    }

    // ── Database ────────────────────────────────────────────────────
    // Inner try/catch keeps DB errors separate from unexpected errors so
    // we can return a specific 500 message rather than the generic fallback.
    let agent
    try {
      const { data, error } = await supabase
        .from('agents')
        .insert({
          user_id:     user.id,
          name:        String(name).trim(),
          description: String(description).trim(),
          config: {
            personality: String(personality).trim(),
            goal:        String(goal).trim(),
          },
        })
        .select()   // return the inserted row
        .single()   // unwrap the array into a single object

      // Supabase signals insert failure via the error field, not a thrown
      // exception — re-throw so the catch below handles it uniformly.
      if (error) throw error

      agent = data
    } catch {
      // Raw Supabase errors (e.g. "duplicate key value violates unique
      // constraint …") can reveal table/column names. Never forward them.
      return NextResponse.json(
        { error: 'Failed to save agent — please try again.' },
        { status: 500 }
      )
    }

    return NextResponse.json(agent, { status: 201 })

  } catch {
    return NextResponse.json(
      { error: 'An unexpected error occurred. Please try again.' },
      { status: 500 }
    )
  }
}
