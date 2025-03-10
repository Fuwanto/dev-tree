import { Link, useNavigate } from "react-router"
import { useQueryClient } from "@tanstack/react-query"

export default function AdminNavigation() {
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const logout = () => {
    queryClient.invalidateQueries({ queryKey: ["user"] })
    localStorage.removeItem("AUTH_TOKEN")
    navigate("/auth/login")
  }

  return (
    <div className="flex flex-col md:flex-row items-stretch gap-2 md:gap-4">
      <Link
        to="/admin"
        className="group relative flex items-center justify-center gap-2 
                   px-4 py-2.5 md:py-2 text-sm md:text-base font-medium 
                   text-gray-300 hover:text-indigo-100 
                   bg-gray-800/40 hover:bg-gradient-to-r from-indigo-500/30 to-cyan-500/20 
                   border border-indigo-400/30 hover:border-indigo-400/50 
                   rounded-xl md:rounded-lg 
                   transition-all duration-200 
                   hover:shadow-lg hover:shadow-indigo-400/20
                   active:scale-95"
      >
        <svg
          className="w-5 h-5 text-indigo-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
          />
        </svg>
        Perfil
      </Link>

      <button
        onClick={logout}
        type="button"
        className="group relative flex items-center justify-center gap-2 
                   px-4 py-2.5 md:py-2 text-sm md:text-base font-medium 
                   text-gray-300 hover:text-cyan-100 
                   bg-gray-800/40 hover:bg-gradient-to-r from-cyan-500/30 to-indigo-500/20 
                   border border-cyan-400/30 hover:border-cyan-400/50 
                   rounded-xl md:rounded-lg 
                   transition-all duration-200 
                   hover:shadow-lg hover:shadow-cyan-400/20
                   active:scale-95
                   focus:outline-none focus:ring-2 focus:ring-cyan-400/50"
      >
        <svg
          className="w-5 h-5 text-cyan-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
          />
        </svg>
        Cerrar Sesión
      </button>
    </div>
  )
}
