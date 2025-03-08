import { useForm } from "react-hook-form"
import { Link } from "react-router"
import { useMutation } from "@tanstack/react-query"
import slugify from "react-slugify"
import ErrorMessage from "./ErrorMessage"
import { searchByHandle } from "../api/DevTreeAPI"

export default function SearchForm() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      handle: "",
    },
  })

  const mutation = useMutation({
    mutationFn: searchByHandle,
  })

  const handle = watch("handle")

  const handleSearch = () => {
    const slug = slugify(handle)
    mutation.mutate(slug)
  }

  return (
    <form onSubmit={handleSubmit(handleSearch)} className="space-y-6">
      <div className="relative flex items-center bg-gray-700/40 border-2 border-cyan-400/20 rounded-xl px-4 py-3 transition-all hover:border-cyan-400/40">
        <label htmlFor="handle" className="text-gray-400 font-mono">
          devtree.com/
        </label>
        <input
          type="text"
          id="handle"
          className="flex-1 bg-transparent border-none text-gray-200 placeholder-gray-500 focus:ring-0 focus:border-none font-medium ml-2"
          placeholder="elonmusk, zuck, jeffbezos"
          {...register("handle", {
            required: "Un Nombre de Usuario es obligatorio",
          })}
        />
      </div>

      {errors.handle && (
        <ErrorMessage>
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
          {errors.handle.message}
        </ErrorMessage>
      )}

      <div className="mt-8">
        {mutation.isPending && (
          <p className="flex items-center gap-2 text-cyan-400 animate-pulse">
            <svg
              className="w-5 h-5 animate-pulse"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
            Verificando disponibilidad...
          </p>
        )}
        {mutation.error && (
          <ErrorMessage>{mutation.error.message}</ErrorMessage>
        )}
        {mutation.data && (
          <p className="text-cyan-400/90">
            {mutation.data} ir a{" "}
            <Link
              to={"/auth/register"}
              state={{ handle: slugify(handle) }}
              className="bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent hover:underline"
            >
              Crear cuenta
              <span className="ml-2">→</span>
            </Link>
          </p>
        )}
      </div>

      <button
        type="submit"
        className="w-full bg-gradient-to-r from-indigo-600 to-cyan-500 hover:from-indigo-500 hover:to-cyan-400 
                  text-white font-bold py-4 px-8 rounded-xl uppercase tracking-wider 
                  transition-all duration-200 hover:shadow-lg hover:shadow-cyan-400/30
                  hover:scale-[1.02] active:scale-95"
      >
        Obtener mi DevTree
      </button>
    </form>
  )
}
