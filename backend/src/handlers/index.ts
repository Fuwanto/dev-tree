import type { Request, Response } from "express"
import { validationResult } from "express-validator"
import slugify from "slugify"
import { checkPassword, hashPassword } from "../utils/auth"
import User from "../models/User"
import { generateJWT } from "../utils/jwt"

export const createUser = async (req: Request, res: Response) => {
  const { email, password } = req.body

  const userExists = await User.findOne({ email })
  if (userExists) {
    const error = new Error("Ese email ya esta registrado")
    return res.status(409).json({ error: error.message })
  }

  const handle = slugify(req.body.handle, "")
  const handleExists = await User.findOne({ handle })
  if (handleExists) {
    const error = new Error("Nombre de usuario no disponible")
    return res.status(409).json({ error: error.message })
  }

  const user = new User(req.body)
  user.password = await hashPassword(password)
  user.handle = handle

  await user.save()

  return res.status(201).send("Usuario registrado correctamente")
}

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body

  // chequear si el usuario existe
  const user = await User.findOne({ email })
  if (!user) {
    const error = new Error("El email ingresado no esta registrado")
    return res.status(404).json({ error: error.message })
  }

  // comprobar password
  const isPasswordCorrect = await checkPassword(password, user.password)
  if (!isPasswordCorrect) {
    const error = new Error("Password incorrecto")
    return res.status(401).json({ error: error.message })
  }

  const token = generateJWT({ id: user._id })

  return res.send(token)
}
