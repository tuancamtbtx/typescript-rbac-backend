import { IPermissionRepository } from '@src/repo/rbac/interface/permission'
import PermissionEntity from '@src/entities/site/permission.entity'
export default class GetPermissionUseCase {
  constructor(private permissionRepository: IPermissionRepository) {}
  async execute(): Promise<PermissionEntity[]> {
    return this.permissionRepository.list()
  }
}
