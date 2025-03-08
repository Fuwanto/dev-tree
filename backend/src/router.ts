import { Router } from "express"
import { body } from "express-validator"
import {
  createUser,
  getUser,
  getUserByHandle,
  login,
  searchByHandle,
  updateProfile,
  uploadImage,
} from "./handlers"
import { handleInputsErrors } from "./middleware/validation"
import { authenticate } from "./middleware/auth"

const router = Router()

/**Auth and Register */

router.post(
  "/auth/register",
  body("handle").notEmpty().withMessage("El handle no puede ir vacío"),
  body("name").notEmpty().withMessage("El nombre no puede ir vacío"),
  body("email").isEmail().withMessage("El email no es valido"),
  body("password")
    .isLength({ min: 8 })
    .withMessage("El password debe tener mínimo 8 caracteres"),
  handleInputsErrors,
  createUser
)

router.post(
  "/auth/login",
  body("email").isEmail().withMessage("El email no es valido"),
  body("password").notEmpty().withMessage("El password es obligatorio"),
  handleInputsErrors,
  login
)

router.get("/user", authenticate, getUser)

router.patch(
  "/user",
  body("handle").notEmpty().withMessage("El handle no puede ir vacío"),
  body("description")
    .notEmpty()
    .withMessage("La descripción no puede ir vacía"),
  authenticate,
  updateProfile
)

router.post("/user/image", authenticate, uploadImage)

router.get("/:handle", getUserByHandle)

router.post(
  "/search",
  body("handle").notEmpty().withMessage("El handle no puede ir vacío"),
  handleInputsErrors,
  searchByHandle
)

export default router
