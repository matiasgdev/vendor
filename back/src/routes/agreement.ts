import express from "express";
import { Agreement } from "../models/aggreement";
const router = express.Router();

router.get("/", async function (req, res, next) {
  const agreements = await Agreement.findAll();
  return res.json(agreements);
});

export { router as agreementRouter };
