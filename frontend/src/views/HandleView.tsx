import { Navigate, useParams } from "react-router"
import { useQuery } from "@tanstack/react-query"
import { getUserByHandle } from "../api/DevTreeAPI"
import { Loader } from "../components/Loader"
import HandleData from "../components/HandleData"

export default function HandleView() {
  const params = useParams()
  const handle = params.handle!

  const { data, error, isLoading } = useQuery({
    queryFn: () => getUserByHandle(handle),
    queryKey: ["handle", handle],
    retry: 1,
  })

  if (isLoading) return <Loader size="lg" text="Buscando Usuario..." />
  if (error) return <Navigate to={"/404"} />

  if (data) return <HandleData data={data} />
}
