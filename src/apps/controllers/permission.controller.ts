import { Request, Response } from 'express'
import { validate } from 'class-validator'

import logger from '@src/utils/logger'
import PermissionDTO from '@src/apps/validations/permission.dto'
import PermissionEntity from '@src/entities/permission.entity'
import CreatePermissionUsecase from '@src/apps/use-cases/permission/create-permission'
import GetListPermissionUsecase from '@src/apps/use-cases/permission/get-permission'

import HttpConstant from '@src/common/constant/http'

export default class RoleController {
  constructor(
    private readonly createPermissionUseCase: CreatePermissionUsecase,
    private readonly getListPermissionUseCase: GetListPermissionUsecase
  ) {}
  async list(req: Request, res: Response) {
    try {
      let data = await this.getListPermissionUseCase.execute()
      res.status(HttpConstant.HTTP_SUCCESS).json({ data: { list: data }, message: 'success' })
    } catch (error) {
      res.status(HttpConstant.HTTP_BAD_IMPLEMENT).json({ message: error.message })
    }
  }
  async create(req: Request, res: Response) {
    try {
      const dto = Object.assign(new PermissionDTO(), req.body)
      const errors = await validate(dto)
      if (errors.length > 0) {
        return res.status(HttpConstant.HTTP_BAD_REQUEST).json({ errors })
      }
      let role: PermissionEntity = new PermissionEntity({
        name: dto.name,
        description: dto.description
      })
      let data = await this.createPermissionUseCase.execute(role)
      res.status(HttpConstant.HTTP_CREATED_SUCCESS).json({ data: data, message: 'Permission created successfully' })
    } catch (error) {
      res.status(HttpConstant.HTTP_BAD_IMPLEMENT).json({ message: error.message })
    }
  }
  async update(req: Request, res: Response) {
    logger.info('Updating a customer')
    res.status(201).json({ message: 'Permission update successfully' })
  }
  async delete(req: Request, res: Response) {
    logger.info('Delete a customer')
    res.status(200).json({ message: 'Permission deleted successfully' })
  }
}
