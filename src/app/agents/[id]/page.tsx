// Browser fires a http GET request with agents/123
// Next.js router: matches src/app/agents/[id]/page.tsx and renders the default export function AgentPage
// Extracts the id from the url (123)
// Wraps the id in the Promise
// Queries supabase for the agent with id 123 that belongs to the current user
// If found renders the page if not manages with a notFound() error


import { createClient } from '@/lib/supabase/server'
import { redirect, notFound } from 'next/navigation'
import Link from 'next/link'
import DeleteButton from './DeleteButton'

interface AgentPageProps {
  params: Promise<{ id: string }>
}

type AgentConfig = {
  personality?: string
  goal?: string
}

export default async function AgentPage({ params }: AgentPageProps) {
  const { id } = await params

  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/auth/login')

  const { data: agent } = await supabase
    .from('agents')
    .select('id, name, description, config, created_at')
    .eq('id', id)
    .eq('user_id', user.id)
    .single()

  if (!agent) notFound()

  const config = (agent.config ?? {}) as AgentConfig
  const date = new Intl.DateTimeFormat('en-US', {
    month: 'long', day: 'numeric', year: 'numeric',
  }).format(new Date(agent.created_at))

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">

      {/* ── Back link ── */}
      <Link
        href="/dashboard"
        className="inline-flex items-center gap-1.5 text-gray-500 hover:text-gray-300 text-sm transition-colors mb-6"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
        </svg>
        My Agents
      </Link>

      {/* ── Agent header ── */}
      <div className="flex items-start justify-between gap-4 mb-8">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-violet-600/15 rounded-2xl flex items-center justify-center shrink-0">
            <svg className="w-6 h-6 text-violet-400" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
            </svg>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">{agent.name ?? 'Untitled Agent'}</h1>
            {agent.description && (
              <p className="text-gray-400 text-sm mt-1 max-w-xl">{agent.description}</p>
            )}
            <p className="text-gray-600 text-xs mt-2">Created {date}</p>
          </div>
        </div>

        {/* Edit + Delete */}
        <div className="flex items-center gap-2 shrink-0">
          <Link
            href={`/agents/${id}/edit`}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-300 hover:text-white bg-gray-800 hover:bg-gray-700 border border-gray-700 px-3.5 py-2 rounded-lg transition-all active:scale-95"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
            </svg>
            Edit
          </Link>
          <DeleteButton agentId={id} />
        </div>
      </div>

      {/* ── Config details (only shown when values exist) ── */}
      {(config.personality || config.goal) && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          {config.personality && (
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-2">Personality</p>
              <p className="text-gray-300 text-sm leading-relaxed">{config.personality}</p>
            </div>
          )}
          {config.goal && (
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-2">Goal</p>
              <p className="text-gray-300 text-sm leading-relaxed">{config.goal}</p>
            </div>
          )}
        </div>
      )}

      {/* ── Chat placeholder ── */}
      <div className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden">

        {/* Chat header bar */}
        <div className="flex items-center gap-3 px-5 py-4 border-b border-gray-800">
          <div className="w-2 h-2 rounded-full bg-violet-500" />
          <span className="text-sm font-medium text-white">Chat with {agent.name ?? 'Agent'}</span>
          <span className="ml-auto text-xs text-gray-600 bg-gray-800 px-2.5 py-1 rounded-full">
            Coming soon
          </span>
        </div>

        {/* Placeholder body */}
        <div className="flex flex-col items-center justify-center py-20 px-6 text-center">
          <div className="w-14 h-14 bg-violet-600/10 rounded-2xl flex items-center justify-center mb-5">
            <svg className="w-7 h-7 text-violet-400/60" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
            </svg>
          </div>
          <p className="text-white font-semibold mb-1">AI integration coming in Week 6</p>
          <p className="text-gray-500 text-sm max-w-xs">
            Once connected, you&apos;ll be able to chat with your agent directly from this page.
          </p>
        </div>

      </div>
    </div>
  )
}
