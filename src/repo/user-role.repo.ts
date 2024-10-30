import UserRoleEntity from '@src/entities/user-role.entity'
import { IUserRoleRepository } from '@src/repo/interface/user-role'
export default class UserRoleRepository implements IUserRoleRepository {
  create(data): Promise<UserRoleEntity> {
    throw new Error('Method not implemented.')
  }
  update(data): Promise<UserRoleEntity> {
    throw new Error('Method not implemented.')
  }
  delete(id): Promise<boolean> {
    throw new Error('Method not implemented.')
  }
  findById(id): Promise<UserRoleEntity> {
    throw new Error('Method not implemented.')
  }
  findByUserId(userId): Promise<UserRoleEntity> {
    throw new Error('Method not implemented.')
  }
  findByRoleId(roleId): Promise<UserRoleEntity> {
    throw new Error('Method not implemented.')
  }
  list(): Promise<UserRoleEntity[]> {
    throw new Error('Method not implemented.')
  }
}
