import { useQuery } from "@tanstack/react-query"
import { Navigate } from "react-router"
import { getUser } from "../api/DevTreeAPI"
import DevTree from "../components/DevTree"
import { Loader } from "../components/Loader"

export default function AppLayout() {
  const { data, isLoading, isError } = useQuery({
    queryFn: getUser,
    queryKey: ["user"],
    retry: 1,
    refetchOnWindowFocus: false,
  })

  if (isLoading)
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center">
        <div className="text-center space-y-6">
          <Loader size="lg" className="mx-auto" />
          <p className="text-lg font-medium bg-gradient-to-r from-cyan-400 to-indigo-400 bg-clip-text text-transparent">
            Cargando tu perfil...
          </p>
        </div>
      </div>
    )

  if (isError) {
    return <Navigate to={"/auth/login"} />
  }

  if (data) return <DevTree data={data} />
}
