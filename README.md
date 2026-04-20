# AgentForge 🔥

> **Visual AI Agent Builder for Non-Developers**  
> Build, configure, and deploy AI agents without writing a single line of code.

---

## What is AgentForge?

AgentForge is an open-source web app that lets anyone — designers, marketers, founders, curious humans — visually build AI agents powered by Claude.

Think of it as **Figma, but for AI agents**.

Instead of writing prompts and code in a terminal, you drag, configure, and deploy through a beautiful interface. Your agent gets a shareable link. Anyone can use it. Anyone can clone it.

---

## Current Status

| Phase | Status |
|-------|--------|
| Week 1 – Environment setup + scaffold | ✅ In progress |
| Week 2–3 – JS basics + Git workflow | 🔜 Upcoming |
| Week 4–6 – Supabase + Claude API | 🔜 Upcoming |
| Week 7–9 – Visual builder UI | 🔜 Upcoming |
| Week 10–12 – Stripe + Deploy | 🔜 Upcoming |

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Next.js 14 (App Router) + TypeScript |
| Styling | Tailwind CSS + shadcn/ui |
| Backend / Auth / DB | Supabase |
| AI | Claude API (claude-sonnet-4-6) |
| Payments | Stripe |
| Deployment | Vercel |
| Version Control | GitHub (open source) |

---

## Planned Features

- 🎨 **Visual step-by-step agent builder** — drag-and-drop canvas for agent design
- 🔧 **Tool integrations** — web search, calculator, date/time, file reader
- 🔗 **Shareable agent links** — every agent gets a public URL
- 👥 **Clone this agent** — community template sharing
- 🔒 **Auth + Row Level Security** — agents stay private until you share them
- 💳 **Stripe subscriptions** — free tier (3 agents) + Pro ($12/month)

---

## Business Model

**Freemium SaaS + Open Source**

- **Free tier:** 3 agents, 100 messages/month
- **Pro tier:** $12/month — unlimited agents, longer conversations, priority support
- **Open source:** Full codebase on GitHub forever

---

## Running Locally

> ⚠️ Full setup instructions are in [WEEK_1_GUIDE.md](./WEEK_1_GUIDE.md)

Once setup is complete:

```bash
# Install dependencies
npm install

# Set up environment variables
cp .env.local.example .env.local
# Edit .env.local with your Supabase and Anthropic keys

# Run the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## About This Project

AgentForge is being built in public over 12 weeks as part of a Claude Code mastery journey. Every week of progress is documented and committed to this repo.

**Built by:** Lakii — UX designer turned AI builder  
**Timeline:** April 2026 → July 2026  
**Why:** Most agent builders require coding knowledge. This one shouldn't.

---

## License

MIT — use it, fork it, build on it.
