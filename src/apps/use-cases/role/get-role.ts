import RoleEntity from '@src/entities/site/role.entity'
import { IRoleRepository } from '@src/repo/rbac/interface/role'
export default class GetRoleUsecase {
  constructor(private readonly roleRepository: IRoleRepository) {}

  async execute(): Promise<RoleEntity[]> {
    return await this.roleRepository.list()
  }
}
