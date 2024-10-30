import { Router } from 'express'
import UserController from '@src/apps/controllers/user.controller'
import UserDIContainer from '@src/apps/container/user.container'

class UserRouter {
  router = Router()
  controller: UserController
  constructor() {
    this.controller = new UserController(
      UserDIContainer.get('CreateUserUseCase'),
      UserDIContainer.get('GetUserUseCase'),
      UserDIContainer.get('GetMeUseCase'),
      UserDIContainer.get('DeleteUserUseCase'),
      UserDIContainer.get('UpdateUserUseCase')
    )
    this.intializeRoutes()
  }
  public intializeRoutes() {
    this.router.get('/', (req, res) => {
      this.controller.list(req, res)
    })
    this.router.get('/me', async (req, res) => {
      this.controller.me(req, res)
    })
    this.router.post('/', (req, res) => {
      this.controller.create(req, res)
    })
    this.router.put('/:id', async (req, res) => {
      this.controller.update(req, res)
    })
    this.router.delete('/:id', async (req, res) => {
      this.controller.delete(req, res)
    })
  }
}

export default new UserRouter().router
