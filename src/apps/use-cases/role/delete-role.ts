import { IRoleRepository } from '@src/repo/rbac/interface/role'

export default class DeleteRoleUsecase {
  constructor(private readonly roleRepository: IRoleRepository) {}

  async execute(id: number): Promise<boolean> {
    let result = await this.roleRepository.delete(id)
    return result
  }
}
