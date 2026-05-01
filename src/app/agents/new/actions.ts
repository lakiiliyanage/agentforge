'use server'

import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export type CreateAgentState =
  | { error: string }
  | undefined

export async function createAgent(
  _state: CreateAgentState,
  formData: FormData
): Promise<CreateAgentState> {
  const name = (formData.get('name') as string).trim()
  const description = (formData.get('description') as string).trim()
  const personality = (formData.get('personality') as string).trim()
  const goal = (formData.get('goal') as string).trim()

  if (!name) return { error: 'Agent name is required.' }

  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/auth/login')

  const { error } = await supabase.from('agents').insert({
    user_id: user.id,
    name,
    description,
    config: { personality, goal },
  })

  if (error) return { error: error.message }

  redirect('/dashboard')
}
