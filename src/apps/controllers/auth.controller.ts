import { Request, Response } from 'express'
import { validate } from 'class-validator'

import logger from '@src/utils/logger'
import LoginDto from '@src/apps/validations/login.dto'
import LoginUsecase from '@src/apps/use-cases/auth/login'

import HttpConstant from '@src/common/constant/http'

export default class AuthController {
  constructor(private readonly loginUsecase: LoginUsecase) {}
  async login(req: Request, res: Response) {
    try {
      const dto = Object.assign(new LoginDto(), req.body)
      const errors = await validate(dto)
      if (errors.length > 0) {
        logger.warn('User login with Validation failed')
        return res.status(HttpConstant.HTTP_BAD_REQUEST).json({ errors })
      }
      let data = await this.loginUsecase.execute(dto.credential)
      res.status(HttpConstant.HTTP_SUCCESS).json(data)
    } catch (error) {
      res.status(HttpConstant.HTTP_BAD_IMPLEMENT).json({ message: error.message })
    }
  }
}
