export type User = {
  name: string
  email: string
  handle: string
}

export type RegisterForm = Pick<User, "email" | "handle" | "name"> & {
  password: string
  password_confirmation: string
}
