import { IPermissionRepository } from './interface/permission'
import PermissionEntity from '@src/entities/permission.entity'
import { injectable } from 'inversify'
import { PermissionModel } from '@src/infra/models/permission.model'
@injectable()
export default class PermissionRepository implements IPermissionRepository {
  async create(data): Promise<PermissionEntity> {
    let result = await PermissionModel.create(data)
    return result.dataValues as PermissionEntity
  }
  update(data): Promise<PermissionEntity> {
    throw new Error('Method not implemented.')
  }
  delete(id): Promise<boolean> {
    throw new Error('Method not implemented.')
  }
  findById(id): Promise<PermissionEntity> {
    throw new Error('Method not implemented.')
  }
  findByName(name): Promise<PermissionEntity> {
    throw new Error('Method not implemented.')
  }
  async list(): Promise<PermissionEntity[]> {
    let result = await PermissionModel.findAll()
    return result.map((permission) => permission.dataValues)
  }
}
