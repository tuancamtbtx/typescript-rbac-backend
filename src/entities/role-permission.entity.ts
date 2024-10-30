export default class RolePermissionEntity {
  public readonly id: string
  public roleId: number
  public permissionId: number
  public createdAt: Date
  public updatedAt: Date
  public constructor(init?: Partial<RolePermissionEntity>) {
    Object.assign(this, init)
  }
}
