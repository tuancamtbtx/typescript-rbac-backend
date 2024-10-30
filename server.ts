import express, { Application } from 'express'
import sequelize from '@src/infra/sequelize'
import cors from 'cors'

import Routers from '@src/apps/routers'
import logger from '@src/utils/logger'
import { errorReleaseMiddleware, error404Forwarder } from '@src/apps/middlewares/error.middleware'
const app: Application = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))


const initialize = async () => {
  try {
    await sequelize.sync({ force: false }) // Sync the models with the database
  } catch (error) {
    throw new Error('Error initializing Sequelize')
  }
}
initialize()
  .then(() => {
    logger.info('Initialized Sequelize')
  })
  .catch((error) => {
    logger.error('Error initializing Sequelize:', error)
  })
app.use('/health', Routers.HealthRouter)
app.use('/api/v1/users', Routers.UserRouter)
app.use('/api/v1/roles', Routers.RoleRouter)
app.use('/api/v1/permisisons', Routers.PermissionRouter)
app.use('/api/v1/auth', Routers.AuthRouter)

app.use(error404Forwarder)

app.use(errorReleaseMiddleware)

const PORT = 8080
const HOST_NAME = '0.0.0.0'

app.listen(PORT, HOST_NAME, () => {
  logger.info(`Server running on host ${HOST_NAME}: port ${PORT}`)
})
