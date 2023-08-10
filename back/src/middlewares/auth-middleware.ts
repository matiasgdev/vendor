import {NextFunction, Response} from 'express'
import {CustomRequest} from '../custom-request'
import {getToken} from '../utils/retrieveToken'
import {auth} from '../utils/token'

export const authMiddleware = (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  const token = getToken(req.headers)

  try {
    const {id} = auth.verify(token)
    req.id = id
    next()
  } catch (err) {
    next(err)
  }
}
