'use server'

import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export async function deleteAgent(formData: FormData) {
  const id = formData.get('id') as string

  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/auth/login')

  // .eq('user_id', user.id) ensures a user can only delete their own agents
  await supabase.from('agents').delete().eq('id', id).eq('user_id', user.id)

  redirect('/dashboard')
}
