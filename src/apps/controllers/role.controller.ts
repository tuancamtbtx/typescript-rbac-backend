import { Request, Response } from 'express'
import { validate } from 'class-validator'

import logger from '@src/utils/logger'
import RoleDTO from '@src/apps/validations/role.dto'
import RoleEntity from '@src/entities/role.entity'
import CreateRoleUsecase from '@src/apps/use-cases/role/create-role'
import GetListRoleUsecase from '@src/apps/use-cases/role/get-role'
import UpdateRoleUsecase from '@src/apps/use-cases/role/update-role'
import HttpConstant from '@src/common/constant/http'

export default class RoleController {
  constructor(
    private readonly createRoleUseCase: CreateRoleUsecase,
    private readonly getListRoleUseCase: GetListRoleUsecase,
    private readonly updateRoleUseCase: UpdateRoleUsecase
  ) {}
  async list(req: Request, res: Response) {
    try {
      let data = await this.getListRoleUseCase.execute()
      res.status(HttpConstant.HTTP_SUCCESS).json({ data: { list: data }, message: 'success' })
    } catch (error) {
      res.status(HttpConstant.HTTP_BAD_IMPLEMENT).json({ message: error.message })
    }
  }
  async create(req: Request, res: Response) {
    try {
      const dto = Object.assign(new RoleDTO(), req.body)
      const errors = await validate(dto)
      if (errors.length > 0) {
        return res.status(HttpConstant.HTTP_BAD_REQUEST).json({ errors })
      }
      let role: RoleEntity = new RoleEntity({
        name: dto.name,
        description: dto.description
      })
      let data = await this.createRoleUseCase.execute(role)
      res.status(HttpConstant.HTTP_CREATED_SUCCESS).json({ data: data, message: 'Role created successfully' })
    } catch (error) {
      res.status(HttpConstant.HTTP_BAD_IMPLEMENT).json({ message: error.message })
    }
  }
  async update(req: Request, res: Response) {
    const dto = Object.assign(new RoleDTO(), req.body)
    const errors = await validate(dto)
    if (errors.length > 0) {
      return res.status(HttpConstant.HTTP_BAD_REQUEST).json({ errors })
    }
    try {
      let role: RoleEntity = new RoleEntity({
        id: req.params.id,
        name: dto.name,
        description: dto.description,
        permissionIds: dto.permissionIds
      })
      logger.info('Updating a Role')
      this.updateRoleUseCase.execute(role)
      res.status(HttpConstant.HTTP_SUCCESS).json({ message: 'Role update successfully' })
    } catch (error) {
      res.status(HttpConstant.HTTP_BAD_IMPLEMENT).json({ message: error.message })
    }
  }
  async delete(req: Request, res: Response) {
    logger.info('Delete a customer')
    res.status(200).json({ message: 'User deleted successfully' })
  }
}
