import express from 'express'
import cors from 'cors'
import logger from 'morgan'
import dotenv from 'dotenv'

import {loginRouter} from './routes/login'
import {accountRouter} from './routes/accounts'
import {agreementRouter} from './routes/agreement'
import {submissionRouter} from './routes/submissions'

import {authMiddleware} from './middlewares/auth-middleware'
import {errorHandler} from './middlewares/error-handler'

const app = express()
dotenv.config()

app.use(logger('dev'))
app.use(express.json())
app.use(cors())

app.use('/login', loginRouter)

app.use(authMiddleware)

app.use('/', accountRouter)
app.use('/agreements', agreementRouter)
app.use('/submissions', submissionRouter)

app.use(errorHandler)

app.listen(3001, () => {
  console.log('Server running')
})
