import { Link } from "react-router"

export default function NotFoundView() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex flex-col items-center justify-center p-4 md:p-8 space-y-6 md:space-y-8">
      <div className="text-center space-y-4 md:space-y-6 w-full max-w-4xl px-4">
        {/* Icono animado */}
        <div className="mx-auto animate-pulse flex items-center justify-center">
          <div className="w-16 h-16 md:w-24 md:h-24 bg-gradient-to-r from-cyan-400/20 to-indigo-400/20 rounded-full border-2 md:border-4 border-cyan-400/30 flex items-center justify-center">
            <svg
              className="w-10 h-10 md:w-16 md:h-16 text-cyan-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
        </div>

        {/* Texto con efecto gradiente */}
        <div className="space-y-2 md:space-y-4">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold bg-gradient-to-r from-cyan-400 to-indigo-500 bg-clip-text text-transparent">
            404 - Usuario no encontrado
          </h1>
          <div className="h-[2px] bg-gradient-to-r from-cyan-400/0 via-cyan-400 to-indigo-500/0 w-3/4 mx-auto" />
        </div>

        {/* Mensaje adicional */}
        <p className="text-base md:text-lg lg:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
          El perfil que buscas parece haberse desvanecido en el{" "}
          <span className="bg-gradient-to-r from-cyan-400 to-indigo-400 bg-clip-text text-transparent font-bold">
            ciberespacio
          </span>
        </p>

        {/* Botón de regreso */}
        <Link
          to="/"
          className="mt-6 md:mt-8 bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 
                    text-white px-6 py-3 md:px-8 md:py-4 rounded-lg md:rounded-xl font-bold text-base md:text-lg transition-all 
                    duration-200 hover:shadow-lg hover:shadow-cyan-400/20 flex items-center justify-center gap-2 group w-full sm:w-auto"
        >
          <svg
            className="w-5 h-5 md:w-6 md:h-6 group-hover:-translate-x-1 transition-transform"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M11 15l-3-3m0 0l3-3m-3 3h8M3 12a9 9 0 1118 0 9 9 0 01-18 0z"
            />
          </svg>
          Volver al Inicio
        </Link>
      </div>
    </div>
  )
}
