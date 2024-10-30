import { Router } from 'express'
import PermissionController from '@src/apps/controllers/permission.controller'
import RoleDIContainer from '@src/apps/container/permission.container'

class RoleRouter {
  router = Router()
  controller: PermissionController
  constructor() {
    this.controller = new PermissionController(
      RoleDIContainer.get('CreatePermissionUseCase'),
      RoleDIContainer.get('GetListPermissionUsecase')
    )
    this.intializeRoutes()
  }
  public intializeRoutes() {
    this.router.get('/', (req, res) => {
      this.controller.list(req, res)
    })
    this.router.post('/', (req, res) => {
      this.controller.create(req, res)
    })
    this.router.put('/:id', async (req, res) => {})
  }
}

export default new RoleRouter().router
