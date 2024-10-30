import PermissionEntity from '@src/entities/site/permission.entity'

export interface IPermissionRepository {
  create(data: PermissionEntity): Promise<PermissionEntity>
  update(data: PermissionEntity): Promise<PermissionEntity>
  delete(id: number): Promise<boolean>
  findById(id: number): Promise<PermissionEntity>
  findByName(name: string): Promise<PermissionEntity>
  list(): Promise<PermissionEntity[]>
}
