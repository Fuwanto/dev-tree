interface LoaderProps {
  size?: "sm" | "md" | "lg"
  text?: string
}

export function Loader({ size = "md", text = "Cargando..." }: LoaderProps) {
  const loaderSize = {
    sm: "h-8 w-8",
    md: "h-12 w-12",
    lg: "h-16 w-16",
  }[size]

  const textSize = {
    sm: "text-base",
    md: "text-lg",
    lg: "text-xl",
  }[size]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex flex-col items-center justify-center p-4">
      <div className={`relative ${loaderSize} mb-4`}>
        <div className="absolute inset-0 border-4 border-cyan-400/20 rounded-full" />
        <div className="absolute inset-0 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin" />
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/10 to-indigo-400/10 rounded-full animate-pulse" />
      </div>

      <div className="text-center">
        <p
          className={`text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-400 font-medium ${textSize}`}
        >
          {text}
        </p>
      </div>
    </div>
  )
}
