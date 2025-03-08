import { Outlet, Link } from "react-router"

export default function PublicLayout() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden">
      {/* Header público */}
      <header className="relative z-10 border-b border-cyan-400/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <nav className="flex justify-between items-center">
            <Link
              to="/"
              className="flex items-center gap-2 group transition-all"
            >
              <img
                src="/logo.svg"
                alt="Logo"
                className="h-10 w-10 transition-transform group-hover:rotate-12"
              />
              <span className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-indigo-400 bg-clip-text text-transparent">
                DevTree
              </span>
            </Link>

            <div className="flex gap-6">
              <Link
                to="/auth/login"
                className="text-gray-400 hover:text-cyan-400 transition-colors"
              >
                Acceder
              </Link>
              <Link
                to="/auth/register"
                className="text-gray-400 hover:text-indigo-400 transition-colors"
              >
                Registrarse
              </Link>
            </div>
          </nav>
        </div>
      </header>

      {/* Contenido principal */}
      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className=" bg-gray-800/30 rounded-3xl border border-cyan-400/20 shadow-2xl p-6 md:p-10">
          <Outlet />
        </div>
      </main>

      {/* Footer público */}
      <footer className="relative z-10 border-t border-cyan-400/20 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <p className="text-center text-gray-400 text-sm">
            © {new Date().getFullYear()} DevTree. Conectando desarrolladores en
            el ciberespacio
          </p>
        </div>
      </footer>
    </div>
  )
}
