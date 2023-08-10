import express from 'express'
import {Submission} from '../models/Submission'
const router = express.Router()

// Get all unpaid submissions for a user (either a buyer or supplier) but only for active agreements.
router.get('/unpaid', async function (req, res, next) {
  const submissions = await Submission.findAll()
  return res.json(submissions)
})

// Implement this API to allow buyers to pay for a submission. A buyer can only pay if their balance is greater than or equal to the amount to pay. The amount should be moved from the buyer's balance to the supplier's balance.
router.get('/:submission_id/pay', async function (req, res, next) {
  const submissions = await Submission.findAll()
  return res.json(submissions)
})

export {router as submissionRouter}
