"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Dashboard", href: "/dashboard" },
]

export default function Navbar() {
  const pathname = usePathname()

  return (
    // sticky top-0 z-50   — stays pinned to the top of the viewport as you scroll
    //                        z-50 ensures it sits above all other page content
    // bg-gray-950/80      — dark background at 80% opacity
    // backdrop-blur-md    — blurs whatever is scrolling behind the nav (frosted glass effect)
    // border-b            — bottom border only
    // border-gray-800/60  — subtle, semi-transparent border line
    <nav className="sticky top-0 z-50 bg-gray-950/80 backdrop-blur-md border-b border-gray-800/60">

      {/* max-w-5xl mx-auto  — centres content, matches the page width used on the landing page */}
      {/* px-6 h-16          — 24px side padding, 64px tall */}
      {/* flex items-center justify-between — logo left, links + CTA right */}
      <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">

        {/* ── Logo ── */}
        <Link
          href="/"
          className="flex items-center gap-2 font-semibold text-white hover:opacity-80 transition-opacity"
        >
          {/* Small icon before the wordmark */}
          <span className="w-7 h-7 bg-violet-600 rounded-lg flex items-center justify-center text-sm">
            ⚡
          </span>
          AgentForge
        </Link>

        {/* ── Nav links + CTA ── */}
        <div className="flex items-center gap-6">

          {/* Internal nav links */}
          {navLinks.map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              // Active state: white text when on the current page, gray otherwise
              // pathname === href checks if the current URL matches this link's href
              className={`text-sm transition-colors ${
                pathname === href
                  ? "text-white font-medium"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              {label}
            </Link>
          ))}

          {/* GitHub — external link, opens in new tab */}
          {/* rel="noopener noreferrer" is a security best practice for external links */}
          <a
            href="https://github.com/lakiiliyanage/agentforge"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-gray-400 hover:text-white transition-colors flex items-center gap-1.5"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
            </svg>
            GitHub
          </a>

          {/* ── Get Started CTA ── */}
          <Link
            href="/auth/signup"
            className="text-sm bg-violet-600 hover:bg-violet-500 active:scale-95 text-white font-medium px-4 py-2 rounded-lg transition-all"
          >
            Get Started
          </Link>

        </div>
      </div>
    </nav>
  )
}
