const agents = [
  { id: 1, name: "Finance Advisor", status: "Active" },
  { id: 2, name: "Research Bot", status: "Active" },
  { id: 3, name: "Daily Briefer", status: "Idle" },
  { id: 4, name: "Customer Support", status: "Active" }
]

export default function AgentList() {
  return (
    <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 w-72">
      <h2 className="text-white font-semibold text-lg mb-4">Your Agents</h2>
      <ul className="flex flex-col gap-2">
        {agents.map((agent) => (
          <li
            key={agent.id}
            className="flex items-center justify-between bg-gray-900 rounded-lg px-4 py-3"
          >
            <span className="text-white text-sm">{agent.name}</span>
            <span
              className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                agent.status === "Active"
                  ? "bg-green-900 text-green-400"
                  : "bg-gray-700 text-gray-400"
              }`}
            >
              {agent.status}
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}
