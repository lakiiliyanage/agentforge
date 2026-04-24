import Button from "@/components/ui/Button"

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-12">
      <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-4">{title}</p>
      <div className="flex flex-wrap items-center gap-3">{children}</div>
    </div>
  )
}

export default function DemoPage() {
  return (
    <main className="min-h-screen bg-gray-950 text-white">
      <div className="max-w-3xl mx-auto px-6 py-16">
        <h1 className="text-2xl font-bold mb-2">Button Component</h1>
        <p className="text-gray-400 text-sm mb-12">
          All variants, sizes, and states — for use across AgentForge.
        </p>

        <Section title="Variants">
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="ghost">Ghost</Button>
        </Section>

        <Section title="Sizes">
          <Button size="sm">Small</Button>
          <Button size="md">Medium</Button>
          <Button size="lg">Large</Button>
        </Section>

        <Section title="Disabled">
          <Button variant="primary" disabled>Primary</Button>
          <Button variant="secondary" disabled>Secondary</Button>
          <Button variant="ghost" disabled>Ghost</Button>
        </Section>

        <Section title="As Link (href prop)">
          <Button href="/" variant="primary">Go Home</Button>
          <Button href="/dashboard" variant="secondary">Dashboard</Button>
          <Button href="/auth/signup" variant="ghost">Sign Up</Button>
        </Section>

        <Section title="Real AgentForge usage">
          <Button variant="primary" size="lg" href="/auth/signup">Get Started Free</Button>
          <Button variant="secondary" size="lg">View on GitHub</Button>
          <Button variant="ghost" size="sm">Cancel</Button>
          <Button variant="primary" size="sm" disabled>Saving...</Button>
        </Section>
      </div>
    </main>
  )
}
