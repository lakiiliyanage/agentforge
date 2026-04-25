@AGENTS.md
@WEEK_1_GUIDE.md
@WEEK_2_GUIDE.md

# AgentForge — Project Stack & Version Reference

Always generate code targeting the exact versions below. Never suggest or generate code for older patterns (e.g. Next.js middleware.ts, tailwind.config.js, useFormState, anon/service_role key names) unless explicitly asked.

## Current Stack Versions

| Technology | Version | Key behaviour change from older versions |
|---|---|---|
| **Next.js** | 16.2.4 | `middleware.ts` → `proxy.ts`, export must be named `proxy` |
| **React** | 19.2.4 | Server Actions stable (`'use server'`), `useActionState` replaces `useFormState` |
| **Tailwind CSS** | 4.x | No `tailwind.config.js` — config lives in `globals.css` via `@import "tailwindcss"` and `@theme` |
| **@supabase/ssr** | 0.10.2 | `cookies()` from `next/headers` must be **awaited** |
| **@supabase/supabase-js** | 2.104.1 | Publishable key (`sb_publishable_...`) replaces old `anon` key |
| **TypeScript** | 5.x | Standard — no special changes |
| **ESLint** | 9.x | Flat config (`eslint.config.mjs`) — no `.eslintrc.json` |

## Key Patterns for This Stack

**Auth proxy file (Next.js 16):**
```typescript
// src/proxy.ts — NOT middleware.ts
export async function proxy(request: NextRequest) { ... }
export const config = { matcher: [...] }
```

**Server Actions (React 19):**
```typescript
// src/app/auth/signup/actions.ts
'use server'
export async function signUpAction(formData: FormData) {
  const supabase = await createClient() // cookies() must be awaited
  ...
}
```

**Supabase server client (SSR 0.10.x):**
```typescript
import { cookies } from 'next/headers'
const cookieStore = await cookies() // must be awaited
const supabase = createServerClient(URL, KEY, { cookies: { ... } })
```

**Tailwind v4 — no config file:**
```css
/* globals.css */
@import "tailwindcss";
/* Custom tokens go here via @theme, not tailwind.config.js */
```

**Supabase API keys (2025 UI):**
- Publishable key (`sb_publishable_...`) = browser-safe, used as `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- Secret key (`sb_secret_...`) = server only, never `NEXT_PUBLIC_`
- Project URL = found at Settings → Data API (not Settings → General)

## Environment Variables
```
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sb_publishable_...
SUPABASE_SERVICE_ROLE_KEY=sb_secret_...   ← server only, added in Week 10
```

## Claude Code Prompt Template

When asking Claude Code to build anything, always include version context:

```
I'm building AgentForge — a visual AI agent builder for non-developers.
Stack: Next.js 16.2.4, React 19, TypeScript, Tailwind CSS v4, @supabase/ssr 0.10.2.
- Use proxy.ts (not middleware.ts) for session handling
- Use Server Actions ('use server') for form submissions
- Await cookies() from next/headers
- Tailwind v4: no tailwind.config.js, CSS-based config only
- Supabase keys: Publishable key = NEXT_PUBLIC_SUPABASE_ANON_KEY
```
