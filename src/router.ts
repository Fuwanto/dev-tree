import { Router } from "express"
import { body } from "express-validator"
import { createUser } from "./handlers"

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
  createUser
)

export default router
