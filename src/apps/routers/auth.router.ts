import { Router } from 'express'
import AuthController from '@src/apps/controllers/auth.controller'
import AuthDIController from '@src/apps/container/auth.container'

class AuthRouter {
  router = Router()
  controller = new AuthController(AuthDIController.get('LoginUsecase'))
  constructor() {
    this.intializeRoutes()
  }
  public intializeRoutes() {
    this.router.post('/login', (req, res) => {
      this.controller.login(req, res)
    })
  }
}

export default new AuthRouter().router
