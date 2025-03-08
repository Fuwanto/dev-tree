import { SocialNetwork, UserHandle } from "../types"

type HandleDataProps = {
  data: UserHandle
}

export default function HandleData({ data }: HandleDataProps) {
  const links: SocialNetwork[] = JSON.parse(data.links).filter(
    (link: SocialNetwork) => link.enabled
  )

  return (
    <div className="space-y-8 md:space-y-12 text-white max-w-4xl mx-auto px-4 md:px-6 py-12">
      {/* Handle con gradiente */}
      <div className="text-center">
        <h1 className="text-4xl md:text-6xl font-extrabold bg-gradient-to-r from-cyan-400 to-indigo-400 bg-clip-text text-transparent">
          @{data.handle}
          <div className="h-[2px] mt-2 bg-gradient-to-r from-cyan-400/0 via-cyan-400 to-indigo-400/0 mx-auto w-3/4" />
        </h1>
      </div>

      {/* Imagen de perfil con efecto hover */}
      {data.image && (
        <div className="group relative mx-auto w-full max-w-[280px] transition-transform hover:scale-105">
          <img
            src={data.image}
            alt="Imagen de Perfil"
            className="rounded-2xl border-4 border-cyan-400/20 w-full aspect-square object-cover transition-all group-hover:border-cyan-400/40"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent rounded-2xl" />
        </div>
      )}

      {/* Descripción */}
      <p className="text-lg md:text-xl text-center text-gray-300 italic font-medium px-4 md:px-8">
        "{data.description}"
      </p>

      {/* Links */}
      <div className="mt-12 grid gap-6 md:gap-8">
        {links.length ? (
          links.map((link) => (
            <a
              key={link.id}
              href={link.url}
              target="_blank"
              rel="noreferrer noopenner"
              className="group bg-gray-800/50 border-2 border-cyan-400/20 rounded-xl p-4 md:p-6
                         hover:border-cyan-400/40 transition-all duration-200 cursor-pointer
                         flex items-center gap-4 md:gap-6 hover:-translate-y-1"
            >
              {/* Icono con efecto neón */}
              <div
                className="w-12 h-12 md:w-14 md:h-14 bg-cover border-2 border-cyan-400/20 rounded-full p-2
                               transition-all group-hover:border-cyan-400/40 "
                style={{
                  backgroundImage: `url("/social/icon_${link.name}.svg")`,
                }}
              />

              {/* Texto del enlace */}
              <div className="flex-1">
                <p className="text-xs md:text-sm font-medium text-gray-400">
                  Visitar mi
                </p>
                <p className="text-lg md:text-xl font-bold bg-gradient-to-r from-cyan-400 to-indigo-400 bg-clip-text text-transparent">
                  {link.name}
                </p>
              </div>

              {/* Icono de flecha */}
              <svg
                className="w-6 h-6 text-cyan-400/50 group-hover:text-cyan-400 transition-colors"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </a>
          ))
        ) : (
          <p className="text-center text-gray-400 italic py-8">
            No hay enlaces disponibles en este perfil
          </p>
        )}
      </div>
    </div>
  )
}
