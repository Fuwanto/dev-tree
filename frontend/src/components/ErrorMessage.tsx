type ErrorMessageProps = {
  children: React.ReactNode
}

export default function ErrorMessage({ children }: ErrorMessageProps) {
  return (
    <div className="inline-flex items-center gap-3 bg-red-500/10 border border-red-400/30 text-red-300/90 px-4 py-3 rounded-xl text-sm font-medium transition-all animate-fade-in">
      <svg
        className="w-5 h-5 flex-shrink-0 animate-pulse"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
        />
      </svg>
      <span className="bg-gradient-to-r from-red-400 to-rose-400 bg-clip-text text-transparent">
        {children}
      </span>
    </div>
  )
}
