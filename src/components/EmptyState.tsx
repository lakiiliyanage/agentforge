import Link from 'next/link'

export default function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-24 px-6 text-center border border-dashed border-gray-800 rounded-2xl">

      {/* Icon */}
      <div className="w-20 h-20 bg-violet-600/10 rounded-3xl flex items-center justify-center mb-6">
        <svg
          className="w-10 h-10 text-violet-400"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.25}
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456z"
          />
        </svg>
      </div>

      {/* Headline */}
      <h2 className="text-xl font-bold text-white mb-2">No agents yet</h2>

      {/* Subtitle */}
      <p className="text-gray-400 text-sm max-w-xs leading-relaxed mb-8">
        Create your first agent and it will appear here.
      </p>

      {/* CTA */}
      <Link
        href="/agents/new"
        className="inline-flex items-center gap-2 bg-violet-600 hover:bg-violet-500 active:scale-95 text-white font-semibold text-sm px-6 py-3 rounded-xl transition-all shadow-lg shadow-violet-900/30"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
        </svg>
        Create your first agent
      </Link>

    </div>
  )
}
