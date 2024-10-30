export default class UserEntity {
  public id: number
  public email: string
  public username: string
  public avatar: string
  public fullname: string
  public createdAt: Date
  public updatedAt: Date
  public permissions: string[]
  public roleId: number

  public constructor(init?: Partial<UserEntity>) {
    Object.assign(this, init)
  }
}
