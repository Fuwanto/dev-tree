import { Link } from "react-router"

export default function RegisterView() {
  return (
    <>
      <h1>Registro</h1>
      <nav>
        <Link to="/auth/login">¿Ya tienes cuenta? Inicia sesión aquí</Link>
      </nav>
    </>
  )
}
