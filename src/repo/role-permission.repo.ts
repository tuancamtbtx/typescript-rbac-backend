import RolePermissionEntity from '@src/entities/role-permission.entity'
import { IRolePermissionRepository } from '@src/repo/interface/role-permission'
export default class RolePermissionRepository implements IRolePermissionRepository {
  create(data: RolePermissionEntity): Promise<RolePermissionEntity> {
    throw new Error('Method not implemented.')
  }
  update(data: RolePermissionEntity): Promise<RolePermissionEntity> {
    throw new Error('Method not implemented.')
  }
  delete(id: number): Promise<boolean> {
    throw new Error('Method not implemented.')
  }
  findById(id: number): Promise<RolePermissionEntity> {
    throw new Error('Method not implemented.')
  }
  findByRoleId(roleId: number): Promise<RolePermissionEntity[]> {
    throw new Error('Method not implemented.')
  }
  findByPermissionId(permissionId: number): Promise<RolePermissionEntity[]> {
    throw new Error('Method not implemented.')
  }
  list(): Promise<RolePermissionEntity[]> {
    throw new Error('Method not implemented.')
  }
}
