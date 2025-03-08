import { Link, Outlet } from "react-router"
import { useEffect, useState } from "react"
import { Toaster } from "sonner"
import { useQueryClient } from "@tanstack/react-query"
import { DndContext, DragEndEvent, closestCenter } from "@dnd-kit/core"
import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable"
import NavigationTabs from "../components/NavigationTabs"
import Header from "./Header"
import { SocialNetwork, User } from "../types"
import DevTreeLink from "./DevTreeLink"

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
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden">
        <Header />
        <NavigationTabs />
        <main className="mx-auto max-w-7xl px-6">
          <div className="flex justify-end mb-8">
            <Link
              className="font-bold text-right bg-gradient-to-r from-cyan-400 to-indigo-400 hover:from-cyan-300 hover:to-indigo-300 
                        bg-clip-text text-transparent text-2xl underline-offset-4 hover:underline transition-all"
              to={`/${data.handle}`}
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
