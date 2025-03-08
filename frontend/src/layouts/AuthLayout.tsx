import { Navigate, Outlet } from "react-router"
import { Toaster } from "sonner"
import Header from "../components/Header"

export default function AuthLayout() {
  const token = localStorage.getItem("AUTH_TOKEN")

  if (token) return <Navigate to="/" />

  if (!token)
    return (
      <>
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden">
          <Header />
          <div className="relative max-w-xl mx-auto pt-12 px-4 sm:px-0">
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
