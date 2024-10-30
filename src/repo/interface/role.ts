import RoleEntity from '@src/entities/site/role.entity'

export interface IRoleRepository {
  create(data: RoleEntity): Promise<RoleEntity>
  update(data: RoleEntity): Promise<RoleEntity>
  delete(id: number): Promise<boolean>
  findById(id: number): Promise<RoleEntity>
  findByName(name: string): Promise<RoleEntity>
  list(): Promise<RoleEntity[]>
}
