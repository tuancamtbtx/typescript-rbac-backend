import { IUserRoleRepository } from '@src/repo/rbac/interface/user-role'
import UserRoleEntity from '@src/entities/site/user-role.entity'

export default class UpdateRoleUserUsecase {
  constructor(private readonly userRoleRepository: IUserRoleRepository) {}

  async execute(userId: number, roleId: number): Promise<UserRoleEntity> {
    let userRole: UserRoleEntity = new UserRoleEntity({ userId, roleId })
    return await this.userRoleRepository.create(userRole)
  }
}
