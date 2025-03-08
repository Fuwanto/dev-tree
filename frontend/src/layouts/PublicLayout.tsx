import { Outlet } from "react-router"
import Header from "../components/Header"

export default function PublicLayout() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden">
      <Header />
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
