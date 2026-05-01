import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

const methodNotAllowed = () =>
  NextResponse.json(
    { error: 'Method not allowed.' },
    { status: 405, headers: { Allow: 'DELETE' } }
  )

export const GET   = methodNotAllowed
export const POST  = methodNotAllowed
export const PUT   = methodNotAllowed
export const PATCH = methodNotAllowed

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

    // ── Authentication ──────────────────────────────────────────────
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorised — not logged in.' },
        { status: 401 }
      )
    }

    // ── Existence + ownership check ─────────────────────────────────
    // Select only id and user_id — we don't need the full row.
    // RLS is still active here: private agents owned by other users won't
    // be returned at all (they'll look like 404). Public agents owned by
    // other users will be returned but fail the user_id check below (403).
    const { data: agent } = await supabase
      .from('agents')
      .select('id, user_id')
      .eq('id', id)
      .single()

    if (!agent) {
      return NextResponse.json(
        { error: 'Agent not found.' },
        { status: 404 }
      )
    }

    if (agent.user_id !== user.id) {
      return NextResponse.json(
        { error: 'Forbidden — this agent belongs to another user.' },
        { status: 403 }
      )
    }

    // ── Delete ──────────────────────────────────────────────────────
    try {
      const { error: deleteError } = await supabase
        .from('agents')
        .delete()
        .eq('id', id)
        .eq('user_id', user.id)  // redundant with RLS but explicit is safer

      if (deleteError) throw deleteError
    } catch {
      return NextResponse.json(
        { error: 'Failed to delete agent — please try again.' },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true }, { status: 200 })

  } catch {
    return NextResponse.json(
      { error: 'An unexpected error occurred. Please try again.' },
      { status: 500 }
    )
  }
}
