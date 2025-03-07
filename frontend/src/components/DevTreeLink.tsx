import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { SocialNetwork } from "../types"

type DevTreeLinkProps = {
  link: SocialNetwork
}

export default function DevTreeLink({ link }: DevTreeLinkProps) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: link.id,
    })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  return (
    <li
      ref={setNodeRef}
      style={style}
      className="bg-gray-800/50 border border-cyan-400/20 px-6 py-4 flex items-center gap-4 rounded-xl 
                shadow-lg hover:shadow-cyan-400/10 hover:-translate-y-0.5 transition-all duration-200 group
                cursor-grab active:cursor-grabbing active:scale-[0.98] active:border-cyan-400/50"
      {...attributes}
      {...listeners}
    >
      {/* Icono con efecto neón */}
      <div
        className="w-14 h-14 bg-cover bg-no-repeat border-2 border-cyan-400/20 rounded-full p-2 transition-all
                 group-hover:border-cyan-400/40 group-hover:shadow-glow"
        style={{ backgroundImage: `url("/social/icon_${link.name}.svg")` }}
      ></div>

      {/* Texto con gradiente */}
      <div className="flex-1">
        <p className="text-gray-400 text-sm font-medium">
          Conéctate en mi{" "}
          <span
            className="bg-gradient-to-r from-cyan-400 to-indigo-400 bg-clip-text text-transparent 
                          font-bold text-lg font-mono tracking-wide"
          >
            {link.name}
          </span>
        </p>
      </div>

      {/* Handle de arrastre personalizado */}
      <div className="text-cyan-400/50 hover:text-cyan-400 transition-colors pl-4">
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
          />
        </svg>
      </div>
    </li>
  )
}
