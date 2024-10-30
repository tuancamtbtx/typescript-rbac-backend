import { IRoleRepository } from '@src/repo/rbac/interface/role'
import RoleEntity from '@src/entities/site/role.entity'

export default class CreateRoleUsecase {
  constructor(private readonly roleRepository: IRoleRepository) {}

  async execute(data: RoleEntity): Promise<RoleEntity> {
    let result = await this.roleRepository.create(data)
    return result
  }
}
