export function Loader({
  size = "md",
  className = "",
}: {
  size?: "sm" | "md" | "lg"
  className?: string
}) {
  const sizes = {
    sm: "h-8 w-8",
    md: "h-12 w-12",
    lg: "h-16 w-16",
  }

  return (
    <div className={`relative ${sizes[size]} ${className}`}>
      <div className="absolute inset-0 border-4 border-cyan-400/20 rounded-full"></div>
      <div className="absolute inset-0 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/10 to-indigo-400/10 rounded-full animate-pulse-glow"></div>
    </div>
  )
}
