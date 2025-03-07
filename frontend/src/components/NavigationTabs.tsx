import { BookmarkSquareIcon, UserIcon } from "@heroicons/react/20/solid"
import { Link, useLocation, useNavigate } from "react-router"
import { classNames } from "../utils"

const tabs = [
  { name: "Links", href: "/admin", icon: BookmarkSquareIcon },
  { name: "Mi Perfil", href: "/admin/profile", icon: UserIcon },
]

export default function NavigationTabs() {
  const location = useLocation()
  const navigate = useNavigate()

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    navigate(e.target.value)
  }

  return (
    <div className="mb-8 rounded-2xl p-4 shadow-2xl">
      <div className="sm:hidden">
        <label htmlFor="tabs" className="sr-only">
          Select a tab
        </label>
        <select
          id="tabs"
          name="tabs"
          className="w-full bg-gray-800/50 border-2 border-cyan-400/20 rounded-xl py-3 px-4 
                text-gray-300 focus:ring-2 focus:ring-cyan-400/50 focus:border-cyan-400/30 
                hover:border-cyan-400/40 transition-all cursor-pointer"
          onChange={handleChange}
        >
          {tabs.map((tab) => (
            <option
              value={tab.href}
              key={tab.name}
              className="bg-gray-800 text-gray-200"
            >
              {tab.name}
            </option>
          ))}
        </select>
      </div>

      <div className="hidden sm:block">
        <div className="border-b border-gray-700/40">
          <nav className="-mb-px flex space-x-6" aria-label="Tabs">
            {tabs.map((tab) => (
              <Link
                key={tab.name}
                to={tab.href}
                className={classNames(
                  location.pathname === tab.href
                    ? "text-cyan-400 border-cyan-400 bg-gradient-to-r from-cyan-400/10 to-transparent"
                    : "text-gray-400 border-transparent hover:border-cyan-400/30 hover:text-cyan-200",
                  "group relative flex items-center py-4 px-6 border-b-2 font-medium text-lg rounded-t-xl",
                  "transition-all duration-200 hover:scale-[1.02] hover:bg-gray-800/20"
                )}
              >
                <div className="flex items-center gap-2">
                  <tab.icon
                    className={classNames(
                      location.pathname === tab.href
                        ? "text-cyan-400 drop-shadow-glow"
                        : "text-gray-400 group-hover:text-cyan-300",
                      "w-6 h-6 transition-all",
                      location.pathname === tab.href ? "animate-pulse" : ""
                    )}
                    aria-hidden="true"
                  />
                  <span className="bg-gradient-to-r from-cyan-400 to-indigo-400 bg-clip-text text-transparent">
                    {tab.name}
                  </span>
                </div>

                {location.pathname === tab.href && (
                  <div className="absolute -bottom-px left-0 right-0 h-[2px] bg-gradient-to-r from-cyan-400 to-indigo-500 shadow-lg shadow-cyan-400/20" />
                )}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </div>
  )
}
