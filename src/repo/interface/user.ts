import UserEntity from '@src/entities/user.entity'
export default interface IUserRepository {
  findAll(query: any): Promise<UserEntity[]>
  findById(id: string): Promise<UserEntity | null>
  findByEmail(email: string): Promise<UserEntity | null>
  create(user: UserEntity): Promise<UserEntity>
  update(user: UserEntity): Promise<UserEntity>
  delete(id: number): Promise<void>
}
