'use client'

import { createClient } from '@/lib/supabase/client'

export default function SignOutButton() {
  async function handleSignOut() {
    const supabase = createClient()
    await supabase.auth.signOut()
    window.location.href = '/auth/login'
  }

  return (
    <button
      onClick={handleSignOut}
      className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-gray-800 hover:bg-gray-700 active:scale-[0.98] text-gray-300 hover:text-white font-medium text-sm rounded-lg transition-all"
    >
      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
      </svg>
      Sign out
    </button>
  )
}
