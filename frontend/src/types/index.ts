export type User = {
  _id: string
  name: string
  email: string
  handle: string
  description: string
  image: string
  links: string
}

export type RegisterForm = Pick<User, "email" | "handle" | "name"> & {
  password: string
  password_confirmation: string
}

export type LoginForm = Pick<User, "email"> & {
  password: string
}

export type ProfileForm = Pick<User, "handle" | "description">

export type SocialNetwork = {
  id: number
  name: string
  url: string
  enabled: boolean
}

export type DevTreeLink = Pick<SocialNetwork, "name" | "url" | "enabled">

export type UserHandle = Pick<
  User,
  "description" | "handle" | "image" | "links" | "name"
>
