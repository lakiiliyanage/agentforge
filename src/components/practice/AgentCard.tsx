interface AgentCardProps {
  name: string
  description: string
  toolCount: number
  isPublic: boolean
}

export default function AgentCard({ name, description, toolCount, isPublic }: AgentCardProps) {
  return (
    // group            — marks this as the hover parent so children can react to it
    // relative         — lets us position the accent bar absolutely inside
    // bg-gray-900      — dark card surface
    // border           — 1px border
    // border-gray-800  — subtle edge, just enough to separate from the page
    // rounded-2xl      — softer corners than rounded-xl, feels more modern
    // p-6              — 24px padding all sides, generous breathing room
    // w-72             — fixed 288px width
    // shadow-lg        — medium drop shadow to lift the card off the page
    // hover:shadow-violet-900/30 — on hover, shadow picks up a violet tint
    // hover:border-gray-700     — border gets slightly lighter on hover
    // transition-all duration-200 — all changes animate over 200ms
    // overflow-hidden  — clips the accent bar to the card's rounded corners
    // cursor-pointer   — shows hand cursor on hover (signals it's interactive)
    <div className="group relative bg-gray-900 border border-gray-800 rounded-2xl p-6 w-72 shadow-lg hover:shadow-violet-900/30 hover:border-gray-700 transition-all duration-200 overflow-hidden cursor-pointer">

      {/* ── Coloured accent bar ── */}
      {/* absolute inset-x-0 top-0 — stretches edge to edge across the very top */}
      {/* h-0.5           — just 2px tall, a thin line */}
      {/* bg-gradient-to-r from-violet-600 to-indigo-600 — horizontal gradient, violet → indigo */}
      {/* opacity-0 group-hover:opacity-100 — invisible by default, fades in on card hover */}
      {/* transition-opacity — only animates the opacity (not other properties) */}
      <div className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-violet-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />

      {/* ── Header row: name + visibility badge ── */}
      {/* flex justify-between items-start — name on left, badge on right, aligned to top */}
      {/* mb-3 — 12px gap below before the description */}
      <div className="flex justify-between items-start mb-3">

        {/* ── Agent name ── */}
        <div className="flex items-center gap-2">
          {/* w-8 h-8        — 32×32px avatar circle */}
          {/* rounded-full   — perfect circle */}
          {/* bg-violet-600/20 — soft violet tint background */}
          {/* flex items-center justify-center — centres the initial inside */}
          {/* text-violet-400 text-sm font-bold — violet initial letter */}
          <div className="w-8 h-8 rounded-full bg-violet-600/20 flex items-center justify-center text-violet-400 text-sm font-bold flex-shrink-0">
            {name.charAt(0)}
          </div>
          {/* text-white font-semibold text-base — clear, readable name */}
          <h2 className="text-white font-semibold text-base leading-tight">{name}</h2>
        </div>

        {/* ── Public / Private badge ── */}
        {/* Colour changes based on isPublic value */}
        <span className={`text-xs font-medium px-2.5 py-1 rounded-full flex-shrink-0 ${
          isPublic
            ? "bg-emerald-500/10 text-emerald-400"  // green tint for public
            : "bg-gray-700/50 text-gray-400"         // grey for private
        }`}>
          {isPublic ? "Public" : "Private"}
        </span>
      </div>

      {/* ── Description ── */}
      {/* text-gray-400 text-sm  — muted, smaller than the name */}
      {/* leading-relaxed        — 1.625 line height, easier to read multi-line text */}
      {/* mb-5                   — 20px gap before the footer row */}
      {/* line-clamp-2           — truncates to 2 lines with "..." if text is too long */}
      <p className="text-gray-400 text-sm leading-relaxed mb-5 line-clamp-2">{description}</p>

      {/* ── Footer row: tool count + arrow ── */}
      {/* flex items-center justify-between — tool count left, arrow right */}
      {/* pt-4 border-t border-gray-800 — divider line above the footer */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-800">

        {/* ── Tool count ── */}
        <div className="flex items-center gap-1.5">
          {/* The wrench icon — an SVG, 14×14px, muted grey */}
          <svg className="w-3.5 h-3.5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-4.614m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z" />
          </svg>
          {/* text-xs text-gray-500 — small, secondary info */}
          <span className="text-xs text-gray-500">{toolCount} {toolCount === 1 ? "tool" : "tools"}</span>
        </div>

        {/* ── Arrow — appears on hover ── */}
        {/* text-gray-600 group-hover:text-violet-400 — grey by default, violet on card hover */}
        {/* translate-x-0 group-hover:translate-x-1   — nudges right by 4px on hover */}
        {/* transition-all — animates colour + position */}
        <svg className="w-4 h-4 text-gray-600 group-hover:text-violet-400 translate-x-0 group-hover:translate-x-1 transition-all duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
        </svg>
      </div>

    </div>
  )
}
