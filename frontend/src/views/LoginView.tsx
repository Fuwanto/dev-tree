import { Link } from "react-router"
import { useForm } from "react-hook-form"
import { isAxiosError } from "axios"
import { techToast } from "../utils/toastStyles"
import type { LoginForm } from "../types"
import api from "../config/axios"
import ErrorMessage from "../components/ErrorMessage"

export default function LoginView() {
  const initialValues: LoginForm = {
    email: "",
    password: "",
  }

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ defaultValues: initialValues })

  const handleLogin = async (formData: LoginForm) => {
    try {
      const { data } = await api.post("/auth/login", formData)
      // Para este proyecto, por simplicidad, lo estoy almacenando en Local Storage en lugar de Cookies
      localStorage.setItem("AUTH_TOKEN", data)
      techToast.success("Inicio de sesión exitoso")
      reset()
    } catch (error) {
      if (isAxiosError(error) && error.response) {
        techToast.error(error.response.data.error)
      }
    }
  }

  return (
    <>
      <div className="text-center mb-10">
        <h1 className="text-6xl font-extrabold bg-gradient-to-r from-cyan-400 to-indigo-500 bg-clip-text text-transparent inline-block">
          Iniciar Sesión
          <div className="h-[3px] mt-2 bg-gradient-to-r from-cyan-400/0 via-cyan-400 to-indigo-500/0" />
        </h1>
      </div>

      <form
        onSubmit={handleSubmit(handleLogin)}
        className="bg-gradient-to-br from-gray-800 to-gray-900/80 px-8 py-12 rounded-3xl space-y-12 shadow-2xl border border-cyan-400/20"
        noValidate
      >
        <div className="space-y-6 group">
          <label
            htmlFor="email"
            className="text-lg font-medium text-gray-400 transition-all group-focus-within:text-cyan-400"
          >
            <div className="flex items-center gap-2 mb-2">
              <svg
                className="w-5 h-5 text-cyan-400/80"
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
            </div>
          </label>
          <input
            id="email"
            type="email"
            placeholder="tu@email.com"
            className="w-full bg-gray-700/40 border-2 border-gray-600/30 focus:border-cyan-400/50 focus:ring-2 focus:ring-cyan-400/20 rounded-xl py-4 px-6 text-gray-200 placeholder-gray-500 transition-all hover:border-cyan-400/30"
            {...register("email", {
              required: "El Email es obligatorio",
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "E-mail no válido",
              },
            })}
          />
          {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
        </div>

        <div className="space-y-6 group">
          <label
            htmlFor="password"
            className="text-lg font-medium text-gray-400 transition-all group-focus-within:text-cyan-400"
          >
            <div className="flex items-center gap-2 mb-2">
              <svg
                className="w-5 h-5 text-cyan-400/80"
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
            </div>
          </label>
          <input
            id="password"
            type="password"
            placeholder="••••••••"
            className="w-full bg-gray-700/40 border-2 border-gray-600/30 focus:border-cyan-400/50 focus:ring-2 focus:ring-cyan-400/20 rounded-xl py-4 px-6 text-gray-200 placeholder-gray-500 transition-all hover:border-cyan-400/30"
            {...register("password", {
              required: "La contraseña es obligatoria",
            })}
          />
          {errors.password && (
            <ErrorMessage>{errors.password.message}</ErrorMessage>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-indigo-600 to-cyan-500 hover:from-indigo-500 hover:to-cyan-400 
                 text-white font-bold py-5 px-8 rounded-xl uppercase tracking-wider 
                 transition-all duration-200 hover:shadow-lg hover:shadow-cyan-400/30
                 hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-3 group"
        >
          <span className="group-hover:translate-x-1 transition-transform">
            🚀
          </span>
          Acceder
          <span className="group-hover:translate-x-1 transition-transform">
            →
          </span>
        </button>
      </form>

      <nav className="mt-12">
        <Link
          className="text-center text-lg block bg-gradient-to-r from-cyan-400 to-indigo-400 hover:from-cyan-300 hover:to-indigo-300 
                bg-clip-text text-transparent font-medium underline-offset-4 hover:underline 
                transition-all animate-pulse-hover"
          to="/auth/register"
        >
          ¿No tienes cuenta? ¡Regístrate ahora!
        </Link>
      </nav>
    </>
  )
}
