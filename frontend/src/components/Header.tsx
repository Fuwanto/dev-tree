import { Link } from "react-router"
import HomeNavigation from "./nav/HomeNavigation"
import AdminNavigation from "./nav/AdminNavigation"

export default function Header() {
  const token = localStorage.getItem("AUTH_TOKEN")

  return (
    <header className="relative z-10 border-b border-cyan-400/20  ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <nav className="flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2 group transition-all">
            <img
              src="/logo.svg"
              alt="Logo"
              className="h-10 w-10 transition-transform group-hover:rotate-12"
            />
            <span className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-indigo-400 bg-clip-text text-transparent">
              DevTree
            </span>
          </Link>
          {token ? <AdminNavigation /> : <HomeNavigation />}
        </nav>
      </div>
    </header>
  )
}
