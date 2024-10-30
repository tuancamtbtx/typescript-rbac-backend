import { Router } from 'express'
class HealthRouter {
  router = Router()
  constructor() {
    this.intializeRoutes()
  }
  public intializeRoutes() {
    this.router.get('/', (req, res) => {
      return res.status(200).json({ message: 'service is running' })
    })
  }
}

export default new HealthRouter().router
