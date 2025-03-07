import { Outlet } from "react-router"
import { Toaster } from "sonner"

export default function AuthLayout() {
  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden">
        {/* Efectos de fondo animados */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute -top-1/4 -left-1/4 w-[200%] h-[150%] animate-gradient-rotate bg-[conic-gradient(from_90deg_at_50%_50%,#0f172a_0%,#1e293b_25%,#0f172a_50%,#1e293b_75%,#0f172a_100%)]"></div>
        </div>

        <div className="relative max-w-md mx-auto pt-12 px-4 sm:px-0">
          {/* Logo con efectos interactivos */}
          <div className="flex justify-center mb-16 group">
            <img
              src="/logo.svg"
              alt="Logotipo Dev-tree"
              className="h-24 w-24 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-[360deg] hover:drop-shadow-glow"
            />
          </div>

          {/* Contenedor del formulario */}
          <div className="bg-gradient-to-br from-gray-800/60 to-gray-900/80 border border-cyan-400/20 rounded-3xl p-8 shadow-2xl hover:shadow-cyan-400/10 transition-all duration-300">
            <div className="py-8">
              <Outlet />
            </div>
          </div>
        </div>
      </div>

      <Toaster
        position="top-right"
        toastOptions={{
          className: "bg-gray-800/90 border border-cyan-400/20 text-gray-200",
        }}
      />
    </>
  )
}
