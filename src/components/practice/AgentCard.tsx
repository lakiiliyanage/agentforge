interface AgentCardProps {
  name: string
  description: string
  toolCount: number
  isPublic: boolean
}

export default function AgentCard({ name, description, toolCount, isPublic }: AgentCardProps) {
  return (
    <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 w-72">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-white font-semibold text-lg">{name}</h2>
        <span className="bg-violet-600 text-white text-xs font-medium px-2 py-1 rounded-full">
          {toolCount} tools
        </span>
      </div>
      <p className="text-gray-400 text-sm leading-relaxed">{description}</p>
      <p className="text-gray-500 text-xs mt-3">{isPublic ? "Public" : "Private"}</p>
    </div>
  )
}
