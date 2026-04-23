# AgentForge

AgentForge is an open-source, no-code AI agent builder for non-developers. Instead of writing prompts in a terminal or wrestling with APIs, you configure and deploy AI agents through a visual interface — give your agent a name, a personality, and a set of tools, and it gets a shareable public link anyone can use. Built for designers, marketers, founders, and anyone who wants to build with AI without needing to write code.

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 15 (App Router) + TypeScript |
| Styling | Tailwind CSS |
| Database + Auth | Supabase |
| AI | Anthropic Claude API |
| Payments | Stripe |
| Deployment | Vercel |

---

## Getting Started

**Prerequisites:** Node.js v20+, a Supabase project, an Anthropic API key.

```bash
# Clone the repository
git clone https://github.com/lakiiliyanage/agentforge.git
cd agentforge

# Install dependencies
npm install

# Set up environment variables
cp .env.local.example .env.local
# Open .env.local and add your Supabase and Anthropic keys

# Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Routes

| Route | Description |
|-------|-------------|
| `/` | Landing page |
| `/dashboard` | Overview of your agents and activity |
| `/agents/new` | Create and configure a new agent |
| `/agents/[id]` | View, edit, and share a specific agent |
| `/auth/login` | Sign in to your account |
| `/auth/signup` | Create a new account |

---

## Project Structure

```
src/
├── app/                  # Routes (Next.js App Router)
│   ├── page.tsx          # Landing page
│   ├── dashboard/
│   ├── agents/
│   │   ├── new/
│   │   └── [id]/
│   └── auth/
│       ├── login/
│       └── signup/
└── components/
    ├── ui/               # Reusable UI elements — buttons, cards, inputs
    └── layout/           # Page-level layout — nav, sidebar, footer
```

---

## Roadmap

| Phase | Focus | Status |
|-------|-------|--------|
| 1 — Foundation | Environment setup, Next.js scaffold, Git workflow | ✅ Complete |
| 2 — Frontend | JavaScript, React, Tailwind fundamentals | ✅ Complete |
| 3 — Structure | App routing, component architecture, landing page | 🔄 In progress |
| 4 — Backend | Supabase database, authentication, row-level security | Upcoming |
| 5 — AI | Claude API integration, agent configuration, tool use | Upcoming |
| 6 — Product | Visual agent builder UI, shareable links, templates | Upcoming |
| 7 — Launch | Stripe subscriptions, Vercel deployment, public beta | Upcoming |

---

## Contributing

AgentForge is open source under the MIT licence. Issues and pull requests are welcome.

---

## About

Built by [Lakii](https://github.com/lakiiliyanage) — UX designer learning to build in public.  
Timeline: April 2026 → July 2026
