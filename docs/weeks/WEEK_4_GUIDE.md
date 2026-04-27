# Week 4 Guide — Supabase: Your Backend in a Weekend 🗄️

> **Goal:** Connect AgentForge to a real, live database. By Sunday night users will be able to sign up, log in, and have their agent data saved — and you'll understand exactly how that works.
> **Time:** 8–10 hours total — Saturday 3pm–7pm (4 hrs) + Sunday 3pm–7pm (4 hrs) + stretch tasks (+1–2 hrs)
> **Prerequisite:** Week 3 complete — AgentForge scaffolded locally, Navbar and Footer wired up, `.env.local` created with placeholder values, landing page live at `localhost:3000`

---

## Why This Week Matters

Weeks 1–3 were all about the *front end* — what users see. Week 4 is the moment your app becomes *real*. Without a database, your app is a beautiful static brochure. With a database, it's a product.

Here's what changes this weekend:

- A user types their email and creates an account → their data is stored forever, securely
- That same user logs back in tomorrow → their account is waiting for them
- They create an agent → it's saved to a table, tied to their user ID, invisible to everyone else
- You look at the Supabase dashboard → you can see every user, every agent, every timestamp

This is the infrastructure layer every SaaS product in the world runs on. And Supabase means you can set all of it up in a weekend instead of hiring a backend team.

**The database mental model for designers:** Think of Supabase as a *very smart, very strict spreadsheet*. Each table is a sheet. Each column is a defined field with a type (text, number, date, boolean). Each row is a record. The "very smart" part: it auto-generates APIs for every table, handles authentication, enforces who can see what row, and scales to millions of users — all from a dashboard that looks and feels like Notion.

---

## 8–10 Hour Overview

| Session | Hours | Focus |
|---------|-------|-------|
| Saturday 3–5pm | 1–2 | What is a database? Supabase setup + create your first table |
| Saturday 5–7pm | 3–4 | Supabase Auth — real signup and login working in your app |
| Sunday 3–5pm | 5–6 | SQL basics in the Supabase editor — read and write data confidently |
| Sunday 5–7pm | 7–8 | Style the auth pages + Row Level Security + User Profile page |
| Stretch (+1–2 hrs) | 9–10 | Admin exploration + advanced RLS + bonus SQL challenges |

---

## What You're Learning This Week

| Concept | What it is | Design analogy |
|---------|-----------|----------------|
| Database | Structured, persistent storage for your app's data | A spreadsheet that never closes and never loses data |
| Table | A named collection of rows with defined columns | A sheet in that spreadsheet — one topic per sheet |
| Row Level Security (RLS) | Rules that control which user can see which rows | Like Figma view permissions — User A's file is invisible to User B |
| Authentication | Proves a user is who they claim to be | The login gate — like an app requiring your Apple ID |
| JWT token | A secure, signed string proving you're logged in | A wristband at an event — you show it instead of re-buying a ticket |
| SQL | The language for querying database tables | Like a filter in Figma Inspect — `SELECT * FROM agents WHERE user_id = 'mine'` |
| Environment variables | Secret configuration values your app reads at startup | Like Figma tokens — the values are defined once, referenced everywhere, never hardcoded |

---

## 📋 Before You Start — Environment Verification

Open your terminal, navigate to your `agentforge` folder, and confirm your environment is still working:

```bash
cd ~/agentforge
node --version          # should print v18.x or higher
npm run dev             # should start Next.js at localhost:3000
```

Open `localhost:3000` in your browser — confirm the landing page loads with the Navbar and Footer. Then stop the dev server (`Ctrl + C`) before continuing.

Also confirm your `.env.local` still has the placeholder values from Week 3:

```bash
cat .env.local
```

You should see the `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` placeholders. You'll replace these with real values in Hour 1.

---

## Hours 1–2: What Is a Database? Supabase Setup

### The Mental Model First

Before touching any tool, let's build the right mental model.

Your AgentForge app will have four main tables:

| Table | What it stores | One row = |
|-------|---------------|-----------|
| `users` | Accounts (managed by Supabase Auth automatically) | One person |
| `agents` | AI agents users have created | One agent config |
| `messages` | Chat history for each agent session | One chat message |
| `subscriptions` | Who is on the free vs. pro plan | One user's billing status |

This week you're setting up `users` (via Supabase Auth — no work needed) and `agents` (your first custom table).

**Design analogy — Figma teams vs. your database:**
- Supabase Auth `users` = your Figma account. Managed for you. You just sign in.
- Your `agents` table = a Figma file. You own it. You control who sees it.
- Row Level Security = Figma's sharing permissions. Your file, your rules.

### Task 1 — Create Your Supabase Account, Organisation and Project

Go to [supabase.com](https://supabase.com) and sign up (free, no credit card needed).

**Step 1 — Create an Organisation**

Supabase groups projects under organisations — think of it like a Figma team workspace. Every project must belong to one.

Once logged in you'll be prompted to create your first organisation:
- **Organisation name:** `Lakii` (or your name / studio name — this is just for you)
- **Type:** Personal (for solo work)
- Click **Create organisation**

> **Why organisations?** When you start working with clients or co-founders, you'll create separate organisations for each. For now, one personal org is all you need.

**Step 2 — Create a Project**

Inside your organisation, click **New Project** and set these values:
- **Name:** `agentforge`
- **Database Password:** click Generate, then copy it into your password manager (you'll need this occasionally for direct database access)
- **Region:** pick the one closest to you
- Click **Create new project**

Supabase will take about 60 seconds to provision your project — it's spinning up a real PostgreSQL database in the cloud.

While it loads, ask Claude Code:

> *"Explain what PostgreSQL is, how it relates to Supabase, and what 'provisioning a database' actually means — like I'm a designer who's never touched backend infrastructure."*

### Task 2 — Get Your API Keys

Supabase updated their API key UI in 2025 — here's exactly where everything lives now:

**Step 1 — Get your Project URL**

Supabase moved the Project URL out of General settings. You can find it in either of these two places — both work:

**Option A — Settings → Data API:**
In the left sidebar, scroll to the **Integrations** section and click **Data API**. Your Project URL is listed at the top of that page (looks like `https://your-project-id.supabase.co`).

**Option B — The Connect button:**
Click the green **Connect** button at the top of the Supabase dashboard. The URL is shown in the connection details panel that opens.

Copy the URL from whichever you find first.

**Step 2 — Get your Publishable key**

Go to **Settings → API Keys** in the Supabase sidebar. You'll land on the **"Publishable and secret API keys"** tab by default:

| Section | Key prefix | What it is | Safe to expose? |
|---------|-----------|------------|-----------------|
| **Publishable key** | `sb_publishable_...` | Read-limited key for client/browser code | Yes — Row Level Security protects it |
| **Secret key** | `sb_secret_...` | Full admin access, bypasses all security | **NO — server only, never in frontend code** |

> **Note:** You may also see a **"Legacy anon, service_role API keys"** tab — this is the old format. Ignore it and use the new **Publishable key** instead; it serves exactly the same role as the old `anon` key.

Copy the **Publishable key**. Open your `.env.local` file and replace the placeholders:

```
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sb_publishable_YeomsytteU16...
```

Save the file. These are now your real Supabase credentials.

> **Why NEXT_PUBLIC_?** Variables prefixed with `NEXT_PUBLIC_` are embedded into the browser-side JavaScript bundle. The Supabase URL and Publishable key are *meant* to be browser-visible — Row Level Security is what makes this safe. The **Secret key** (`sb_secret_...`) should never have this prefix and should only ever be used in server-side code.

### Task 3 — Install the Supabase Client Library

In your terminal (stop `npm run dev` first if it's running):

```bash
npm install @supabase/supabase-js @supabase/ssr
```

`@supabase/js` is the core library. `@supabase/ssr` is the Server-Side Rendering helper that makes Supabase work correctly with Next.js App Router (it handles cookie-based sessions properly).

Verify the install:
```bash
cat package.json | grep supabase
```

You should see both packages listed under `dependencies`.

### Task 4 — Create the Supabase Client

Ask Claude Code:

> *"Create a Supabase client setup for my Next.js App Router project at `src/lib/supabase/client.ts` (for client components) and `src/lib/supabase/server.ts` (for server components). Use `@supabase/ssr`. Read my `.env.local` to get the variable names right."*

Once it's done, open both files and read them. You don't need to memorise the code — but understand the concept: there are **two** Supabase clients:

- **Client client** (`client.ts`) — runs in the browser. Used in `'use client'` components. Handles auth state changes, real-time subscriptions.
- **Server client** (`server.ts`) — runs on the server during page rendering. Used in Server Components and API routes. Has access to the user's session from cookies.

This distinction will matter every time you fetch data in Week 5.

### Task 5 — Create the `agents` Table

In Supabase, go to **Table Editor → New Table**.

Create a table called `agents` with these columns:

| Column name | Type | Default | Notes |
|-------------|------|---------|-------|
| `id` | `uuid` | `gen_random_uuid()` | Primary key — auto-generated |
| `user_id` | `uuid` | none | Links to the auth user |
| `name` | `text` | none | Agent's display name |
| `description` | `text` | *(leave empty)* | What this agent does |
| `config` | `jsonb` | `{}` | Flexible JSON for tools, personality, etc |
| `is_public` | `boolean` | `false` | Whether the agent is publicly shareable |
| `created_at` | `timestamptz` | `now()` | Auto-set on insert |
| `updated_at` | `timestamptz` | `now()` | You'll update this manually |

Click **Save**.

> **Why `jsonb` for config?** JSON columns let you store flexible, schema-less data inside a structured table. Your agent config will evolve over weeks — new tools, new personality fields, new settings. Storing it as JSON means you don't have to modify the table schema every week. The `b` in `jsonb` means "binary" — it's faster to query than plain `json`.

**Commit your progress:**

```bash
git add .
git commit -m "chore: install Supabase client libraries and create Supabase utility files"
git push
```

---

## 🧪 Knowledge Check — Databases (Answer Before Moving On)

Write your answers in a comment at the top of `src/lib/supabase/client.ts` — this forces you to actually absorb the concepts rather than just read them.

1. What is the difference between the **Publishable key** (`sb_publishable_...`) and the **Secret key** (`sb_secret_...`)? When would you use each?
2. Why does AgentForge need two Supabase clients (client-side and server-side) instead of one?
3. You store agent config as `jsonb` instead of separate columns. Name one advantage and one disadvantage of this approach.
4. If Row Level Security is what protects the Publishable key — what happens if you forget to enable RLS on a table?

> **Answers:**
>
> **(1)** Publishable key (`sb_publishable_...`) is browser-safe — Row Level Security limits what it can access. Secret key (`sb_secret_...`) bypasses all security rules entirely — server only, never in frontend code. You'll use the Secret key in Week 10 for Stripe webhooks and the admin dashboard.
>
> **(2)** Your Next.js app runs code in two places — the browser and the server — and sessions are handled differently in each. Here's the architecture:
>
> ```
> ┌─────────────────────────────┐     ┌──────────────────────────────────┐
> │        BROWSER              │     │        SERVER (Next.js)          │
> │                             │     │                                  │
> │  'use client' component     │     │  Server Component                │
> │  e.g. a chat input box      │     │  e.g. dashboard page loading     │
> │                             │     │  your agents list                │
> │  createBrowserClient()      │     │  createServerClient()            │
> │  ↓                          │     │  ↓                               │
> │  Reads session from         │     │  Reads session from              │
> │  cookie via JavaScript      │     │  HTTP request headers            │
> └──────────┬──────────────────┘     └────────────┬─────────────────────┘
>            │                                      │
>            └──────────────┬───────────────────────┘
>                           ↓
>                    Supabase API
>               (your PostgreSQL database)
> ```
>
> If you used only one client type in both places, sessions would silently fail — you'd get logged-out errors on server-rendered pages even when the user is authenticated. The two clients use the same session (stored in a cookie), just read it in the way each environment supports.
>
> **Version note for your stack:** In Next.js 16 (`proxy.ts`), React 19, and `@supabase/ssr` 0.10.x, one additional rule applies: the `cookies()` function from `next/headers` must be **awaited** before use in the server client. Claude Code will handle this automatically if you include your version numbers in the prompt.
>
> **(3)** Advantage: `jsonb` is flexible — you can add new fields to the agent config (new tools, new personality settings) without ever modifying the table schema. This matters because Weeks 7 and 8 will add a lot of new config fields you can't fully predict right now. Disadvantage: querying *inside* the JSON is more complex — for example, filtering "all agents with web search enabled" requires a special `->` or `@>` operator rather than a simple `WHERE`.
>
> **Should you change `config` from `jsonb` to separate columns now?**
> **No — keep `jsonb` for config, and here's why.** The agent config is genuinely evolving data. By Week 8 it will contain: tool toggles, tone sliders, example phrases, topic restrictions, and more. Flattening that into separate columns now would mean running database migrations every week as new fields are added. The right pattern — which AgentForge already uses — is a hybrid: put fields you'll *filter or sort by* as proper columns (`is_public`, `user_id`, `name`), and keep the flexible, UI-driven config data in `jsonb`. The one column worth considering adding as a separate field is `agent_type` (Customer Support / Research / etc.) since you may want to filter the Explore page by type in Week 9 — but that can wait until Week 7 when the builder UI is designed and you know exactly what types exist.
>
> **(4)** Any user with your Publishable key (which is visible in the browser's network tab — always) can query your entire `agents` table and read every row from every user. RLS being on is what makes it safe to ship the Publishable key in frontend code at all.

---

## Hours 3–4: Supabase Auth — Real Signup and Login

### The Auth Mental Model

Supabase Auth is a complete, managed authentication system. You don't write login logic, password hashing, session management, or security from scratch. Supabase handles all of that — you just call their API and build the UI.

The flow works like this:

```
User submits email + password
       ↓
Supabase Auth validates credentials
       ↓
Supabase returns a JWT (JSON Web Token)
       ↓
Your app stores the JWT in a cookie
       ↓
Every subsequent request includes the cookie
       ↓
Supabase confirms the user is who they claim to be
       ↓
Your database RLS policies allow/deny access based on user ID
```

From a user's perspective: they type a password once and stay logged in. From your perspective: an opaque token proves who they are on every request.

### Task 6 — Set Up Supabase Auth in Your App

> **Next.js 16 note:** In Next.js 16, `middleware.ts` was renamed to `proxy.ts` and the exported function must be named `proxy` (not `middleware`). Your project is on **Next.js 16.2.4**, so all instructions use `proxy.ts`. If you see older tutorials using `middleware.ts`, that's the pre-v16 pattern — ignore it.

Ask Claude Code:

> *"Set up Supabase authentication for my Next.js 16 App Router project. I'm using Next.js 16.2.4, React 19, @supabase/ssr 0.10.2, and TypeScript. Create: a `src/proxy.ts` file (Next.js 16 uses proxy.ts instead of middleware.ts) that refreshes the user's session on every request and exports a function named `proxy`, a `src/app/auth/login/page.tsx` with email/password login form, a `src/app/auth/signup/page.tsx` with email/password signup form, and a redirect so visiting `/dashboard` while not logged in sends users to `/auth/login`. Note: in @supabase/ssr 0.10.x the `cookies()` function from next/headers must be awaited. Keep the UI minimal for now — we'll style it in Hour 7."*

Let it run completely. This is a substantial amount of code — a proxy file, two page files, possibly a server action file. Let Claude Code finish before asking questions.

### Task 7 — Understand What Was Just Built

Ask Claude Code:

> *"Walk me through what `src/proxy.ts` does — explain each part like I'm a designer who understands flow but not server internals. Specifically: what is a proxy file in Next.js 16, when does it run, and what does 'refreshing a session' mean in practice?"*

Then read the files Claude Code created. With **React 19 + Next.js 16**, Claude Code will use **Server Actions** — meaning the Supabase logic lives in a separate `actions.ts` file, not directly inside the page components. This is the correct modern pattern. Here's what to look for and where:

| What to find | Where it lives | Why |
|---|---|---|
| `supabase.auth.signUp` | `src/app/auth/signup/actions.ts` | Server Action — runs on the server when the form submits |
| `supabase.auth.signInWithPassword` | `src/app/auth/login/actions.ts` | Same — server-side form handler |
| `try/catch` error handling | `actions.ts` — wrapping the Supabase calls | Errors caught server-side, returned to the page |
| `redirect('/dashboard')` | `actions.ts` — after a successful call | Redirect happens on the server, before the browser does anything |
| The `<form>` element | `signup/page.tsx` and `login/page.tsx` | Page files are the UI shell only — their `action` prop calls the function in `actions.ts` |

**What is a Server Action?** A function marked with `'use server'` at the top of the file. When a form submits, it calls this function directly on the server — no API route needed, no `fetch()` call. React 19 made Server Actions stable and this is now the standard pattern for forms in Next.js App Router.

> **If you can't find an `actions.ts` file** — Claude Code may have put the logic inline in the page instead. Either approach works. Ask Claude Code: *"Where is `supabase.auth.signUp` called in my signup flow? Walk me through the file it's in."*

Locate each item above before moving on — understanding where the logic lives is more important than memorising the syntax.

---

## 🔍 Deep Dive: proxy.ts & Your Web Infrastructure

These are the questions every developer asks when they first encounter proxy.ts. Work through them now — understanding this section will make the rest of the course make more sense.

---

### What does proxy.ts actually do, line by line?

Here's what Claude Code will generate. Read it once before asking it to explain:

```typescript
import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function proxy(request: NextRequest) {
  // 1. Start by assuming we'll pass the request through normally
  let supabaseResponse = NextResponse.next({ request })

  // 2. Create a Supabase server client that can read/write cookies
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll() // read all cookies from the request
        },
        setAll(cookiesToSet) {
          // write updated cookies back to both request and response
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          )
          supabaseResponse = NextResponse.next({ request })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  // 3. Ask Supabase: is there a valid logged-in user for this request?
  //    This also silently refreshes an expiring JWT if needed
  const { data: { user } } = await supabase.auth.getUser()

  // 4. If no user AND the URL is not an auth page → redirect to login
  if (!user && !request.nextUrl.pathname.startsWith('/auth')) {
    const url = request.nextUrl.clone()
    url.pathname = '/auth/login'
    return NextResponse.redirect(url)
  }

  // 5. Otherwise, let the request continue to the page
  return supabaseResponse
}

// 6. Tell Next.js which URLs this proxy function should run on
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|.*\\.png$).*)'],
}
```

**In plain English, the file does exactly five things:**
1. Receives every incoming page request before anything renders
2. Creates a temporary Supabase connection that can read the session cookie
3. Asks Supabase "is this user logged in?" — and silently refreshes the token if it's about to expire
4. If not logged in and trying to access a protected page → redirect to login
5. If logged in → let the page render normally

---

### What is "refreshing a session" in practice?

When you log in, Supabase gives your browser a JWT token with an expiry (typically 1 hour). After 1 hour, the token is technically expired — but Supabase also gives a *refresh token* (valid for 7 days). The proxy's job is to silently swap the expired JWT for a fresh one using the refresh token before the page renders, so users never see a "you've been logged out" error just because an hour passed. Without the proxy doing this, sessions would randomly expire mid-session.

**Design analogy:** Your wristband at a festival expires at midnight, but there's a renewal desk at the entrance. Every time you walk through the gate, the proxy checks your wristband — if it's about to expire, it swaps it for a fresh one while you're walking, before you even reach the stage.

---

### "It runs server-side, before React" — what does that mean?

This is one of the most important mental models in web development.

**What React does:** React is a JavaScript library that runs *in your browser*. It takes your components (like `<AgentCard />`, `<Navbar />`) and turns them into actual HTML elements on screen. When you click a button and the UI updates without a page reload — that's React working in the browser. React is the *client-side* layer: it manages what the user sees and interacts with.

**What "server-side" means:** Your Next.js app also runs on a server — a computer in a data centre (Vercel's infrastructure) that your browser never directly sees. When you navigate to a URL, your browser sends a request to that server. The server runs code, builds the page, and sends back HTML. That server-side code has access to things the browser doesn't: environment variables, direct database queries, the full HTTP request including all headers.

**The sequence when you navigate to `/dashboard`:**

```
1. Your browser sends: GET /dashboard
          ↓
2. Hits Vercel's server (not your browser)
          ↓
3. proxy.ts runs — checks session, redirects if needed
          ↓
4. Next.js Server Components render — fetch data from Supabase
          ↓
5. HTML is assembled on the server and sent to your browser
          ↓
6. React hydrates in your browser — attaches event listeners,
   makes the page interactive
          ↓
7. 'use client' components take over for any interactive elements
```

React doesn't even start until step 6. By then, the proxy has already run, the session has been verified, the data has been fetched, and the HTML is already in your browser.

---

### User types a URL → hits your server. Why doesn't it hit the browser (client) first?

This trips up everyone the first time. Here's the key: **the browser IS the client**. It's the thing making the request, not receiving it.

When you type `agentforge.com` in your browser:
1. Your browser looks up which server hosts `agentforge.com` (via DNS — more on this below)
2. Your browser sends an HTTP GET request to that server
3. Vercel's server receives the request, runs your Next.js code (including proxy.ts), builds the page
4. The server sends back HTML, CSS, and JavaScript
5. *Now* your browser (client) executes that JavaScript — this is where React runs

The client never runs *before* the server responds, because the client *is* the browser and the browser doesn't have your app's code until the server sends it. The first thing that runs is always server-side — your browser is just waiting for the response.

**Analogy:** You (the browser/client) call a restaurant (the server) to order food. The restaurant prepares the meal (runs server-side code). They deliver it to you (send HTML). You then eat it (React renders the UI). You can't eat before they've cooked it.

---

### What does the `matcher` regex mean?

```typescript
matcher: ['/((?!api|_next/static|_next/image|favicon.ico|.*\\.png$).*)']
```

**First: what is regex?**

Regex (Regular Expression) is a pattern-matching language for text strings. It lets you describe complex patterns like "any URL that starts with `/` but doesn't contain the word `api`" in a single compact line. It looks cryptic but follows strict rules — every symbol means something specific.

**Breaking down this regex piece by piece:**

| Part | What it means |
|------|---------------|
| `/` | Match URLs that start with `/` (all URLs do) |
| `(` `)` | Group everything inside together |
| `(?!...)` | Negative lookahead — "do NOT match if followed by..." |
| `api` | Skip URLs starting with `/api` (your API routes) |
| `\|` | OR |
| `_next/static` | Skip Next.js static asset files |
| `_next/image` | Skip Next.js image optimisation routes |
| `favicon.ico` | Skip the browser tab icon request |
| `.*\\.png$` | Skip any URL ending in `.png` |
| `.*` | Match everything else (any characters, any length) |

**In plain English:** Run `proxy.ts` on every URL *except* API routes, static files, images, and icons. Those exceptions exist because you don't need to check auth on a request for a `.png` file — it's pointless overhead. Only actual pages need the session check.

---

### What is Cloudflare / a Domain Registrar?

**Domain Registrar:** A company that sells and manages domain names — the human-readable addresses like `agentforge.com`. You pay them ~$10–15/year to "own" the name. Popular registrars: Namecheap, Google Domains, GoDaddy. When you buy a domain, you can tell it to point to any server you want.

**Cloudflare:** Cloudflare does several things, but the most relevant ones for your stack:
- It can act as a domain registrar (buy domains there at near cost price)
- It sits in front of your server as a proxy/CDN — caching your pages globally so they load fast everywhere
- It provides DDoS protection — absorbs attack traffic before it reaches Vercel
- It handles SSL certificates (the `https://` padlock)

For AgentForge in its early stage: buy your domain from Namecheap or Cloudflare, point it at Vercel (Vercel handles the SSL automatically), and optionally put Cloudflare in front for performance. You'll set this up in Week 11.

---

### What is DNS, and how is it different from a domain?

**The domain** is the name: `agentforge.com`. It's human-readable, memorable, and what your users type. You own this name via a registrar.

**DNS (Domain Name System)** is the global phonebook that translates that name into a server's IP address (the actual numerical address of the computer hosting your app, like `76.223.126.88`). Computers don't know what `agentforge.com` means — they only know IP addresses. DNS is what bridges the gap.

```
User types: agentforge.com
       ↓
DNS lookup: "What IP address is agentforge.com?"
       ↓
DNS returns: 76.223.126.88  (Vercel's server)
       ↓
Browser sends request to: 76.223.126.88
       ↓
Vercel's server responds with your Next.js app
```

**The difference:** Domain = the name you own and pay for yearly. DNS = the system that maps that name to a real server. You configure DNS records (called A records, CNAME records) in your registrar's dashboard or Cloudflare to point your domain at Vercel.

---

### What is the difference between Vercel, Supabase, and a Domain Registrar?

These are three completely different layers of your infrastructure — they each handle a different part of making your app work.

| | Vercel | Supabase | Domain Registrar |
|--|--------|----------|-----------------|
| **What it is** | A hosting platform for your code | A backend-as-a-service platform | A company that sells/manages domain names |
| **What it stores** | Your Next.js code, API routes, static files | Your database, user accounts, file storage | Your domain name registration and DNS records |
| **What it runs** | proxy.ts, Server Components, API routes — your app logic | PostgreSQL queries, Row Level Security rules, auth | Nothing — it just maps your domain to an IP |
| **Who calls it** | Your browser (via HTTP requests) | Your app's server-side code (and sometimes browser-side) | Your browser (invisibly, to look up the IP address) |
| **Analogy** | The kitchen of your restaurant — where the food is prepared | The walk-in fridge — where all the ingredients are stored | The street sign and address — how customers find the restaurant |
| **Cost** | Free tier, then $20/month | Free tier, then $25/month | ~$10–15/year per domain |
| **When you set it up** | Week 11 (deployment) | Week 4 — right now | Week 11 alongside Vercel |

**How they connect for a live request:**

```
User types agentforge.com
       ↓
Registrar/DNS: resolves agentforge.com → Vercel's IP
       ↓
Vercel: runs proxy.ts → renders your Next.js pages
       ↓
Supabase: Vercel queries for user data, agents, auth checks
       ↓
Vercel: assembles HTML and sends it back to the browser
       ↓
Browser: React hydrates, user sees the page
```

Right now on `localhost:3000`, you're bypassing the registrar and DNS entirely — your computer is acting as both the "user's browser" and the "server". Vercel and the real domain only matter in Week 11 when you go live.

---

### Task 8 — Test the Auth Flow

Start your dev server:

```bash
npm run dev
```

Open `localhost:3000/auth/signup` in your browser. Create a real account with your email address.

Go to your Supabase dashboard → **Authentication → Users**. You should see your email listed there. This is your user record in the cloud.

Now test login:
1. Open `localhost:3000/auth/login`
2. Log in with the account you just created
3. Confirm you land on `/dashboard`

Now test the redirect:
1. Open a new incognito window
2. Go directly to `localhost:3000/dashboard`
3. Confirm you get redirected to `/auth/login`

If any of these three tests fail, paste the error into Claude Code and ask it to fix the issue before continuing.

### Task 9 — Add a Sign-Out Function

Ask Claude Code:

> *"Add a sign-out button to the Navbar component. When clicked, it should call `supabase.auth.signOut()` and redirect the user to `/auth/login`. The sign-out button should only show when the user is logged in — it should be hidden when the user is logged out."*

Test it: log in, click sign out, confirm you land at the login page.

**Commit all auth work:**

```bash
git add .
git commit -m "feat: add Supabase auth — signup, login, signout, proxy session handling"
git push
```

---

## 🧪 Knowledge Check — Authentication (Answer These Before the SQL Section)

1. What is a JWT token? Where does your app store it after login?
2. What does the `proxy.ts` file do, and why does it need to run on every request?
3. You have `supabase.auth.signUp` and `supabase.auth.signInWithPassword`. What is the exact difference in what they do to the database?
4. A user logs in, closes their browser, and opens it the next day. Are they still logged in? Why or why not?
5. What would happen to the dashboard if you removed `proxy.ts` entirely?

> **Answers:** (1) A cryptographically signed string encoding the user's ID and expiry. Stored in an HTTP-only cookie. (2) It refreshes the session cookie on every page load — without it, sessions expire unexpectedly. (3) signUp creates a new row in `auth.users`. signInWithPassword validates credentials against that row. (4) Yes — the cookie has a long expiry, typically 7 days or more, and refreshes on activity. (5) Logged-out users could access `/dashboard` directly — the page would load but with no user data.

---

## Hours 5–6: SQL Basics in the Supabase Editor

### Why Learn SQL at All?

You might be wondering — if Supabase auto-generates APIs, why learn SQL? Three reasons:

1. **Debugging:** When something doesn't show up in your UI, the fastest way to check is a raw SQL query
2. **Understanding:** The Supabase dashboard's visual table editor is just writing SQL in the background — knowing SQL makes you understand what it's actually doing
3. **Control:** Row Level Security policies *are* SQL. Migrations *are* SQL. Some data operations are only possible in SQL.

The good news: you need to know about 6 commands, and they read almost like plain English.

### The SQL Survival Kit

Go to your Supabase dashboard → **SQL Editor → New query**.

You'll type SQL here and run it with the **Run** button (or `Cmd+Enter`).

**The 6 commands you'll use:**

```sql
-- 1. SELECT: Read rows from a table
SELECT * FROM agents;
-- The * means "all columns". You can also write specific columns:
SELECT name, description, created_at FROM agents;

-- 2. WHERE: Filter rows
SELECT * FROM agents WHERE user_id = 'paste-your-user-id-here';
SELECT * FROM agents WHERE is_public = true;
SELECT * FROM agents WHERE name LIKE '%assistant%'; -- LIKE searches for partial matches

-- 3. INSERT: Add a new row
INSERT INTO agents (name, description, user_id, config)
VALUES ('Test Agent', 'A test', 'your-user-id', '{}');

-- 4. UPDATE: Modify existing rows
UPDATE agents SET description = 'Updated description' WHERE name = 'Test Agent';

-- 5. DELETE: Remove rows
DELETE FROM agents WHERE name = 'Test Agent';

-- 6. ORDER BY + LIMIT: Sort and limit results
SELECT * FROM agents ORDER BY created_at DESC LIMIT 10;
-- DESC = newest first. ASC = oldest first.
```

### Task 10 — Run Your First SQL Queries

In the Supabase SQL Editor, run each of the following. After each one, note what comes back (or what error you get, if any):

**Step 1** — See all tables in your database:
```sql
SELECT table_name FROM information_schema.tables WHERE table_schema = 'public';
```

**Step 2** — Check the agents table structure:
```sql
SELECT column_name, data_type FROM information_schema.columns WHERE table_name = 'agents';
```

**Step 3** — Insert a test agent (replace `'your-user-id'` with your actual user ID from the Authentication tab):
```sql
INSERT INTO agents (name, description, user_id, config)
VALUES ('My First SQL Agent', 'Created directly via SQL — not the UI', 'your-user-id', '{"tools": [], "persona": "helpful"}');
```

**Step 4** — Read it back:
```sql
SELECT * FROM agents;
```

**Step 5** — Update the description:
```sql
UPDATE agents
SET description = 'Updated via SQL'
WHERE name = 'My First SQL Agent';
```

**Step 6** — Confirm the update:
```sql
SELECT name, description, updated_at FROM agents WHERE name = 'My First SQL Agent';
```

**Step 7** — Delete the test row:
```sql
DELETE FROM agents WHERE name = 'My First SQL Agent';
```

**Step 8** — Confirm it's gone:
```sql
SELECT COUNT(*) FROM agents;
-- Should return 0 if you haven't created any agents via the UI yet
```

Ask Claude Code to explain anything you don't understand:

> *"Explain what this SQL query does, like I'm a designer who's new to databases: [paste query]. What does each part mean? What would change if I removed the WHERE clause?"*

### Task 11 — Ask Claude Code to Explain SQL to You

> *"Explain SQL SELECT, WHERE, INSERT, DELETE to me like I'm a UX designer learning databases for the first time. Use the AgentForge `agents` table as your example throughout. Explain what each part of the query is doing — not just the syntax, but why it's structured that way."*

Study the explanation, then look at the queries you just ran. Can you now explain in plain English what each one does? That's the bar — not memorisation, just comprehension.

---

## 🧪 SQL Quiz — Five Questions

Write your answers before looking them up. These are the exact concepts that will appear in Week 5 when you start fetching data for the dashboard.

**Q1.** What does this query return?
```sql
SELECT name, created_at FROM agents WHERE is_public = true ORDER BY created_at DESC LIMIT 5;
```

**Q2.** You want to update every agent's `updated_at` timestamp to now. Write the SQL. *(Hint: `NOW()` is the function for the current timestamp.)*

**Q3.** What is the difference between `DELETE FROM agents WHERE id = '123'` and `DELETE FROM agents`? What does the second query do?

**Q4.** You want all agents that contain the word "assistant" in their name, regardless of capitalisation. Write the SQL. *(Hint: `ILIKE` works like `LIKE` but case-insensitive.)*

**Q5.** What does `SELECT COUNT(*) FROM agents WHERE user_id = 'abc123'` return? What would you use this for in AgentForge?

> **Answers:**
> Q1: The 5 most recently created public agents — only their name and created_at columns.
> Q2: `UPDATE agents SET updated_at = NOW();` (no WHERE clause = updates all rows)
> Q3: The first deletes one specific row. The second deletes every single row in the table — catastrophic without a WHERE clause.
> Q4: `SELECT * FROM agents WHERE name ILIKE '%assistant%';`
> Q5: Returns a single number — how many agents that user has created. Use it for showing "You have 3 agents" or enforcing a free tier limit.

---

## Hour 7: Row Level Security + Styling the Auth Pages

### Row Level Security — The Most Important Security Concept in Your App

Right now, your `agents` table has RLS disabled by default. That means any user with your Publishable key can query ALL rows in the table — they'd see every agent from every user. This is a critical security flaw.

Row Level Security (RLS) fixes this by attaching rules to the table itself: "this user can only SELECT rows where `user_id` matches their own ID."

**The analogy:** Imagine a multi-tenant office building where every company stores files in the same filing room. Without RLS, anyone who gets into the filing room can read any company's files. With RLS, each drawer automatically locks unless you have that specific company's key — and the keys are tied to your employee ID badge. You can walk into the filing room freely, but you can only open your own drawers.

### Task 12 — Enable Row Level Security on the `agents` Table

> **Note:** Supabase's UI has been updated. There is no separate "Enable RLS" toggle visible in the toolbar — RLS is enabled automatically when you save your first policy. The steps below reflect the current interface.

In Supabase, open the **Table Editor** and click on the `agents` table. In the toolbar at the top, click **Add RLS policy**.

This opens the **"Create a new Row Level Security policy"** screen. You'll see:

- **Policy Name** — give the policy a clear, readable name
- **Table on clause** — already set to `public.agents`
- **Policy Behavior** — leave as `Permissive`
- **Policy Command** — choose SELECT, INSERT, UPDATE, DELETE, or ALL
- **Target Roles** — leave as default (all public roles)
- **SQL editor** — where you enter the expression that controls access
- **Templates panel** on the right — pre-built shortcuts you can click to auto-fill the form

You need to create **five policies**. For each one, click **Add RLS policy**, fill in the details below, then click **Save policy**.

---

**Policy 1 — Users can read their own agents (SELECT)**
- Policy Name: `Users can view own agents`
- Policy Command: `SELECT`
- In the SQL editor, on the line that says `-- Provide a SQL expression for the using statement`, replace it with: `auth.uid() = user_id`
- Shortcut: click the **"Enable read access for all users"** template on the right, then edit line 7 to `auth.uid() = user_id`

---

**Policy 2 — Users can insert their own agents (INSERT)**
- Policy Name: `Users can insert own agents`
- Policy Command: `INSERT`
- In the SQL editor, replace the placeholder expression with: `auth.uid() = user_id`
- Shortcut: click the **"Enable insert for users based on user_id"** template on the right — it pre-fills the correct expression

---

**Policy 3 — Users can update their own agents (UPDATE)**
- Policy Name: `Users can update own agents`
- Policy Command: `UPDATE`
- The UPDATE policy has **two expression fields** — this is normal:
  - `using` (line 7) — controls which rows can be targeted: `auth.uid() = user_id`
  - `with check` (line 9) — validates the row after the update: `auth.uid() = user_id`
- Both get the same expression. The `using` clause says "you can only update rows you own", and `with check` says "after updating, the row must still belong to you" — this prevents someone changing a row's `user_id` to hijack another user's data.

---

**Policy 4 — Users can delete their own agents (DELETE)**
- Policy Name: `Users can delete own agents`
- Policy Command: `DELETE`
- Expression: `auth.uid() = user_id`
- Shortcut: click the **"Enable delete for users based on user_id"** template on the right

---

**Policy 5 — Public can view shared agents (SELECT)**
- Policy Name: `Public can view shared agents`
- Policy Command: `SELECT`
- Expression: `is_public = true`

> This fifth policy is for Week 9 when you add shareable agent links. Add it now so the architecture is ready.

---

After saving all five policies, verify in the **SQL Editor**:

```sql
SELECT * FROM pg_policies WHERE tablename = 'agents';
```

You should see five rows — one per policy.

### Task 13 — Test RLS With Two Accounts

This test is critical. Do not skip it.

**Test 1: Your account can access your agents**
1. Log in to AgentForge as yourself
2. In the SQL Editor, insert a test agent with your `user_id`
3. Confirm the dashboard loads and would theoretically show it (even if the UI doesn't list it yet)

**Test 2: A different account cannot see your agents**
1. Open an incognito window
2. Go to `localhost:3000/auth/signup` and create a second test account with a different email
3. Log in as this second user
4. In the Supabase SQL Editor: temporarily look at the `agents` table — the second user's RLS context means they cannot see your rows

**Test 3: What happens without RLS (educational — then re-enable immediately)**
1. In the SQL Editor, run: `ALTER TABLE agents DISABLE ROW LEVEL SECURITY;`
2. Query the table — you can now see all rows regardless of which user you are
3. Immediately re-enable it: `ALTER TABLE agents ENABLE ROW LEVEL SECURITY;`

Ask Claude Code:

> *"I just tested Row Level Security by disabling and re-enabling it. Explain what would happen in a real production app if I forgot to enable RLS — what data would be exposed and to whom? What's the worst-case scenario?"*

### Task 14 — Style the Auth Pages

Now that auth works, make it look like part of AgentForge.

Ask Claude Code:

> *"Redesign both `src/app/auth/login/page.tsx` and `src/app/auth/signup/page.tsx` with proper AgentForge styling: a centred card layout on a dark background, the AgentForge name/logo at the top, well-spaced form fields with visible labels, a primary submit button, clear error message display when login fails (wrong password, email not found), a loading spinner on the submit button while the request is processing, and a link between the two pages — login page has 'Don't have an account? Sign up', signup page has 'Already have an account? Log in'. Use Tailwind for all styles."*

After it's done, test every error state manually:
- Submit the login form with wrong password → you should see a clear error message
- Submit the login form with a non-existent email → error should be shown
- Submit the signup form with a duplicate email → error should be shown
- Submit either form with empty fields → form should prevent submission or show an inline error

If any of these don't work correctly, ask Claude Code to fix them before moving on.

**Commit this milestone:**

```bash
git add .
git commit -m "feat: RLS policies on agents table, styled auth pages"
git push
```

### Task 15 — Build the User Profile Page

Ask Claude Code:

> *"Build `src/app/profile/page.tsx` — a protected page (redirect to /auth/login if not logged in) showing: the user's email address, the date their account was created, the number of agents they've created (query this from the agents table using the server Supabase client), and a large sign-out button. Use the same dark card style as the auth pages. Add a link to this page in the Navbar — a small avatar icon or 'Account' text that only shows when logged in."*

Once built, navigate to `localhost:3000/profile` while logged in. Confirm all four pieces of information show correctly.

Ask Claude Code to explain how the agent count is fetched:

> *"Explain how the agent count on the profile page is fetched from Supabase — is it fetched on the server or the client? Why? What would happen if I tried to do the same query in a client component?"*

**Final commit of the main session:**

```bash
git add .
git commit -m "feat: user profile page with agent count and account details"
git push
```

---

## 🧪 Validation Tests — End of Week 4

Before marking Week 4 complete, run through this checklist. Don't tick anything you haven't actually tested:

| Test | Expected result | Pass? |
|------|----------------|-------|
| Navigate to `/auth/signup` | Signup form loads | |
| Sign up with a new email | Account appears in Supabase Auth dashboard | |
| Navigate to `/auth/login` | Login form loads | |
| Log in with correct credentials | Redirected to `/dashboard` | |
| Log in with wrong password | Error message displayed | |
| Navigate to `/dashboard` while logged out | Redirected to `/auth/login` | |
| Navigate to `/profile` while logged in | See email, account date, agent count | |
| Click sign out | Redirected to `/auth/login`, can't access `/dashboard` | |
| Run `SELECT * FROM pg_policies WHERE tablename = 'agents'` | Shows 5 RLS policies with correct expressions (`auth.uid() = user_id`) | |
| *(Week 5 test — not yet possible)* Attempt to insert an agent via the app with a mismatched user_id | RLS blocks it — this can only be tested once the Create Agent form is built in Week 5 | |
| Run `SELECT * FROM pg_policies WHERE tablename = 'agents'` | Shows 5 RLS policies | |

---

## Stretch Tasks (+1–2 hrs, if you have them)

### Explore the Supabase Dashboard Fully (30 min)

You've used the Table Editor, SQL Editor, and Auth tabs. Explore these sections you haven't seen yet:

**Storage:** Object storage for files (images, PDFs, audio). You'll use this in Week 8 when agents can process uploaded documents.

**Edge Functions:** Serverless TypeScript functions that run at the edge — similar to Next.js API routes but running inside Supabase's infrastructure. Useful for Stripe webhooks in Week 10.

**Logs:** Real-time logs of every API request hitting your database. If something in your app stops working, this is the first place to look.

**Usage metrics (Organisation level):** Click your organisation name in the top-left to go up to the org level, then find **Usage**. This shows requests per day, database size, auth events, and bandwidth. Note: this is at the *organisation* level, not inside the project.

**Advisors:** Inside your project, look for **Advisors** in the left sidebar. This is where Supabase now surfaces performance recommendations and slow query analysis — it replaced the old "Reports" section.

> **Note:** Supabase removed the "Reports" tab from the project-level sidebar in a 2025 UI update. If you see older tutorials referencing it, Usage (org level) and Advisors are the current equivalents.

Ask Claude Code: *"Give me a one-paragraph overview of what each Supabase product section does — Storage, Edge Functions, Realtime, Logs, Advisors — and when in my 12-week plan I'd use each one."*

### Advanced SQL Challenges (45 min)

These stretch beyond the basics — try them before asking Claude Code for help:

**Challenge 1 — Count agents per user:**
```sql
SELECT user_id, COUNT(*) as agent_count
FROM agents
GROUP BY user_id
ORDER BY agent_count DESC;
```
Understand: what does `GROUP BY` do? What does `COUNT(*)` count? What does `ORDER BY agent_count DESC` do?

**Challenge 2 — Agents created in the last 7 days:**
```sql
SELECT name, created_at
FROM agents
WHERE created_at > NOW() - INTERVAL '7 days';
```
Understand: what does `INTERVAL '7 days'` mean? How would you change this to 30 days?

**Challenge 3 — Add an index for performance:**
```sql
CREATE INDEX idx_agents_user_id ON agents(user_id);
```
Ask Claude Code: *"What is a database index and why did I create one on `user_id`? What would happen to query performance without it as the agents table grows to millions of rows?"*

**Challenge 4 — Write a JOIN query (preview of Week 5 concepts):**
```sql
SELECT
  auth.users.email,
  agents.name,
  agents.created_at
FROM agents
JOIN auth.users ON agents.user_id = auth.users.id
LIMIT 10;
```

Breaking it down line by line:

**`SELECT auth.users.email, agents.name, agents.created_at`**
Asking for three columns from two different tables. The dot notation specifies which table each column belongs to — the pattern is `table.column`, or `schema.table.column` when the table is in a non-default schema.

- `auth.users.email` — three parts because `users` lives in Supabase's internal `auth` schema (not the default `public` schema). Without `auth.` the database wouldn't know which `users` table you mean.
- `agents.name` and `agents.created_at` — two parts only, because `agents` is in the `public` schema (the default), so no schema prefix is needed.

**The dot operator rule:**

| Pattern | When to use |
|---|---|
| `column` | Only one table — no ambiguity |
| `table.column` | Multiple tables in the query |
| `schema.table.column` | Table is in a non-default schema (like `auth` or `storage`) |

**`FROM agents`**
The primary table — the one you're building results around.

**`JOIN auth.users ON agents.user_id = auth.users.id`**
`JOIN` brings in rows from a second table and connects them to the first wherever the `ON` condition is true. Here it says: for every agent row, find the matching user row where `agents.user_id = auth.users.id`. Without the `ON` clause, you'd get every possible combination of every agent with every user — thousands of meaningless rows. The `ON` clause is what makes the join meaningful.

Visually:
```
agents table                   auth.users table
------------                   ----------------
user_id: abc-123  ←——————————→ id: abc-123, email: lakii@gmail.com
user_id: abc-123  ←——————————→ id: abc-123, email: lakii@gmail.com
user_id: xyz-456  ←——————————→ id: xyz-456, email: test@gmail.com
```

**`LIMIT 10`**
Return only the first 10 rows. Always use LIMIT when testing JOINs — on large tables they can return thousands of rows and slow the editor.

**In plain English:** "Give me the email, agent name, and creation date for each agent — by connecting the agents table to the auth users table wherever the user_id matches. Show me the first 10."

This is exactly what an admin dashboard query looks like. In Week 9 when you build the admin panel, a version of this query will power a table showing which user created which agent.

### Add a Created-At Display to the Profile Page (30 min)

The profile page shows the raw ISO date string (like `2026-04-24T15:32:00.000Z`). Make it readable:

Ask Claude Code:

> *"Format the user's `created_at` date on the profile page to display as a human-readable string like 'Member since April 2026'. Use JavaScript's `Intl.DateTimeFormat` — don't install a library for this."*

Then ask Claude Code to explain: *"What is `Intl.DateTimeFormat` and why is it better than manually formatting dates with string manipulation?"*

**Commit this change — it modifies your profile page code:**
```bash
git add .
git commit -m "feat: format created_at date on profile page with Intl.DateTimeFormat"
git push
```

### Add a Second Database Table: `messages` (45 min)

You'll need this in Week 6 for chat history. Set it up now so the schema is ready:

Ask Claude Code:

> *"Create a `messages` table in Supabase via SQL — run it in the SQL Editor. Columns: id (uuid, primary key, default gen_random_uuid()), agent_id (uuid, references agents.id), user_id (uuid, not null), role (text — 'user' or 'assistant'), content (text), created_at (timestamptz, default now()). Then write and run the RLS policies: users can only INSERT rows where user_id matches auth.uid(), users can only SELECT rows where user_id matches auth.uid(). Show me the SQL for both the table creation and the RLS policies."*

Run the SQL in the Supabase SQL Editor. Verify the table and policies appear in the Table Editor.

> **Commit note:** The `messages` table itself lives in Supabase — no local code changes from creating it. However, if Claude Code generates any TypeScript types or helper functions for messages (e.g. in `src/lib/supabase/`), commit those:
> ```bash
> git add .
> git commit -m "feat: create messages table in Supabase with RLS policies"
> git push
> ```
> If no local files were created, no commit is needed.

**Validate your `messages` table with these 4 queries — run each one in the SQL Editor:**

**1. Confirm the table was created with the right columns:**
```sql
SELECT column_name, data_type, is_nullable, column_default
FROM information_schema.columns
WHERE table_name = 'messages'
  AND table_schema = 'public'
ORDER BY ordinal_position;
```
You should see exactly 6 rows: `id`, `agent_id`, `user_id`, `role`, `content`, `created_at`.

> **Note:** Always add `AND table_schema = 'public'` to `information_schema` queries in Supabase. Supabase runs internal schemas (`realtime`, `auth`, `storage`) alongside your `public` schema — without the filter, system tables bleed into your results. Supabase has its own `realtime.messages` table that will appear alongside yours if you omit this.

**2. Confirm the foreign key and cascade rule exist:**
```sql
SELECT
  tc.constraint_name,
  kcu.column_name,
  ccu.table_name AS foreign_table,
  ccu.column_name AS foreign_column,
  rc.delete_rule
FROM information_schema.table_constraints AS tc
JOIN information_schema.key_column_usage AS kcu
  ON tc.constraint_name = kcu.constraint_name
JOIN information_schema.constraint_column_usage AS ccu
  ON ccu.constraint_name = tc.constraint_name
JOIN information_schema.referential_constraints AS rc
  ON rc.constraint_name = tc.constraint_name
WHERE tc.table_name = 'messages' AND tc.constraint_type = 'FOREIGN KEY';
```
You should see `agent_id` → `agents.id` with `delete_rule = CASCADE`. This means deleting an agent automatically deletes all its messages — no orphaned rows.

**3. Confirm RLS is enabled on the table:**
```sql
SELECT tablename, rowsecurity
FROM pg_tables
WHERE tablename = 'messages';
```
`rowsecurity` should be `true`.

**4. Confirm both RLS policies exist:**
```sql
SELECT policyname, cmd, qual, with_check
FROM pg_policies
WHERE tablename = 'messages';
```
You should see two rows — one for `SELECT` (with a `qual` containing `auth.uid()`) and one for `INSERT` (with a `with_check` containing `auth.uid()`). These use different clauses on purpose: `USING` filters rows on reads, `WITH CHECK` validates rows on writes.

---

## The Mental Models to Lock In This Week

**Supabase is not a magic box — it's a PostgreSQL database with a dashboard.** Everything Supabase does (auth, RLS, storage, edge functions) is built on top of a standard, battle-tested database. This means every skill you learn here transfers to any other database-backed system you'll encounter.

**Row Level Security is infrastructure, not feature work.** Don't skip it, don't leave it for later, don't think of it as "optional security". RLS is what makes it safe to ship. Every table that stores user data needs RLS before you go to production. The rule: enable RLS when you create the table, not as an afterthought.

**The Publishable key is safe only because of RLS.** If RLS is off on any table, your Publishable key effectively gives read access to your entire database to anyone who can find it. This is the single most common security mistake in Supabase apps. You've now tested this — don't forget what you saw.

**SQL is just filtered reading and writing.** `SELECT` is reading. `INSERT` is writing. `UPDATE` is editing. `DELETE` is removing. `WHERE` is filtering. That's the whole model. Everything else is combining these five things in different ways. You now know enough SQL to work with your data confidently.

**The proxy runs before the page.** In Next.js 16, `proxy.ts` (formerly `middleware.ts` in earlier versions) intercepts every request before Next.js renders anything. The user never even sees the dashboard HTML if they're not authenticated. This matters for performance and security equally. If you read older tutorials referencing `middleware.ts`, it's the same concept — just the filename and export name changed in v16.

---

## What the Backend Infrastructure Landscape Looks Like

Now that you have Supabase running, it's worth knowing what else exists in this space — so you can make informed decisions as AgentForge grows.

**PlanetScale / Neon / Turso** — other hosted PostgreSQL-compatible databases. They're more "just a database" — no auth, no dashboard. You'd use these if Supabase's auth model didn't fit your needs, or you needed finer control over the database layer. Not relevant for AgentForge at this stage.

**Firebase / Firestore** — Google's NoSQL alternative to Supabase. Very popular for real-time features (live chat, collaborative tools). The data model is more flexible but less structured than SQL. If you ever build a feature that needs multiple users to see live updates simultaneously (like a collaborative agent builder), Supabase's **Realtime** feature covers this without leaving your current stack.

**Prisma** — a TypeScript ORM (Object-Relational Mapper) that wraps your database calls in a type-safe API. Some developers use Prisma + a plain Postgres database instead of the Supabase client. You don't need it — Supabase's generated TypeScript types (which you'll explore in Week 5) give you similar safety without the overhead.

**Auth0 / Clerk** — dedicated authentication providers. If Supabase Auth doesn't support a feature you need (like SSO for enterprise customers, or complex multi-tenant role management), these are the alternatives. For a product at AgentForge's current stage, Supabase Auth is the right choice — simple, integrated, and free.

For your 12-week plan, Supabase covers everything. You'll only need to look outside it if you hit scale limits (100,000+ monthly active users) or very specific enterprise requirements — both of which are good problems to have in Year 2.

---

## Resources for This Week

> **These are reference docs — not things to read cover-to-cover.** Use them when you hit a specific question while building, not as step-by-step guides to follow from the top.

- **Supabase docs — Auth with Next.js App Router:** https://supabase.com/docs/guides/auth/server-side/nextjs
- **Supabase docs — Row Level Security:** https://supabase.com/docs/guides/database/postgres/row-level-security
- **SQL basics (interactive):** https://www.w3schools.com/sql/ — try the "Try it Yourself" editor for any query you're unsure about
- **Supabase docs — JavaScript client:** https://supabase.com/docs/reference/javascript/introduction
- **Postgres data types reference:** https://supabase.com/docs/guides/database/tables — scroll to "Column types"

---

## Claude Code Prompts Reference — Week 4

Save these for when you get stuck or want to go deeper.

**To debug a Supabase query:**
> *"My Supabase query `[paste query]` is returning an empty array instead of my data. I'm logged in as user ID `[id]`. Here's my RLS policy: `[paste policy]`. What's wrong?"*

**To understand an auth error:**
> *"I'm getting this error from Supabase Auth: `[paste error]`. What does it mean and how do I fix it? I'm using @supabase/ssr with Next.js App Router."*

**To add any new database operation:**
> *"Add a function to `src/lib/supabase/` that [describe operation — e.g. 'fetches all agents for the current user']. It should use the server Supabase client, handle errors gracefully, and return TypeScript types. Show the function and explain each part."*

**To check if your RLS is correct:**
> *"Review these RLS policies on my `agents` table and tell me if there are any security gaps: [paste policies]. I want users to only see their own agents, except for rows where `is_public = true` which should be readable by anyone."*

**To understand any SQL query:**
> *"Explain this SQL query in plain English, like I'm a designer who has basic SQL knowledge: [paste query]. What does each part do? What edge cases should I be aware of?"*

---

## Milestone Check ✅

By end of Week 4 you should be able to:

- [ ] Open Supabase, navigate to your `agentforge` project, and find the `agents` table
- [ ] Sign up as a new user and see them appear in Supabase → Authentication → Users
- [ ] Log in and get redirected to `/dashboard`; log out and get redirected to `/auth/login`
- [ ] Navigate directly to `/dashboard` while logged out and be automatically redirected
- [ ] Run a SELECT query in the Supabase SQL Editor and read the results
- [ ] Explain in one sentence what Row Level Security does and why it matters
- [ ] Identify the difference between the Publishable key (`sb_publishable_...`) and the Secret key (`sb_secret_...`) without looking at notes
- [ ] Open `src/proxy.ts` and explain what it does at a high level (and why it's `proxy.ts` not `middleware.ts` in Next.js 16)

**If you can do all of those: Week 4 is done. Your app now has a real backend.**

---

## What's Coming in Week 5

Next week you connect the UI to the database. The dashboard will show real agents fetched from Supabase. You'll build the Create Agent form, wire it to INSERT into your agents table, and add delete functionality. You'll also learn the difference between Server Components and Client Components — the most important Next.js concept for performance.

By end of Week 5, you'll have a fully functional CRUD interface: Create, Read, Update, and Delete agents. The only thing missing will be the AI — which arrives in Week 6.

---

*Week 4 of 12 · AgentForge · Phase 2: Backend & AI Integration · Updated April 2026*
*Built with Claude Code + Cowork by Lakii*
