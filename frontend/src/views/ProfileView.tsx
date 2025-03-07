import { useQueryClient, useMutation } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import ErrorMessage from "../components/ErrorMessage"
import { ProfileForm, User } from "../types"
import { updateProfile, uploadImage } from "../api/DevTreeAPI"
import { techToast } from "../utils/toastStyles"

export default function ProfileView() {
  const queryClient = useQueryClient()
  const data: User = queryClient.getQueryData(["user"])!

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileForm>({
    defaultValues: {
      handle: data.handle,
      description: data.description,
    },
  })

  const updateProfileMutation = useMutation({
    mutationFn: updateProfile,
    onError: (error) => {
      techToast.error(error.message)
    },
    onSuccess: (data) => {
      techToast.success(data!)
      queryClient.invalidateQueries({ queryKey: ["user"] })
    },
  })

  const updateImageMutation = useMutation({
    mutationFn: uploadImage,
    onError: (error) => {
      techToast.error(error.message)
    },
    onSuccess: (data) => {
      queryClient.setQueryData(["user"], (prevData: User) => {
        return { ...prevData, image: data.image }
      })
    },
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      updateImageMutation.mutate(e.target.files[0])
    }
  }

  const handleUserProfileForm = (formData: ProfileForm) => {
    const user: User = queryClient.getQueryData(["user"])!
    user.description = formData.description
    user.handle = formData.handle
    updateProfileMutation.mutate(user)
  }

  return (
    <form
      className="bg-gradient-to-br from-gray-900 to-gray-800/90 border border-cyan-400/20 p-8 rounded-3xl space-y-8 shadow-2xl"
      onSubmit={handleSubmit(handleUserProfileForm)}
    >
      <legend className="text-4xl font-bold text-center bg-gradient-to-r from-cyan-400 to-indigo-400 bg-clip-text text-transparent pb-2">
        Editar Perfil
        <div className="h-[2px] mt-2 bg-gradient-to-r from-cyan-400/0 via-cyan-400 to-indigo-400/0 animate-underline" />
      </legend>

      <div className="space-y-6 group">
        <label className="flex items-center gap-2 text-lg text-gray-400 group-focus-within:text-cyan-400 transition-colors">
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
            />
          </svg>
          Handle
        </label>
        <input
          type="text"
          className="w-full bg-gray-700/40 border-2 border-gray-600/30 focus:border-cyan-400/50 focus:ring-2 focus:ring-cyan-400/20 rounded-xl py-3 px-6 text-gray-200 placeholder-gray-500 transition-all hover:border-cyan-400/30"
          placeholder="@nombredeusuario"
          {...register("handle", {
            required: "El nombre de usuario es obligatorio",
          })}
        />
        {errors.handle && <ErrorMessage>{errors.handle.message}</ErrorMessage>}
      </div>

      <div className="space-y-6 group">
        <label className="flex items-center gap-2 text-lg text-gray-400 group-focus-within:text-cyan-400 transition-colors">
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          Descripción
        </label>
        <textarea
          className="w-full bg-gray-700/40 border-2 border-gray-600/30 focus:border-cyan-400/50 focus:ring-2 focus:ring-cyan-400/20 rounded-xl py-3 px-6 text-gray-200 placeholder-gray-500 transition-all hover:border-cyan-400/30 min-h-[120px]"
          placeholder="Cuéntanos sobre ti..."
          {...register("description", {
            required: "La descripción es obligatoria",
          })}
        />
        {errors.description && (
          <ErrorMessage>{errors.description.message}</ErrorMessage>
        )}
      </div>

      <div className="space-y-6 group">
        <label className="flex items-center gap-2 text-lg text-gray-400 group-focus-within:text-cyan-400 transition-colors">
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          Imagen de Perfil
        </label>
        <div className="flex items-center justify-center w-full">
          <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-600/30 hover:border-cyan-400/40 rounded-xl cursor-pointer transition-all hover:bg-gray-700/20 group/upload">
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <svg
                className="w-8 h-8 mb-2 text-gray-500 group-hover/upload:text-cyan-400 transition-colors"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                />
              </svg>
              <p className="text-sm text-gray-500 group-hover/upload:text-cyan-300 transition-colors">
                Arrastra o haz click para subir
              </p>
            </div>
            <input
              id="image"
              type="file"
              name="handle"
              className="hidden"
              accept="image/*"
              onChange={handleChange}
            />
          </label>
        </div>
      </div>

      <button
        type="submit"
        className="w-full bg-gradient-to-r from-indigo-600 to-cyan-500 hover:from-indigo-500 hover:to-cyan-400 
                   text-white font-bold py-4 px-8 rounded-xl uppercase tracking-wider 
                   transition-all duration-200 hover:shadow-lg hover:shadow-cyan-400/30
                   hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-3 group"
      >
        <svg
          className="w-6 h-6 group-hover:rotate-12 transition-transform"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
          />
        </svg>
        Guardar Cambios
      </button>
    </form>
  )
}
