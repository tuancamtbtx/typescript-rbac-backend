import { Router } from 'express'
import RoleController from '@src/apps/controllers/role.controller'
import RoleDIContainer from '@src/apps/container/role.container'

class RoleRouter {
  router = Router()
  controller: RoleController
  constructor() {
    this.controller = new RoleController(
      RoleDIContainer.get('CreateRoleUseCase'),
      RoleDIContainer.get('GetListRoleUseCase'),
      RoleDIContainer.get('UpdateRoleUseCase')
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
    this.router.put('/:id', async (req, res) => {
      this.controller.update(req, res)
    })
  }
}

export default new RoleRouter().router
