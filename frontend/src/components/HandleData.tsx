import { SocialNetwork, UserHandle } from "../types"

type HandleDataProps = {
  data: UserHandle
}

export default function HandleData({ data }: HandleDataProps) {
  const links: SocialNetwork[] = JSON.parse(data.links).filter(
    (link: SocialNetwork) => link.enabled
  )

  return (
    <div className="space-y-8 md:space-y-12 text-white max-w-4xl mx-auto px-4 md:px-6 py-8 md:py-12">
      {/* Handle con gradiente */}
      <div className="text-center px-2">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold bg-gradient-to-r from-cyan-400 to-indigo-400 bg-clip-text text-transparent pb-2">
          @{data.handle}
          <div className="relative mt-4">
            <div className="absolute inset-x-0 bottom-0 h-[2px] bg-gradient-to-r from-cyan-400/0 via-cyan-400/80 to-indigo-400/0 w-full" />
          </div>
        </h1>
      </div>

      {/* Imagen de perfil */}
      {data.image && (
        <div className="group relative mx-auto w-[200px] md:w-[280px] transition-transform hover:scale-[1.02] active:scale-95">
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900/50 to-transparent rounded-3xl" />
          <img
            src={data.image}
            alt="Imagen de Perfil"
            className="rounded-3xl border-4 border-cyan-400/20 w-full aspect-square object-cover 
                     transition-all duration-300 group-hover:border-cyan-400/40 shadow-xl"
          />
        </div>
      )}

      {/* Descripción */}
      <p
        className="text-lg md:text-xl text-center text-gray-300 px-4 md:px-8 max-w-2xl mx-auto 
                  leading-relaxed md:leading-loose"
      >
        {data.description}
      </p>

      {/* Links */}
      <div className="mt-8 md:mt-12 grid gap-4 md:gap-5 w-full max-w-xl mx-auto">
        {links.length ? (
          links.map((link) => (
            <a
              key={link.id}
              href={link.url}
              target="_blank"
              rel="noreferrer noopener"
              className="group relative bg-gray-800/50 border-2 border-cyan-400/20 rounded-2xl p-4 md:p-5
                         hover:border-cyan-400/40 transition-all duration-300 cursor-pointer
                         flex items-center gap-4 hover:-translate-y-0.5 shadow-md hover:shadow-cyan-400/20
                         active:scale-95 focus:outline-none focus:ring-2 focus:ring-cyan-400/50"
            >
              {/* Icono */}
              <div className="shrink-0 relative">
                <div
                  className="w-12 h-12 md:w-14 md:h-14 rounded-xl bg-gray-900/50 border-2 border-cyan-400/20 
                              flex items-center justify-center p-2 transition-all group-hover:border-cyan-400/40"
                >
                  <img
                    src={`/social/icon_${link.name}.svg`}
                    alt={link.name}
                    className="w-8 h-8 md:w-10 md:h-10 object-contain"
                  />
                </div>
              </div>

              {/* Texto */}
              <div className="flex-1 min-w-0">
                <p className="text-xs md:text-sm font-medium text-gray-400 truncate">
                  Visitar mi
                </p>
                <p
                  className="text-lg md:text-xl font-bold bg-gradient-to-r from-cyan-400 to-indigo-400 
                             bg-clip-text text-transparent truncate"
                >
                  {link.name}
                </p>
              </div>

              {/* Flecha */}
              <svg
                className="shrink-0 w-6 h-6 md:w-7 md:h-7 text-cyan-400/50 group-hover:text-cyan-400 
                         transition-colors ml-2"
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
          <div className="text-center py-8 md:py-12 flex flex-col items-center gap-4 text-gray-400">
            <svg
              className="w-12 h-12 opacity-50"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
              />
            </svg>
            <p className="italic">No hay enlaces disponibles</p>
          </div>
        )}
      </div>
    </div>
  )
}
