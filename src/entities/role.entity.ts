export default class RoleEntity {
  public readonly id: string
  public name: string
  public description: string
  public permissions: string[]
  public permissionIds: number[]
  public createdBy: string
  public createdAt: Date
  public updatedAt: Date
  public constructor(init?: Partial<RoleEntity>) {
    Object.assign(this, init)
  }
}
