import { Link } from "react-router"

export default function LoginView() {
  return (
    <>
      <h1>Login</h1>
      <nav>
        <Link to="/auth/register">¿No tienes cuenta? Regístrate aquí</Link>
      </nav>
    </>
  )
}
