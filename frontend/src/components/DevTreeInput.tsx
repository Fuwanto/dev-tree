import { Switch } from "@headlessui/react"
import { classNames } from "../utils"
import { DevTreeLink } from "../types"

type DevTreeInputProps = {
  item: DevTreeLink
  handleUrlChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleEnabledLink: (socialNetWork: string) => void
}

export default function DevTreeInput({
  item,
  handleUrlChange,
  handleEnabledLink,
}: DevTreeInputProps) {
  return (
    <div className="bg-gray-800/50 border border-cyan-400/20 p-4 md:p-6 rounded-xl shadow-lg hover:shadow-cyan-400/10 transition-all duration-200 group">
      <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6 flex-wrap">
        {/* Icon Container - Responsive */}
        <div
          className="w-10 h-10 md:w-14 md:h-14 bg-cover bg-no-repeat border-2 border-cyan-400/20 rounded-full 
                   p-1.5 md:p-2 transition-all group-hover:border-cyan-400/40 group-hover:shadow-glow"
          style={{ backgroundImage: `url("/social/icon_${item.name}.svg")` }}
        ></div>

        {/* Input Field - Responsive */}
        <input
          type="text"
          className="w-full md:flex-1 bg-gray-700/40 border-2 border-gray-600/30 focus:border-cyan-400/50 
                    focus:ring-2 focus:ring-cyan-400/20 rounded-xl py-2 md:py-3 px-3 md:px-4 text-gray-200 
                    placeholder-gray-500 transition-all hover:border-cyan-400/30 font-mono text-xs md:text-sm"
          value={item.url}
          onChange={handleUrlChange}
          name={item.name}
          placeholder="https://..."
        />

        {/* Custom Switch - Responsive */}
        <Switch
          checked={item.enabled}
          onChange={() => handleEnabledLink(item.name)}
          className={classNames(
            item.enabled ? "bg-cyan-400" : "bg-gray-600",
            "relative inline-flex h-6 w-12 md:h-7 md:w-14 flex-shrink-0 cursor-pointer rounded-full border-2",
            "border-transparent transition-colors duration-200 ease-in-out focus:outline-none",
            "focus:ring-2 focus:ring-cyan-400/30 hover:shadow-glow"
          )}
        >
          <span
            aria-hidden="true"
            className={classNames(
              item.enabled ? "translate-x-6 md:translate-x-7" : "translate-x-0",
              "pointer-events-none inline-block h-5 w-5 md:h-6 md:w-6 transform rounded-full",
              "bg-gradient-to-b from-white to-cyan-100 shadow-lg ring-0 transition duration-200 ease-in-out"
            )}
          />
        </Switch>
      </div>
    </div>
  )
}
