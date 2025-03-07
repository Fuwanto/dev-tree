import { useEffect, useState } from "react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { techToast } from "../utils/toastStyles"
import { social } from "../data/social"
import DevTreeInput from "../components/DevTreeInput"
import { isValidUrl } from "../utils"
import { updateProfile } from "../api/DevTreeAPI"
import { SocialNetwork, User } from "../types"

export default function LinkTreeView() {
  const [devTreeLinks, setDevTreeLinks] = useState(social)

  const queryClient = useQueryClient()
  const user: User = queryClient.getQueryData(["user"])!

  const { mutate } = useMutation({
    mutationFn: updateProfile,
    onError: (error) => {
      techToast.error(error.message)
    },
    onSuccess: () => {
      techToast.success("Actualizado correctamente")
    },
  })

  useEffect(() => {
    const updatedData = devTreeLinks.map((item) => {
      const userLink = JSON.parse(user.links).find(
        (link: SocialNetwork) => link.name === item.name
      )
      if (userLink) {
        return { ...item, url: userLink.url, enabled: userLink.enabled }
      }
      return item
    })
    setDevTreeLinks(updatedData)
  }, [])

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const updateLinks = devTreeLinks.map((link) =>
      link.name === e.target.name ? { ...link, url: e.target.value } : link
    )
    setDevTreeLinks(updateLinks)
  }

  const links: SocialNetwork[] = JSON.parse(user.links)

  const handleEnabledLink = (socialNetWork: string) => {
    const updateLinks = devTreeLinks.map((link) => {
      if (link.name === socialNetWork) {
        if (isValidUrl(link.url)) {
          return { ...link, enabled: !link.enabled }
        } else {
          techToast.error("URL no válida")
          return link
        }
      } else {
        return link
      }
    })
    setDevTreeLinks(updateLinks)

    let updatedItems: SocialNetwork[] = []

    const selectedSocialNetwork = updateLinks.find(
      (link) => link.name === socialNetWork
    )
    if (selectedSocialNetwork?.enabled) {
      const id = links.filter((link) => link.id).length + 1
      if (links.some((link) => link.name === socialNetWork)) {
        updatedItems = links.map((link) => {
          if (link.name === socialNetWork) {
            return {
              ...link,
              enabled: true,
              id,
            }
          } else {
            return link
          }
        })
      } else {
        const newItem = {
          ...selectedSocialNetwork,
          id,
        }
        updatedItems = [...links, newItem]
      }
    } else {
      const indexToUpdate = links.findIndex(
        (link) => link.name === socialNetWork
      )
      updatedItems = links.map((link) => {
        if (link.name === socialNetWork) {
          return {
            ...link,
            id: 0,
            enabled: false,
          }
        } else if (
          indexToUpdate !== 0 &&
          link.id === 1 &&
          link.id > indexToUpdate
        ) {
          return {
            ...link,
            id: link.id - 1,
          }
        } else {
          return link
        }
      })
    }

    // almacenar en la bd
    queryClient.setQueryData(["user"], (prevData: User) => {
      return {
        ...prevData,
        links: JSON.stringify(updatedItems),
      }
    })
  }

  return (
    <>
      <div className="space-y-6 bg-white/10 rounded-xl p-8 shadow-xl">
        {devTreeLinks.map((item) => (
          <DevTreeInput
            key={item.name}
            item={item}
            handleUrlChange={handleUrlChange}
            handleEnabledLink={handleEnabledLink}
          />
        ))}
        <button
          className="w-full bg-gradient-to-r from-indigo-600 to-cyan-500 hover:from-indigo-500 hover:to-cyan-400 
                 text-white font-bold py-4 px-6 rounded-xl uppercase tracking-wide 
                 transition-all duration-200 hover:shadow-lg hover:shadow-cyan-200/40
                 hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-2"
          onClick={() => mutate(queryClient.getQueryData(["user"])!)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 group-hover:translate-x-1 transition-transform"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"
            />
          </svg>
          GUARDAR CAMBIOS
        </button>
      </div>
    </>
  )
}
