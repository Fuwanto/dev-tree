import { Link, Outlet } from "react-router"
import { Toaster } from "sonner"
import { DndContext, DragEndEvent, closestCenter } from "@dnd-kit/core"
import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable"
import NavigationTabs from "../components/NavigationTabs"
import { SocialNetwork, User } from "../types"
import { useEffect, useState } from "react"
import DevTreeLink from "./DevTreeLink"
import { useQueryClient } from "@tanstack/react-query"

type DevTreeProps = {
  data: User
}

export default function DevTree({ data }: DevTreeProps) {
  const [enabledLinks, setEnabledLinks] = useState<SocialNetwork[]>(
    JSON.parse(data.links).filter((item: SocialNetwork) => item.enabled)
  )

  useEffect(() => {
    setEnabledLinks(
      JSON.parse(data.links).filter((item: SocialNetwork) => item.enabled)
    )
  }, [data])

  const queryClient = useQueryClient()

  const handleDragEnd = (e: DragEndEvent) => {
    const { active, over } = e
    if (over && over.id) {
      const prevIndex = enabledLinks.findIndex((link) => link.id === active.id)
      const newIndex = enabledLinks.findIndex((link) => link.id === over.id)
      const order = arrayMove(enabledLinks, prevIndex, newIndex)
      setEnabledLinks(order)

      const disabledLinks: SocialNetwork[] = JSON.parse(data.links).filter(
        (item: SocialNetwork) => !item.enabled
      )

      const links = order.concat(disabledLinks)
      queryClient.setQueryData(["user"], (prevData: User) => {
        return {
          ...prevData,
          links: JSON.stringify(links),
        }
      })
    }
  }

  return (
    <>
      <header className="bg-gradient-to-r from-gray-900 to-gray-800 border-b border-cyan-400/20 py-6 shadow-xl">
        <div className="mx-auto max-w-7xl flex flex-col md:flex-row items-center md:justify-between px-6">
          <div className="w-full md:w-auto group transition-all duration-300">
            <img
              src="/logo.svg"
              className="w-48 hover:drop-shadow-glow transition-all hover:scale-105 hover:rotate-[5deg]"
              alt="Dev-tree Logo"
            />
          </div>
          <div className="mt-4 md:mt-0">
            <button
              className="bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-400 hover:to-rose-500
                        text-white px-6 py-3 uppercase font-bold text-sm rounded-xl cursor-pointer
                        transition-all duration-200 hover:shadow-lg hover:shadow-rose-400/30
                        flex items-center gap-2 group"
              onClick={() => {}}
            >
              <svg
                className="w-5 h-5 group-hover:rotate-180 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                />
              </svg>
              Cerrar Sesión
            </button>
          </div>
        </div>
      </header>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 py-12">
        <NavigationTabs />
        <main className="mx-auto max-w-7xl px-6">
          <div className="flex justify-end mb-8">
            <Link
              className="font-bold text-right bg-gradient-to-r from-cyan-400 to-indigo-400 hover:from-cyan-300 hover:to-indigo-300 
                        bg-clip-text text-transparent text-2xl underline-offset-4 hover:underline transition-all"
              to={""}
              target="_blank"
              rel="noreferrer noopener"
            >
              🌐 Visitar Mi Perfil /{data.handle}
            </Link>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            <div className="flex-1  bg-gray-800/30 rounded-3xl p-8 border border-cyan-400/20 shadow-2xl">
              <Outlet />
            </div>

            <div className="w-full lg:w-96 bg-gradient-to-b from-gray-800/60 to-gray-900/80  px-8 py-12 rounded-3xl space-y-8 border border-cyan-400/20 shadow-2xl">
              <div className="text-center">
                <p className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-indigo-400 bg-clip-text text-transparent">
                  @{data.handle}
                </p>
              </div>

              {data.image && (
                <div className="group relative overflow-hidden rounded-2xl transition-all hover:scale-[1.02]">
                  <img
                    src={data.image}
                    alt="Imagen Perfil"
                    className="mx-auto w-full max-w-[250px] border-4 border-cyan-400/20 rounded-xl transform transition-all group-hover:border-cyan-400/40"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent" />
                </div>
              )}

              <p className="text-center text-lg font-medium text-gray-300 italic">
                "{data.description}"
              </p>

              <DndContext
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
              >
                <div className="mt-12 space-y-6">
                  <SortableContext
                    items={enabledLinks}
                    strategy={verticalListSortingStrategy}
                  >
                    {enabledLinks.map((link) => (
                      <DevTreeLink key={link.name} link={link} />
                    ))}
                  </SortableContext>
                </div>
              </DndContext>
            </div>
          </div>
        </main>
      </div>

      <Toaster position="top-right" />
    </>
  )
}
