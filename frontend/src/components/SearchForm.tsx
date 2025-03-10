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
    <form
      onSubmit={handleSubmit(handleSearch)}
      className="space-y-4 md:space-y-6 w-full"
    >
      {/* Input Container */}
      <div className="relative flex flex-col md:flex-row items-center bg-gray-700/40 border-2 border-cyan-400/20 rounded-lg md:rounded-xl px-4 py-3 transition-all hover:border-cyan-400/40">
        <label
          htmlFor="handle"
          className="text-sm md:text-base text-gray-400 font-mono mb-1 md:mb-0"
        >
          devtree.com/
        </label>
        <input
          type="text"
          id="handle"
          className="w-full md:flex-1 text-center md:text-left bg-transparent border-none text-gray-200 placeholder-gray-500 
                     focus:ring-0 focus:border-none font-medium text-sm md:text-base md:ml-2
                     py-2 md:py-0"
          placeholder="elonmusk, zuck, jeffbezos"
          {...register("handle", {
            required: "Un Nombre de Usuario es obligatorio",
          })}
        />
      </div>

      {/* Error Message */}
      {errors.handle && <ErrorMessage>{errors.handle.message}</ErrorMessage>}

      {/* Status Messages */}
      <div className="mt-4 md:mt-6">
        {mutation.isPending && (
          <p className="flex items-center gap-2 text-sm md:text-base text-cyan-400 animate-pulse">
            <svg
              className="w-4 h-4 md:w-5 md:h-5 animate-spin"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
            Verificando disponibilidad...
          </p>
        )}
        {mutation.error && (
          <ErrorMessage>{mutation.error.message}</ErrorMessage>
        )}
        {mutation.data && (
          <p className="text-sm md:text-base text-cyan-400/90">
            {mutation.data} ir a{" "}
            <Link
              to={"/auth/register"}
              state={{ handle: slugify(handle) }}
              className="bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent hover:underline text-sm md:text-base"
            >
              Crear cuenta
              <span className="hidden md:inline-block ml-2">→</span>
            </Link>
          </p>
        )}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full bg-gradient-to-r from-indigo-600 to-cyan-500 hover:from-indigo-500 hover:to-cyan-400 
                  text-white font-semibold md:font-bold py-3 md:py-4 px-6 md:px-8 rounded-lg md:rounded-xl 
                  uppercase tracking-wider text-sm md:text-base
                  transition-all duration-200 hover:shadow-lg hover:shadow-cyan-400/30
                  hover:scale-[1.02] active:scale-95 cursor-pointer"
      >
        Obtener mi DevTree
      </button>
    </form>
  )
}
