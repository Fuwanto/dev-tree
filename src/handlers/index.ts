import type { Request, Response } from "express"
import { validationResult } from "express-validator"
import slugify from "slugify"
import { hashPassword } from "../utils/auth"
import User from "../models/User"

export const createUser = async (req: Request, res: Response) => {
  // manejo de errores (de momento en este archivo)
  let errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

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
