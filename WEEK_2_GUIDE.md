# Week 2 Guide — JavaScript, React & Tailwind Fundamentals 🧠

> **Goal:** Understand the language AgentForge is written in. By end of week you'll be able to read a JavaScript/TypeScript/React component and describe what it does — and you'll have built a real working To-Do app, three React components, and styled them with Tailwind.
> **Time:** 8 hours total — Saturday 3pm–7pm (4 hrs) + Sunday 3pm–7pm (4 hrs)
> **Prerequisite:** Week 1 complete — Next.js running at localhost:3000, repo live on GitHub

---

## Why This Week Matters

Everything in AgentForge — the buttons, the database calls, the AI responses, every screen a user touches — is written in JavaScript, TypeScript, and React styled with Tailwind CSS. You don't need to memorise syntax. You need to be able to:

- **Read** code Claude writes and understand what it does
- **Modify** small pieces without breaking everything
- **Brief Claude Code accurately** — the better you understand the code, the better your instructions
- **Spot mistakes** — like reviewing a designer's mockup; you don't draw it yourself, but you know if it's right

Think of it like learning to read a Figma file's auto-layout structure. You're not rebuilding the component from scratch — you're understanding how it was put together so you can direct changes.

---

## 8-Hour Overview

| Session | Hours | Focus |
|---------|-------|-------|
| Saturday 3–5pm | 1–2 | JavaScript & TypeScript survival kit |
| Saturday 5–7pm | 3–4 | Build and dissect the To-Do app |
| Sunday 3–5pm | 5–6 | React fundamentals — components, props, state |
| Sunday 5–7pm | 7–8 | Tailwind CSS — style everything, build confidence |

---

## What You're Learning This Week

| Concept | What it is | Design analogy |
|---------|-----------|----------------|
| **Variables** | Store a value with a name | A named layer in Figma |
| **Functions** | Reusable block of code | A Figma component |
| **Objects** | Group of related data | A component's properties panel |
| **Arrays** | Ordered list of items | A list of layers in a frame |
| **Async/Await** | Wait for something to finish (API call) | Waiting for an image to upload before publishing |
| **TypeScript** | JavaScript with type-checking | Figma's constraint system — prevents certain mistakes |
| **React Components** | Reusable, interactive UI building blocks | Figma components, but they respond to clicks |
| **Props** | Data passed into a component | Overriding a component's text in Figma |
| **State (useState)** | Data that changes and triggers a re-render | A prototype interaction that updates the UI |
| **Tailwind CSS** | Utility classes that style HTML directly | Design tokens applied inline |

---

## Before You Start — Setup Check

Run these quickly to confirm Week 1 is solid:

```bash
node --version        # Should show v20+
claude --version      # Should show a version number
gh auth status        # Should show "Logged in to github.com"
```

Navigate to your project and start the dev server:

```bash
cd /Users/lakiiliyanage/Claude/"Learn AI"/agentforge
npm run dev
```

Open **http://localhost:3000** — you should see the Next.js welcome page. Leave this running in Tab 1.

Open a **second Terminal tab** (`Cmd + T`) for all other commands this week. You'll switch between them frequently.

---

## SATURDAY — Hours 1–2 (3pm–5pm): JavaScript & TypeScript Survival Kit

### Step 1: Open Claude Code in Your Project

In Terminal Tab 2:

```bash
cd /Users/lakiiliyanage/Claude/"Learn AI"/agentforge
claude
```

You're now inside Claude Code with full visibility of your project files.

---

### Step 2: Ask Claude Code to Teach You JS

Paste this prompt:

```
I'm building AgentForge — a visual AI agent builder. I'm a UX designer
learning to code. Explain these 6 JavaScript concepts using short code
examples from AgentForge's context. Keep each under 5 lines of code and
explain every line like I'm a designer who understands logic but not syntax:
variables (const vs let), functions, arrow functions, objects, arrays,
and async/await.
```

Read every example. Ask follow-up questions freely — there are no dumb questions here:

```
> What's the difference between let and const?
> What does the "return" keyword do?
> Why does async/await exist — what breaks without it?
> What does console.log do and when would I use it?
```

---

### Step 3: The 6 Core Concepts — Your Reference Card

#### Variables — Named containers for data

```javascript
// const = locked value, won't change (use this by default)
const agentName = "Finance Advisor"

// let = changeable value
let messageCount = 0
messageCount = messageCount + 1  // now it's 1
```

> **Design analogy:** `const agentName` is like a locked text layer in Figma. `let messageCount` is an editable one you can override.

#### Functions — Reusable blocks of instructions

```javascript
function greetUser(name) {
  return "Welcome to AgentForge, " + name
}

greetUser("Lakii")  // → "Welcome to AgentForge, Lakii"
```

> **Design analogy:** A Figma component. Define it once, use it everywhere, pass different values each time.

#### Arrow Functions — Shorter function syntax (used everywhere in React)

```javascript
// These do exactly the same thing:
function greetUser(name) { return "Welcome, " + name }
const greetUser = (name) => "Welcome, " + name
```

Arrow functions look different but work identically. You'll see them constantly in React — just know they're functions.

#### Objects — Groups of related data

```javascript
const agent = {
  name: "Finance Advisor",
  personality: "professional",
  tools: ["calculator", "web-search"],
  isPublic: true
}

agent.name       // "Finance Advisor"
agent.tools[0]   // "calculator"
```

> **Design analogy:** A component's properties panel. Each key is a property. The whole object is the component config.

#### Arrays — Ordered lists of items

```javascript
const agents = ["Finance Advisor", "Research Bot", "Daily Briefer"]

agents[0]              // "Finance Advisor" — index starts at 0
agents.length          // 3
agents.push("New")     // adds to end
agents.map(a => a.toUpperCase())   // transforms every item
agents.filter(a => a.includes("Bot"))  // keeps matching items
```

> **Design analogy:** A list of layers in a Figma frame. Loop through them, count them, filter them, transform them.

#### Async/Await — Waiting for slow things (API calls, database reads)

```javascript
async function askClaude(message) {
  const response = await fetch("/api/chat", {
    method: "POST",
    body: JSON.stringify({ message })
  })
  const data = await response.json()
  return data.reply
}
```

> **Design analogy:** Figma's "waiting for plugin to process" before the frame updates. `await` tells JavaScript: "stop here, wait for this to finish, then carry on."

---

### Step 4: TypeScript — JavaScript with a Safety Net

TypeScript is identical to JavaScript, but you declare what *type* of data a variable holds. AgentForge uses TypeScript throughout.

Ask Claude Code:

```
> Show me 3 examples of how TypeScript differs from plain JavaScript,
  using AgentForge examples. Explain why the types matter.
```

What to expect:

```typescript
// JavaScript — anything goes, no warnings
function createAgent(name, tools) { ... }

// TypeScript — types declared, mistakes caught instantly
function createAgent(name: string, tools: string[]): Agent { ... }
//                        ↑ must be text  ↑ must be array of strings
```

If you accidentally pass a number where a string is expected, VS Code underlines it in red **before you run the code**. That's the entire point — catch mistakes at design time, not in production.

**You will not write TypeScript from scratch.** Claude Code writes it. Your job is to read it and understand what it's doing.

---

### Step 5: Read javascript.info (20 min)

Bookmark: **https://javascript.info**

Open it now and skim **Sections 1–4**. Don't study it deeply — just scan the headings and read whichever parts feel unclear from Step 2. This is your ongoing reference for all of Weeks 2–12. When you hit a concept you don't understand while building AgentForge, this is your first stop before asking Claude Code.

---

## 📁 Next.js File Types — Quick Reference

Before you build the To-Do app, it's worth knowing what each special filename means in a Next.js project. These files aren't named randomly — Next.js reads the filename and gives it a specific job automatically.

> **Design analogy:** Think of your project like a Figma file. A `page.tsx` is like a Frame — it's the thing users actually see. A `layout.tsx` is like a master component wrapped around every frame. A `loading.tsx` is the skeleton placeholder that shows while a frame is rendering.

### The 7 Special Files

| File | What it does | Where you'll use it |
|------|-------------|---------------------|
| `page.tsx` | **The actual page** — defines what renders at that URL. Without this file, the route doesn't exist. | Every screen: `/todo/page.tsx`, `/dashboard/page.tsx` |
| `layout.tsx` | **Persistent wrapper** around pages — renders once and stays as you navigate. Great for Navbar + Footer. | `src/app/layout.tsx` wraps your whole app |
| `loading.tsx` | **Loading skeleton** — shown automatically while the page fetches data. Uses React Suspense under the hood. | Any page that loads from a database |
| `error.tsx` | **Error boundary** — shown if a page crashes. Catches errors so one broken page doesn't kill the whole app. | Week 11 — custom error page |
| `not-found.tsx` | **404 page** — shown when a URL doesn't match any route. | Week 11 — custom not-found page |
| `route.ts` | **API endpoint** — server-side code with no UI. Returns JSON. This is how your app talks to Supabase and Claude API. | `/api/chat/route.ts`, `/api/stripe/webhook/route.ts` |
| `middleware.ts` | **Request interceptor** — runs before any page loads. Used for auth redirects: "is this user logged in? If not, send them to /login." | Week 4 — protecting the dashboard |

### How Folders Become URLs

In Next.js App Router, **folder name = URL path**. No configuration needed.

```
src/app/
├── page.tsx              → localhost:3000/
├── todo/
│   └── page.tsx          → localhost:3000/todo
├── dashboard/
│   └── page.tsx          → localhost:3000/dashboard
├── agents/
│   ├── page.tsx          → localhost:3000/agents
│   └── [id]/
│       └── page.tsx      → localhost:3000/agents/abc123  ← [id] is a variable
└── api/
    └── chat/
        └── route.ts      → localhost:3000/api/chat  ← not a page, an API
```

> **The `[id]` folder** — square brackets mean "this can be anything." `agents/[id]/page.tsx` matches `/agents/abc123`, `/agents/my-finance-bot`, `/agents/anything`. You'll use this in Week 5 to build the individual agent page.

### page.tsx in Detail

Every `page.tsx` is a React component. It's the minimum needed to create a route:

```tsx
// src/app/todo/page.tsx

export default function TodoPage() {
  return (
    <main>
      <h1>My To-Do List</h1>
    </main>
  )
}
```

Three things to notice:
1. **`export default`** — Next.js requires this. It's how the framework finds and renders your component.
2. **The function name** doesn't matter to Next.js (`TodoPage`, `Page`, `MyThing` all work) but naming it clearly helps you read the code.
3. **No routing config** — just create the folder and file, and the route exists.

### layout.tsx in Detail

Layout wraps every page inside its folder. `src/app/layout.tsx` wraps the whole app:

```tsx
// src/app/layout.tsx

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />          {/* appears on every page */}
        {children}          {/* this is where each page.tsx renders */}
        <Footer />          {/* appears on every page */}
      </body>
    </html>
  )
}
```

> `{children}` is a React prop that means "whatever is nested inside me." When you visit `/todo`, Next.js puts `todo/page.tsx` into `{children}` inside `layout.tsx`. You get Navbar + TodoPage + Footer without any wiring.

### route.ts in Detail

A `route.ts` has no UI — it's a pure server function that responds to HTTP requests. You'll create these for every action that talks to Supabase or Claude:

```typescript
// src/app/api/chat/route.ts

export async function POST(request: Request) {
  const { message } = await request.json()
  // call Claude API here...
  return Response.json({ reply: "Hello from Claude" })
}
```

> **Why not just call Supabase/Claude from the page directly?** Security. API keys must never run in the browser — a user could open DevTools and steal them. `route.ts` runs on the server. Your API key stays secret. Your page calls `/api/chat`, which calls Claude. This is the pattern you'll use in Week 6.

---

## SATURDAY — Hours 3–4 (5pm–7pm): Build the To-Do App

This is the most important exercise of Week 2. You're not just watching Claude build something — you'll read every line it writes and ask about anything you don't understand.

### Step 6: Ask Claude Code to Build the App

In Claude Code:

```
I'm building AgentForge with Next.js 14 App Router + TypeScript + Tailwind CSS.

Build a To-Do list app at src/app/todo/page.tsx. Requirements:
- Add new tasks via a text input + button
- Mark tasks complete (strikethrough styling)
- Delete tasks with a button
- Show a count of remaining incomplete tasks
- Dark theme matching AgentForge's style
- Use only React hooks (useState) and Tailwind — no external libraries

After building it, explain what each section does line by line.
```

Let Claude finish completely before asking anything.

---

### Step 7: Open It in Your Browser

Go to: **http://localhost:3000/todo**

Test it — add tasks, tick them off, delete them. If it errors:

```
> I'm getting this error on /todo: [paste the full error message]
```

---

### Step 8: Read the Code Line by Line

Open the file in VS Code:

```bash
code src/app/todo/page.tsx
```

Read from top to bottom. For every line you don't understand, ask Claude Code:

```
> In the todo page you built, what does "useState" do?
> What does .filter() do — why is it used for deleting a task?
> Why is there a "key" prop on each list item?
> What is the "e" in onClick={(e) => ...}?
```

**This reading habit is the most valuable skill you're building.** Every week from here on, Claude Code will write hundreds of lines. Your ability to read and direct it depends entirely on this.

---

### Step 8b: Handle Duplicate Tasks

A real user will try to add the same task twice. Ask Claude Code to fix this:

```
> Update the To-Do app so that if a user tries to add a task that
  already exists (case-insensitive), it shows a small warning message
  instead of adding a duplicate. Explain the code change you make.
```

What Claude Code will likely add is a check like this before creating a task:

```typescript
const isDuplicate = tasks.some(
  task => task.text.toLowerCase() === newTask.toLowerCase()
)
if (isDuplicate) {
  setError("This task already exists")
  return
}
```

Read that snippet and ask Claude Code:

```
> What does .some() do — how is it different from .filter()?
> Why do we use .toLowerCase() on both sides?
> What does "return" do here — why does it stop the function?
```

This pattern — checking whether something already exists before creating it — is one you'll use constantly in AgentForge. Duplicate agents, duplicate emails, duplicate tool names. Learn it here on a simple example.

---

### Step 9: Modify the App Yourself (no Claude Code)

Make three small changes on your own first — then verify them:

1. **Change a button label** — find text inside `<button>` tags and rewrite it
2. **Change a colour** — find a Tailwind class like `bg-blue-500`, change to `bg-violet-600`
3. **Change the input placeholder** — find `placeholder="..."` and rewrite it

Save with `Cmd + S` after each — the browser updates instantly (hot reload).

If you break something, don't panic:

```
> I edited todo/page.tsx and got an error. Here's what I changed: [describe it]
```

---

### Step 10: Saturday Commit

Exit Claude Code (`Esc` or `/exit`), then:

```bash
git add .
git commit -m "Week 2 Sat: JS fundamentals + To-Do app built"
git push
```

---

## SUNDAY — Hours 5–6 (3pm–5pm): React Fundamentals

React is the engine inside Next.js. You've already seen it in the To-Do app — now you're going to meet it in isolation so the mental model clicks before you're inside the full Next.js structure.

**The one loop to understand:** Components receive data (props) → track changes (state) → re-render automatically when state changes. That's it. That's all of React.

### Step 11: Ask Claude Code for Three Standalone Components

Launch Claude Code and paste:

```
I'm learning React for my AgentForge project. Create three small
standalone React components for me to study — put them in
src/components/practice/:

1. AgentCard.tsx — a card component that accepts props:
   name (string), description (string), toolCount (number).
   Display them in a styled card. Show me how props work.

2. MessageCounter.tsx — a click counter using useState that
   starts at 0 and counts up each click. Label it "Messages Sent".
   Show me how state works.

3. AgentList.tsx — a component that renders a hardcoded array of
   3 agent names as a styled list. Show me how arrays render in React.

After creating all three, explain each file line by line like I'm
a designer seeing React for the first time.
```

---

### Step 12: Study Each Component

Open each file in VS Code. Run these in Terminal (not inside Claude Code — exit first with `Esc` or `/exit`):

```bash
code src/components/practice/AgentCard.tsx
code src/components/practice/MessageCounter.tsx
code src/components/practice/AgentList.tsx
```

For each file, find the answers to these three questions:

**1. Where does the data come in? (props)**
Look at the top of the file before the component function. You'll see an `interface` block — that's TypeScript declaring what data this component expects. Below it, the function signature unpacks those values:

```tsx
interface AgentCardProps {
  name: string
  description: string
  toolCount: number
}

function AgentCard({ name, description, toolCount }: AgentCardProps) {
```

Props are read-only — the component receives them but cannot change them. Like receiving a client brief — you work with it, you don't rewrite it.

**2. Where does change happen? (useState)**
Look for `useState` inside the component function:

```tsx
const [count, setCount] = useState(0)
```

This creates two things: `count` (the current value) and `setCount` (the function that updates it). Whenever `setCount` is called, React re-renders with the new value. You won't see useState in AgentCard — it only displays data. You will see it in MessageCounter, because clicking a button changes a number.

**3. What gets rendered? (the return statement)**
Scroll to the bottom of the component and find `return (`. Everything inside is what appears on screen:

```tsx
return (
  <div className="bg-gray-900 rounded-lg p-4">
    <h2>{name}</h2>
    <p>{description}</p>
    <span>{toolCount} tools</span>
  </div>
)
```

The `{curly braces}` are where live data gets inserted — React replaces them with whatever value the variable holds. Think of the return statement as the artboard in Figma: it's the final output the user actually sees.

**What is JSX?**
The HTML-looking code inside JavaScript files is called JSX. Three things make it different from regular HTML:

```tsx
// 1. className instead of class (class is a reserved JS word)
<div className="bg-gray-900">

// 2. Curly braces {} insert JavaScript values
<h2>{name}</h2>              // inserts a variable
<span>{toolCount} tools</span>  // "3 tools", "7 tools" etc.
<p>{isPublic ? "Public" : "Private"}</p>  // conditional

// 3. Every element must be self-closed if empty
<input />   // not <input>
```

Design analogy: JSX is like a Figma component that has both the visual structure (layers) and the logic (interactions) in one place.

Ask Claude Code about anything still unclear:

```
> In AgentCard, what does "interface" mean before the props definition?
> In MessageCounter, why does clicking the button cause the number to update?
> In AgentList, what does .map() do — why is it used for rendering lists?
> What is the "e" in onClick={(e) => ...}?
```

---

### Step 13: View the Components in Your Browser

Create a test page to see all three at once. Ask Claude Code:

```
> Create src/app/practice/page.tsx that imports and renders all three
  components from src/components/practice/ so I can see them at
  localhost:3000/practice
```

Open **http://localhost:3000/practice** — you should see all three components rendered.

---

### Step 14: Modify Each Component

Make one change to each — without Claude Code:

**1. AgentCard — add an `isPublic` prop**

In `AgentCard.tsx`, add `isPublic: boolean` to the interface and destructure it in the function:

```tsx
interface AgentCardProps {
  name: string
  description: string
  toolCount: number
  isPublic: boolean   // add this
}

function AgentCard({ name, description, toolCount, isPublic }: AgentCardProps) {
```

Then display it in the JSX:

```tsx
<span>{isPublic ? "Public" : "Private"}</span>
```

> ⚠️ **TypeScript will now complain everywhere AgentCard is used without `isPublic` being passed.** Open `src/app/practice/page.tsx` and add `isPublic={true}` (or `false`) to every `<AgentCard />` instance there too. TypeScript enforces required props at every usage — like making a field mandatory in a Figma component, every instance must have it filled in.
>
> If you want it optional so you don't have to pass it every time, add a `?` in the interface and a default value:
> ```tsx
> isPublic?: boolean  // optional
> function AgentCard({ ..., isPublic = false }: AgentCardProps)
> ```

**2. MessageCounter — change starting number and button label**

In `MessageCounter.tsx`, change `useState(0)` to `useState(10)`:

```tsx
const [count, setCount] = useState(10)
```

The number inside `useState()` is the initial value — that's all it takes. Then find the `<button>` tag and change the label text:

```tsx
<button onClick={() => setCount(count + 1)}>
  Add Message     {/* change this text */}
</button>
```

Only change the visible text — leave `onClick` exactly as it is.

**3. AgentList — add a fourth agent name**

Find the hardcoded array inside the component and add a fourth item:

```tsx
const agents = ["Finance Advisor", "Research Bot", "Daily Briefer", "Your New Agent"]
```

Then ask Claude Code to review all three changes:

```
> I modified the three practice components. Here's what I changed:
  [describe each change]. Did I do it correctly?
```

> **Why this matters:** AgentCard = your Week 5 dashboard card. MessageCounter = how message limits will work. AgentList = your Week 5 agent list. You're previewing real features.

---

### Step 15: Sunday Midpoint Commit

```bash
git add .
git commit -m "Week 2 Sun: React components — props, state, and lists"
git push
```

---

## SUNDAY — Hours 7–8 (5pm–7pm): Tailwind CSS

You've built the components. Now make them look real.

> **Your UX superpower activates here.** Most beginners find Tailwind tedious — utility classes feel like noise. You'll find it intuitive because utility classes *are* design tokens. `p-4` = 16px padding. `text-lg` = a type size step up. `rounded-lg` = the border radius you'd set in Figma. Lean into this.

### Step 16: Ask Claude Code to Explain Tailwind

```
Explain Tailwind CSS to me like I'm a designer — how do utility classes
map to design decisions like spacing, colour, typography, and layout?
Show me the 12 classes I should know by heart for building AgentForge.
```

**The 12 classes to know cold:**

| Class | What it does | Design equivalent |
|-------|-------------|------------------|
| `p-4` | 16px padding all sides | Padding in Figma |
| `px-4` / `py-4` | Horizontal / vertical padding | X/Y padding |
| `m-2` | 8px margin | Margin / spacing |
| `flex` | Enable flexbox | Auto layout |
| `gap-4` | 16px gap between flex children | Gap in auto layout |
| `grid` | Enable CSS grid | Grid layout |
| `text-lg` | Larger text | Type scale step up |
| `font-bold` | Bold weight | Bold in Figma |
| `text-gray-400` | Grey text | Fill colour |
| `bg-gray-900` | Dark background | Frame fill |
| `rounded-lg` | Rounded corners | Corner radius |
| `w-full` | Full width | Fill container |

---

### Step 17: Style the To-Do App Properly

Your To-Do app probably works but looks basic. Ask Claude Code to improve it:

```
> Redesign my src/app/todo/page.tsx to look polished and professional.
  Keep the same functionality but improve the visual design:
  - Proper spacing and padding
  - Cards for each task item
  - Better button styles with hover states
  - A clean header with the task count
  - Consistent dark theme using Tailwind
  Explain every Tailwind class you use so I can learn them.
```

Open **http://localhost:3000/todo** — it should now look like a real product.

---

### Step 18: Style the AgentCard Component

```
> Improve the styling of src/components/practice/AgentCard.tsx using Tailwind.
  Make it look like a real dashboard card — shadow, border, proper spacing,
  a coloured accent, hover state. Explain each class you use.
```

Open **http://localhost:3000/practice** — your AgentCard should now look like something from a real SaaS dashboard.

---

### Step 19: Write One Function Yourself

In VS Code, open `src/app/todo/page.tsx` and try adding a new feature manually — a "Clear all completed" button:

```typescript
// Find where the tasks state is defined and add this function:
const clearCompleted = () => {
  setTasks(tasks.filter(task => !task.completed))
}
```

Then add a button in the JSX that calls it:

```tsx
<button onClick={clearCompleted}>Clear completed</button>
```

Save and test it. If it doesn't work, ask Claude Code:

```
> I tried to add a clearCompleted function but something went wrong.
  Here's my code: [paste it]. What's the issue?
```

---

### Step 20: JS Quiz with Claude Code

```
Quiz me on the JavaScript and React I learned this week. Show me 4 short
code snippets from an AgentForge context and ask me to describe what each
does. Wait for my answer before showing the next. Correct me if I'm wrong
and explain why.
```

Don't skip this. It's your most honest signal of whether the week actually landed.

---

### Step 21: Git Branch + Final Commit

Create a feature branch for this week's work:

```bash
git checkout -b feature/week2-js-react-tailwind
git add .
git commit -m "Week 2: JS fundamentals, React components, Tailwind styling complete"
git push -u origin feature/week2-js-react-tailwind
```

Merge it back to main:

```bash
git checkout main
git merge feature/week2-js-react-tailwind
git push
```

---

### Step 22: Week 2 Review (6:30pm)

Fill these in before closing your laptop:

- JS concepts that feel solid: ___
- JS concepts still fuzzy: ___
- Did I understand the To-Do app line by line? Yes / Mostly / Not yet
- Did the React component loop (props → state → render) click? Yes / Sort of / Not yet
- Which Tailwind classes do I remember without looking? ___
- One thing I'd explain differently to a friend: ___
- Confidence score (1–10): ___
- Hours spent: ___
- Ready for Week 3? Yes / Need another session

---

## Common Issues and Fixes

**"Cannot find module" at /todo or /practice** — Check the file is at `src/app/todo/page.tsx` not `app/todo/page.tsx`. Next.js is strict about the `src/` prefix.

**Changes not showing in browser** — Check `npm run dev` is still running in Terminal Tab 1. If it crashed, restart with `npm run dev`.

**TypeScript red underlines in VS Code** — Don't panic. Paste the underlined code into Claude Code: `> What does this TypeScript error mean: [paste it]`. Most are minor.

**AgentCard doesn't show on /practice page** — Check the import path. It should be `import AgentCard from "@/components/practice/AgentCard"`.

**"git checkout" says pathspec not found** — You're not in your agentforge folder. Run the `cd` command first.

**Merge conflict** — Paste the exact error into Claude Code: `> I got a merge conflict: [paste message]. How do I resolve it?`

**Blank page** — All page files must be named exactly `page.tsx` (lowercase, .tsx). Check the file name.

---

## ✅ Week 2 Completion Checklist

- [ ] Can explain variable, function, object, array in plain English
- [ ] Understand what async/await does and why it exists
- [ ] Know the difference between JavaScript and TypeScript
- [ ] To-Do app built, working at localhost:3000/todo
- [ ] Modified the To-Do app yourself (colour, label, clearCompleted function)
- [ ] Three React practice components created and viewed at localhost:3000/practice
- [ ] Understand props, state (useState), and list rendering (.map)
- [ ] Know 8+ Tailwind classes without looking them up
- [ ] To-Do app and AgentCard look polished with proper Tailwind styling
- [ ] Created a feature branch, committed, and merged back
- [ ] Passed the Claude Code JS + React quiz (even partially)
- [ ] javascript.info bookmarked
- [ ] All work committed and pushed to GitHub

---

## 🧪 Week 2 Validation Tests

Run all of these before marking Week 2 done in Notion:

| Test | How to check | Expected result |
|------|-------------|----------------|
| To-Do app works | Open localhost:3000/todo | Add, complete, delete all functional. Looks polished. |
| Practice page works | Open localhost:3000/practice | All 3 components visible and styled |
| MessageCounter | Click the button on /practice | Number increments each click |
| Code on GitHub | Visit github.com/lakiiliyanage/agentforge | todo/ and components/practice/ folders visible |
| Git history | `git log --oneline` | Week 2 commits visible |
| TypeScript compiles | `npx tsc --noEmit` | No errors printed |
| Build passes | `npm run build` | "✓ Compiled successfully" |
| JS quiz | Ask Claude Code to quiz you | Describe 3 of 4 snippets correctly |

**The real test:** Open `src/app/todo/page.tsx` and explain out loud — in plain English — what each block does. If you can do that even roughly, you're ready for Week 3.

---

## 📚 Resources

- **javascript.info** — best free JS reference, Sections 1–4 this week
- **React docs quick start** — https://react.dev/learn
- **TypeScript handbook intro** — https://www.typescriptlang.org/docs/handbook/intro.html
- **Tailwind CSS docs** — https://tailwindcss.com/docs/utility-first

---

## Week 3 Preview

Next session: Git branching until it's muscle memory + scaffolding the real AgentForge landing page (replacing the default Next.js homepage). You'll build a hero section, feature cards, and CTA buttons that match what you designed for AgentForge.

**Your Week 3 opening Claude Code prompt:**

```
I'm building AgentForge — a visual AI agent builder for non-developers.
Replace the default Next.js homepage (src/app/page.tsx) with the real
AgentForge landing page. I need:
- Hero: headline "Build AI Agents Without Code", subtitle,
  two buttons (Get Started + View on GitHub)
- Features: 3 cards (Visual Builder, Tool Integrations, Shareable Links)
- Dark theme, clean modern design
Use Next.js 14 App Router, TypeScript, Tailwind CSS.
Explain every component and Tailwind class you use.
```

---

*Week 2 Guide — AgentForge · 8-Hour Plan · Built with Claude Code · April 2026*
