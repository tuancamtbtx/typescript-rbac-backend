import UserRoleEntity from '@src/entities/site/user-role.entity'

export interface IUserRoleRepository {
  create(data: UserRoleEntity): Promise<UserRoleEntity>
  delete(userId: number, roleId: number): Promise<boolean>
  findByUserId(userId: number): Promise<UserRoleEntity>
  findByRoleId(roleId: number): Promise<UserRoleEntity>
  list(): Promise<UserRoleEntity[]>
}
