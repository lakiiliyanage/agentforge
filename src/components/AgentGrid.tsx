'use client'

import { useState } from 'react'
import AgentCard from './AgentCard'
import EmptyState from './EmptyState'

export type GridAgent = {
  id: string
  name: string
  description: string
  personality: string
  created_at: string
}

export default function AgentGrid({ initialAgents }: { initialAgents: GridAgent[] }) {
  // Starts with the server-fetched list. Deletes are applied locally so the
  // page doesn't need a full server round-trip to reflect a removed card.
  const [agents, setAgents] = useState(initialAgents)

  function handleDelete(id: string) {
    setAgents(prev => prev.filter(agent => agent.id !== id))
  }

  if (agents.length === 0) return <EmptyState />

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {agents.map(agent => (
        <AgentCard
          key={agent.id}
          id={agent.id}
          name={agent.name}
          description={agent.description}
          personality={agent.personality}
          createdAt={agent.created_at}
          onDelete={handleDelete}
        />
      ))}
    </div>
  )
}
