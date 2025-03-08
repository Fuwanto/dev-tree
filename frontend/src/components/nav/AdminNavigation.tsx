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
    <div className="flex items-center gap-4 md:gap-6">
      <Link
        to="/admin"
        className="text-gray-300 hover:text-indigo-400 transition-all
                   duration-200 hover:bg-gradient-to-r from-indigo-400/10 to-transparent
                   px-3 py-2 rounded-lg relative group"
      >
        Administrar Perfil
        <div
          className="absolute bottom-0 left-0 w-0 h-[2px] bg-gradient-to-r from-indigo-400 to-cyan-400 
                       transition-all duration-300 group-hover:w-full"
        ></div>
      </Link>

      <button
        onClick={logout}
        className="text-gray-300 hover:text-cyan-400 transition-all
                   duration-200 hover:bg-gradient-to-r from-cyan-400/10 to-transparent
                   px-3 py-2 rounded-lg relative group cursor-pointer"
      >
        Cerrar Sesión
        <div
          className="absolute bottom-0 left-0 w-0 h-[2px] bg-gradient-to-r from-cyan-400 to-indigo-400 
                       transition-all duration-300 group-hover:w-full"
        ></div>
      </button>
    </div>
  )
}
