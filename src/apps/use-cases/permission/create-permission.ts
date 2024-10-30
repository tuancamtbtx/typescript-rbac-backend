import { IPermissionRepository } from '@src/repo/rbac/interface/permission'
import PermissionEntity from '@src/entities/site/permission.entity'
export default class CreatePermissionUseCase {
  constructor(private readonly permissionRepository: IPermissionRepository) {}

  public async execute(permission: PermissionEntity): Promise<PermissionEntity> {
    return await this.permissionRepository.create(permission)
  }
}
