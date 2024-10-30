export default class UserRoleEntity {
  public readonly id: string
  public userId: number
  public roleId: number
  public createdAt: Date
  public updatedAt: Date
  public constructor(init?: Partial<UserRoleEntity>) {
    Object.assign(this, init)
  }
}
