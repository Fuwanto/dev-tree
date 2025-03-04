import jwt, { JwtPayload } from "jsonwebtoken"

export const generateJWT = (payload: JwtPayload) => {
  const token = jwt.sign(payload, process.env.JWT_SECRECT, {
    expiresIn: "180d",
  })
  return token
}
