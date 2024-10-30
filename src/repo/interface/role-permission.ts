import RolePermissionEntity from '@src/entities/site/role-permission.entity'
export interface IRolePermissionRepository {
  create(data: RolePermissionEntity): Promise<RolePermissionEntity>
  delete(roleId: number, permissionId: number): Promise<boolean>
  findByRoleId(roleId: number): Promise<RolePermissionEntity[]>
  findByPermissionId(permissionId: number): Promise<RolePermissionEntity[]>
  list(): Promise<RolePermissionEntity[]>
}
