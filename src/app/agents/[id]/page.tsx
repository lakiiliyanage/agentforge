interface AgentPageProps {
  params: Promise<{ id: string }>
}

export default async function AgentPage({ params }: AgentPageProps) {
  const { id } = await params

  return (
    <main className="min-h-screen bg-gray-950 text-white flex items-center justify-center">
      <div className="text-center">
        <p className="text-gray-500 text-sm uppercase tracking-widest mb-2">Route: /agents/[id]</p>
        <h1 className="text-3xl font-bold">Agent</h1>
        <p className="text-gray-400 mt-2">Viewing agent: <span className="text-violet-400 font-mono">{id}</span></p>
      </div>
    </main>
  )
}
