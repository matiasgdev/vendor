import express from 'express'
import cors from 'cors'
import logger from 'morgan'
import {accountRouter} from './routes/accounts'
import {agreementRouter} from './routes/agreement'
import {submissionRouter} from './routes/submissions'

const app = express()

app.use(logger('dev'))
app.use(express.json())
app.use(cors())

app.use('/', accountRouter)
app.use('/agreements', agreementRouter)
app.use('/submissions', submissionRouter)

app.listen(3001, () => {
  console.log('Server running')
})
