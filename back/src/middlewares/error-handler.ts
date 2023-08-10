import {NextFunction, Response} from 'express'
import {CustomRequest} from '../custom-request'

export const errorHandler = (
  err: Error,
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  return res.status(400).json(err.message)
}
