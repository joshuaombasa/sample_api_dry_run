const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')

const config = require('./utils/config')
const logger = require('./utils/logger')
const middleware = require('./utils/middleware')

const usersRouter = require('./controllers/users')

const app = express()

const PORT = 4000


mongoose.set('strictQuery', false)

mongoose.connect(config.MONGO_URI)
        .then(() => logger.info(`connected to mongodb`))
        .catch(error => logger.error(error.message))

app.use(express.json())


const items = []


app.use(middleware.requestLogger)


app.use('/api/users', usersRouter)

app.use(middleware.unknownEndpointHandler)
app.use(middleware.errorHandler)

app.listen(PORT, () => {
  logger.info(`Server running on http://localhost:${PORT}`)
})