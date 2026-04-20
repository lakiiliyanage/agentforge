import AgentCard from "@/components/practice/AgentCard"
import MessageCounter from "@/components/practice/MessageCounter"
import AgentList from "@/components/practice/AgentList"

export default function PracticePage() {
  return (
    <main className="min-h-screen bg-gray-950 p-10">
      <h1 className="text-white text-2xl font-bold mb-8">React Practice Components</h1>
      <div className="flex flex-wrap gap-6">
        <AgentCard
          name="Finance Advisor"
          description="Answers financial questions, tracks budgets, and generates spending reports."
          toolCount={4}
          isPublic={true}
        />
        <MessageCounter />
        <AgentList />
      </div>
    </main>
  )
}
