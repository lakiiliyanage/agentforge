import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import CreateAgentForm from './CreateAgentForm'

export default async function NewAgentPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/auth/login')

  return <CreateAgentForm />
}
