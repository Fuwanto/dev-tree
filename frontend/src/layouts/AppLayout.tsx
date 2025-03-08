import { useQuery } from "@tanstack/react-query"
import { Navigate } from "react-router"
import { getUser } from "../api/DevTreeAPI"
import DevTree from "../components/DevTree"
import { Loader } from "../components/Loader"

export default function AppLayout() {
  const { data, isLoading, isError } = useQuery({
    queryFn: getUser,
    queryKey: ["user"],
    retry: 2,
    refetchOnWindowFocus: false,
  })

  if (isLoading) return <Loader size="lg" text="Cargando Perfil..." />

  if (isError) {
    return <Navigate to={"/auth/login"} />
  }

  if (data) return <DevTree data={data} />
}
