import { Link } from "react-router"

export default function HomeNavigation() {
  return (
    <div className="flex items-center gap-4 md:gap-6">
      <Link
        to="/auth/login"
        className="text-gray-300 hover:text-cyan-400 transition-all
                   duration-200 hover:bg-gradient-to-r from-cyan-400/10 to-transparent
                   px-3 py-2 rounded-lg relative group"
      >
        Acceder
        <div
          className="absolute bottom-0 left-0 w-0 h-[2px] bg-gradient-to-r from-cyan-400 to-indigo-400 
                       transition-all duration-300 group-hover:w-full"
        ></div>
      </Link>

      <Link
        to="/auth/register"
        className="text-gray-300 hover:text-indigo-400 transition-all
                   duration-200 hover:bg-gradient-to-r from-indigo-400/10 to-transparent
                   px-3 py-2 rounded-lg relative group"
      >
        Registrarse
        <div
          className="absolute bottom-0 left-0 w-0 h-[2px] bg-gradient-to-r from-indigo-400 to-cyan-400 
                       transition-all duration-300 group-hover:w-full"
        ></div>
      </Link>
    </div>
  )
}
