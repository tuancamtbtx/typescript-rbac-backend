export default class PermissionEntity {
  public readonly id: string
  public name: string
  public description: string
  public createdAt: Date
  public updatedAt: Date
  public constructor(init?: Partial<PermissionEntity>) {
    Object.assign(this, init)
  }
}
