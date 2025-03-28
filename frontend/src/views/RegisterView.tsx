import { useForm } from "react-hook-form"
import { Link, useLocation, useNavigate } from "react-router"
import { isAxiosError } from "axios"
import { techToast } from "../utils/toastStyles"
import { RegisterForm } from "../types"
import ErrorMessage from "../components/ErrorMessage"
import api from "../config/axios"

export default function RegisterView() {
  const location = useLocation()
  const navigate = useNavigate()

  const initialValues: RegisterForm = {
    name: "",
    email: "",
    handle: location?.state?.handle || "",
    password: "",
    password_confirmation: "",
  }

  const {
    register,
    watch,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ defaultValues: initialValues })

  const password = watch("password")

  const handleRegister = async (formData: RegisterForm) => {
    try {
      const { data } = await api.post("/auth/register", formData)
      techToast.success(data)
      reset()
      navigate("/auth/login")
    } catch (error) {
      if (isAxiosError(error) && error.response) {
        techToast.error(error.response.data.error)
      }
    }
  }

  return (
    <>
      <div className="text-center mb-10 animate-fade-in">
        <h1 className="text-6xl font-extrabold bg-gradient-to-r from-cyan-400 to-indigo-500 bg-clip-text text-transparent inline-block">
          Crear Cuenta
          <div className="h-[3px] mt-2 bg-gradient-to-r from-cyan-400/0 via-cyan-400 to-indigo-500/0 animate-underline" />
        </h1>
      </div>

      <form
        onSubmit={handleSubmit(handleRegister)}
        className="bg-gradient-to-br from-gray-800 to-gray-900/90 px-8 py-12 rounded-3xl space-y-12 shadow-2xl border border-cyan-400/20"
      >
        {/* Campo Nombre */}
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
            Nombre Completo
          </label>
          <input
            id="name"
            type="text"
            placeholder="Ej: Alex Smith"
            className="w-full bg-gray-700/40 border-2 border-gray-600/30 focus:border-cyan-400/50 focus:ring-2 focus:ring-cyan-400/20 rounded-xl py-4 px-6 text-gray-200 placeholder-gray-500 transition-all hover:border-cyan-400/30"
            {...register("name", { required: "El nombre es obligatorio" })}
          />
          {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
        </div>

        {/* Campo Email */}
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
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
            E-mail
          </label>
          <input
            id="email"
            type="email"
            placeholder="tu@email.com"
            className="w-full bg-gray-700/40 border-2 border-gray-600/30 focus:border-cyan-400/50 focus:ring-2 focus:ring-cyan-400/20 rounded-xl py-4 px-6 text-gray-200 placeholder-gray-500 transition-all hover:border-cyan-400/30"
            {...register("email", {
              required: "El email es obligatorio",
              pattern: { value: /\S+@\S+\.\S+/, message: "E-mail no válido" },
            })}
          />
          {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
        </div>

        {/* Campo Handle */}
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
                d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
              />
            </svg>
            Nombre de Usuario
          </label>
          <input
            id="handle"
            type="text"
            placeholder="@tu_usuario"
            className="w-full bg-gray-700/40 border-2 border-gray-600/30 focus:border-cyan-400/50 focus:ring-2 focus:ring-cyan-400/20 rounded-xl py-4 px-6 text-gray-200 placeholder-gray-500 transition-all hover:border-cyan-400/30"
            {...register("handle", { required: "El handle es obligatorio" })}
          />
          {errors.handle && (
            <ErrorMessage>{errors.handle.message}</ErrorMessage>
          )}
        </div>

        {/* Campos de Contraseña */}
        <div className="grid gap-8 md:grid-cols-2">
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
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
              Contraseña
            </label>
            <input
              id="password"
              type="password"
              placeholder="••••••••"
              className="w-full bg-gray-700/40 border-2 border-gray-600/30 focus:border-cyan-400/50 focus:ring-2 focus:ring-cyan-400/20 rounded-xl py-4 px-6 text-gray-200 placeholder-gray-500 transition-all hover:border-cyan-400/30"
              {...register("password", {
                required: "El password es obligatorio",
                minLength: { value: 8, message: "Mínimo 8 caracteres" },
              })}
            />
            {errors.password && (
              <ErrorMessage>{errors.password.message}</ErrorMessage>
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
                  d="M5 13l4 4L19 7"
                />
              </svg>
              Confirmar Contraseña
            </label>
            <input
              id="password_confirmation"
              type="password"
              placeholder="••••••••"
              className="w-full bg-gray-700/40 border-2 border-gray-600/30 focus:border-cyan-400/50 focus:ring-2 focus:ring-cyan-400/20 rounded-xl py-4 px-6 text-gray-200 placeholder-gray-500 transition-all hover:border-cyan-400/30"
              {...register("password_confirmation", {
                required: "Confirma tu contraseña",
                validate: (value) =>
                  value === password || "Las contraseñas no coinciden",
              })}
            />
            {errors.password_confirmation && (
              <ErrorMessage>
                {errors.password_confirmation.message}
              </ErrorMessage>
            )}
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-indigo-600 to-cyan-500 hover:from-indigo-500 hover:to-cyan-400 
                     text-white font-bold py-5 px-8 rounded-xl uppercase tracking-wider 
                     transition-all duration-200 hover:shadow-lg hover:shadow-cyan-400/30
                     hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-3 group cursor-pointer"
        >
          <svg
            className="w-6 h-6 group-hover:rotate-180 transition-transform"
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
          Crear Cuenta
        </button>
      </form>

      <nav className="mt-12">
        <Link
          className="text-center text-lg block bg-gradient-to-r from-cyan-400 to-indigo-400 hover:from-cyan-300 hover:to-indigo-300 
                    bg-clip-text text-transparent font-medium underline-offset-4 hover:underline 
                    transition-all animate-pulse-hover"
          to="/auth/login"
        >
          ¿Ya tienes cuenta? ¡Inicia sesión aquí!
        </Link>
      </nav>
    </>
  )
}
