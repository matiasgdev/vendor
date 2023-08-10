import express from 'express'
import {Account} from '../models/Account'
import {auth} from '../utils/token'
const router = express.Router()

router.post('/', async function (req, res, next) {
  const {id} = req.body
  const user = await Account.findByPk(id)

  if (!user) {
    next(new Error(`User with id ${id} not exists`))
  }

  const token = auth.sign({id: user.dataValues.id})

  return res.json({token})
})

export {router as loginRouter}
