import type { Request, Response } from "express"
import slugify from "slugify"
import formidable from "formidable"
import { v4 as uuid } from "uuid"
import { checkPassword, hashPassword } from "../utils/auth"
import User from "../models/User"
import { generateJWT } from "../utils/jwt"
import cloudinary from "../config/cloudinary"

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

export const getUser = async (req: Request, res: Response) => {
  return res.status(200).json(req.user)
}

export const updateProfile = async (req: Request, res: Response) => {
  try {
    const { description } = req.body

    const handle = slugify(req.body.handle, "")
    const handleExists = await User.findOne({ handle })
    if (handleExists && handleExists.email !== req.user.email) {
      const error = new Error("Nombre de usuario no disponible")
      return res.status(409).json({ error: error.message })
    }

    // Actualizar el usuario
    req.user.description = description
    req.user.handle = handle
    await req.user.save()
    return res.send("Perfil actualizado correctamente")
  } catch (e) {
    const error = new Error("Hubo un error")
    return res.status(500).json({ error: error.message })
  }
}

export const uploadImage = async (req: Request, res: Response) => {
  const form = formidable({ multiples: false })
  try {
    form.parse(req, (error, fields, files) => {
      cloudinary.uploader.upload(
        files.file[0].filepath,
        { public_id: uuid() },
        async function (error, result) {
          if (error) {
            const error = new Error("Hubo un error al subir la imagen")
            return res.status(500).json({ error: error.message })
          }
          if (result) {
            req.user.image = result.secure_url
            await req.user.save()
            return res.json({ image: result.secure_url })
          }
        }
      )
    })
  } catch (e) {
    const error = new Error("Hubo un error")
    return res.status(500).json({ error: error.message })
  }
}
