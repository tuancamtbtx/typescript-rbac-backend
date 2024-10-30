import { Request, Response } from 'express'
import { validate } from 'class-validator'

import logger from '@src/utils/logger'
import CreateUserDto from '@src/apps/validations/user.dto'
import UserEntity from '@src/entities/user.entity'
import CreateUserUsecase from '@src/apps/use-cases/user/create-user'
import GetUserUsecase from '@src/apps/use-cases/user/get-user'
import GetMeUsecase from '@src/apps/use-cases/user/get-me'
import DeleteUserUsecase from '@src/apps/use-cases/user/delete-user'
import UpdateUserUsecase from '@src/apps/use-cases/user/update-user'
import HttpConstant from '@src/common/constant/http'

export default class CustomerController {
  constructor(
    private readonly createUserUseCase: CreateUserUsecase,
    private readonly getUserUseCase: GetUserUsecase,
    private readonly getMeUseCase: GetMeUsecase,
    private readonly deleteUserUseCase: DeleteUserUsecase,
    private readonly updateUserUseCase: UpdateUserUsecase
  ) {}
  async me(req: Request, res: Response) {
    try {
      let authorization = req.headers.authorization
      if (!authorization) {
        throw new Error('Authorization header is required')
      }
      let token = authorization.split(' ')[1]
      let data = await this.getMeUseCase.execute(token)
      res.status(HttpConstant.HTTP_SUCCESS).json(data)
    } catch (error) {
      res.status(HttpConstant.HTTP_BAD_IMPLEMENT).json({ message: error.message })
    }
  }
  async list(req: Request, res: Response) {
    try {
      let query = req.query
      console.log(query)
      let data = await this.getUserUseCase.execute(query)
      res.status(200).json({ data: { list: data }, message: 'success' })
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  }
  async create(req: Request, res: Response) {
    try {
      const dto = Object.assign(new CreateUserDto(), req.body)
      const errors = await validate(dto)
      if (errors.length > 0) {
        return res.status(400).json({ errors })
      }
      let user: UserEntity = new UserEntity({
        email: dto.email,
        username: dto.username,
        fullname: dto.fullname,
        avatar: dto.avatar,
        roleId: dto.roleId
      })
      let data = await this.createUserUseCase.execute(user)
      res.status(HttpConstant.HTTP_CREATED_SUCCESS).json({ data: data, message: 'User created successfully' })
    } catch (error) {
      res.status(HttpConstant.HTTP_BAD_IMPLEMENT).json({ message: error.message })
    }
  }
  async update(req: Request, res: Response) {
    try {
      let user = new UserEntity({
        id: Number(req.params.id),
        roleId: req.body.roleId
      })
      let data = await this.updateUserUseCase.execute(user)
      res.status(HttpConstant.HTTP_CREATED_SUCCESS).json({ data: data, message: 'User update successfully' })
    } catch (error) {
      res.status(HttpConstant.HTTP_BAD_IMPLEMENT).json({ message: error.message })
    }
  }
  async delete(req: Request, res: Response) {
    try {
      logger.info('Delete a customer')
      this.deleteUserUseCase.execute(Number(req.params.id))
      res.status(200).json({ message: 'User deleted successfully' })
    } catch (error) {
      res.status(HttpConstant.HTTP_BAD_IMPLEMENT).json({ message: error.message })
    }
  }
}
