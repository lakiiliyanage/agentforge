import Link from "next/link"

type ButtonVariant = "primary" | "secondary" | "ghost"
type ButtonSize = "sm" | "md" | "lg"

interface ButtonProps {
  children: React.ReactNode
  variant?: ButtonVariant
  size?: ButtonSize
  href?: string
  disabled?: boolean
  onClick?: () => void
  type?: "button" | "submit" | "reset"
  className?: string
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:   "bg-violet-600 hover:bg-violet-500 text-white border border-transparent",
  secondary: "bg-gray-800 hover:bg-gray-700 text-white border border-gray-700 hover:border-gray-600",
  ghost:     "bg-transparent hover:bg-gray-800 text-gray-400 hover:text-white border border-transparent",
}

const sizeStyles: Record<ButtonSize, string> = {
  sm: "text-xs px-3 py-1.5 rounded-lg",
  md: "text-sm px-4 py-2 rounded-lg",
  lg: "text-base px-6 py-3 rounded-xl",
}

const baseStyles = "inline-flex items-center justify-center font-medium transition-all active:scale-95 disabled:opacity-40 disabled:pointer-events-none"

export default function Button({
  children,
  variant = "primary",
  size = "md",
  href,
  disabled = false,
  onClick,
  type = "button",
  className = "",
}: ButtonProps) {
  const styles = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`

  if (href) {
    return (
      <Link href={href} className={styles}>
        {children}
      </Link>
    )
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={styles}
    >
      {children}
    </button>
  )
}
