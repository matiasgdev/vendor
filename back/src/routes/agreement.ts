import express from 'express'
import {Op} from 'sequelize'
import {CustomRequest} from '../custom-request'

import {Agreement} from '../models/Agreement'
const router = express.Router()

router.get('/', async function (req: CustomRequest, res, next) {
  const {id} = req
  const agreements = await Agreement.findAll({
    where: {
      [Op.or]: [
        {status: 'new'},
        {status: 'in_progress'},
        {BuyerId: id},
        {SupplierId: id}
      ]
    }
  })
  return res.json(agreements)
})

router.get('/:id', async (req: CustomRequest, res, next) => {
  const callerId = req.id
  const {id} = req.params

  if (callerId !== Number(id)) {
    next(new Error('Invalid authorization request'))
    return
  }

  const agreements = await Agreement.findAll({
    where: {
      [Op.or]: [{BuyerId: id}, {SupplierId: id}]
    }
  })

  return res.json(agreements)
})

export {router as agreementRouter}
