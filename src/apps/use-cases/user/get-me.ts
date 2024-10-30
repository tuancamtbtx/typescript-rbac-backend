import IUserRepository from '@src/repo/interface/user'
import { IRoleRepository } from '@src/repo/interface/role'
import UserEntity from '@src/entities/user.entity'
import JWTService from '@src/services/jwt.service'
export default class GetMeUseCase {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly roleRepository: IRoleRepository
  ) {}

  async execute(accessToken: string): Promise<UserEntity> {
    let ggUser = await JWTService.verifyToken(accessToken)
    console.log('ggUser', ggUser)
    let email = ggUser.email
    let user = await this.userRepository.findByEmail(email)
    if (user.roleId) {
      let role = await this.roleRepository.findById(user.roleId)
      let permisisons = role.permissions
      user.permissions = permisisons
      return {
        ...user
      }
    }
    return {
      ...user
    }
  }
}
