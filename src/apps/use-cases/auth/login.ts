import IUserRepository from '@src/repo/interface/user'
import {IRoleRepository} from '@src/repo/interface/role'

import UserEntity from '@src/entities/user.entity'
import GoogleService from '@src/services/google.service'
import JWTService from '@src/services/jwt.service'

export default class LoginUsecase {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(credential: string): Promise<any> {
    let user = GoogleService.getUserFromToken(credential)
    let userByEmail = await this.userRepository.findByEmail(user.email)
    let logginUser = new UserEntity()
    logginUser.email = user.email
    logginUser.username = user.given_name
    logginUser.fullname = user.name
    logginUser.avatar = user.picture
    const payload = {
      email: logginUser.email
    }
    if (!userByEmail) {
      logginUser = await this.userRepository.create(logginUser)
      let access_token = await JWTService.generateToken(payload)
      return {
        access_token: access_token,
        ...logginUser
      }
    } else {
      logginUser.id = userByEmail.id
      let data = await this.userRepository.update(logginUser)
      let access_token = await JWTService.generateToken(payload)
      return {
        access_token: access_token,
        ...data
      }
    }
  }
}
