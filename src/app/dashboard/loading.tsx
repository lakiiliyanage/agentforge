// Next.js renders this file automatically while dashboard/page.tsx is suspended.
// The skeleton mirrors the exact structure of AgentCard + the page header.

function SkeletonCard() {
  return (
    <div className="bg-gray-900 border border-gray-800 rounded-2xl p-5 animate-pulse">

      {/* Name + badge row */}
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="h-4 w-2/3 bg-gray-800 rounded" />
        <div className="h-5 w-16 bg-gray-800 rounded-full shrink-0" />
      </div>

      {/* Description — two lines */}
      <div className="space-y-2 mb-4">
        <div className="h-3 w-full bg-gray-800 rounded" />
        <div className="h-3 w-3/4 bg-gray-800 rounded" />
      </div>

      {/* Footer: date + buttons */}
      <div className="pt-4 border-t border-gray-800/60 flex items-center justify-between">
        <div className="h-3 w-24 bg-gray-800 rounded" />
        <div className="flex items-center gap-1.5">
          <div className="h-6 w-10 bg-gray-800 rounded-lg" />
          <div className="h-6 w-14 bg-gray-800 rounded-lg" />
        </div>
      </div>

    </div>
  )
}

export default function DashboardLoading() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-10">

      {/* Header skeleton */}
      <div className="flex items-center justify-between mb-8 animate-pulse">
        <div className="space-y-2">
          <div className="h-7 w-36 bg-gray-800 rounded" />
          <div className="h-4 w-24 bg-gray-800 rounded" />
        </div>
        <div className="h-9 w-36 bg-gray-800 rounded-lg" />
      </div>

      {/* Card grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
      </div>

    </div>
  )
}
