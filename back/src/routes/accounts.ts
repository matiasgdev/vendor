import express from 'express'
import {literal} from 'sequelize'
import {Account} from '../models/Account'

const router = express.Router()

router.get('/balances/deposit/:accountId', async (req, res) => {
  const {accountId} = req.params

  const balance = await Account.findOne({
    attributes: ['balance'],
    where: {
      id: accountId
    }
  })

  return res.json({...balance.dataValues, accountId})
})

router.post('/balances/deposit/:accountId', async (req, res) => {
  const {accountId} = req.params
  const {money} = req.body

  const account = await Account.findByPk(accountId)
  if (!account) {
    throw new Error(`Account with id ${accountId} was not founded`)
  }
  const currentBalance = account.dataValues.balance

  const updated = await account.update({
    balance: currentBalance + Number(money)
  })

  return res.json(updated)
})

router.get('/admin/best-supplier-profession', async (req, res, next) => {
  const {start, end} = req.query

  const buyers = await Account.findOne({
    attributes: [
      'profession',
      [
        literal(
          `(SELECT SUM("Submissions"."price") FROM "Submissions" 
          INNER JOIN "Agreements" ON "Agreements"."id" = "Submissions"."AgreementId"
          WHERE "Agreements"."BuyerId" = "Account"."id"
          AND "Submissions"."paid" = true
          AND "Submissions"."paymentDate" BETWEEN '${start}' AND '${end}')`
        ),
        'totalEarned'
      ]
    ],
    where: {
      type: 'buyer'
    },
    order: [[literal('totalEarned'), 'DESC']]
  })

  return res.json(buyers)
})

router.get('/admin/best-buyers', async function (req, res, next) {
  const {start, end} = req.query
  const limit = req.query.limit || 3

  const result = await Account.findAll({
    attributes: [
      'id',
      'firstName',
      'lastName',
      [
        literal(
          `(SELECT SUM("Submissions"."price") FROM "Submissions" 
        INNER JOIN "Agreements" ON "Agreements"."id" = "Submissions"."AgreementId"
        WHERE "Agreements"."BuyerId" = "Account"."id"
        AND "Submissions"."paid" = true
        AND "Submissions"."paymentDate" BETWEEN '${start}' AND '${end}')`
        ),
        'totalPaid'
      ]
    ],
    where: {
      type: 'buyer'
    },
    order: [[literal('totalPaid'), 'DESC']],
    limit: Number(limit)
  })

  return res.json(result)
})

export {router as accountRouter}
