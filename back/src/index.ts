import express from "express";
import cors from "cors";
import logger from "morgan";
import { accountRouter } from "./routes/accounts";
import { agreementRouter } from "./routes/agreement";

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));

app.use("/accounts", accountRouter);
app.use("/agreements", agreementRouter);

app.listen(3001, () => {
  console.log("Server running");
});
