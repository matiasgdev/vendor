import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'
dotenv.config()

export const auth = {
  verify(token: string) {
    return jwt.verify(token, process.env.JWT_SECRET) as {id: number}
  },
  sign(payload: object) {
    return jwt.sign(payload, process.env.JWT_SECRET)
  }
}
