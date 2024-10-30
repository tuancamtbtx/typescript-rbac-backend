import { injectable } from 'inversify'

import RoleEntity from '@src/entities/role.entity'
import { IRoleRepository } from '@src/repo/interface/role'
import { RoleModel } from '@src/infra/models/role.model'
import { PermissionModel } from '@src/infra/models/permission.model'
import loggers from '@src/utils/logger'
import RolePermissionEntity from '@src/entities/role-permission.entity'
@injectable()
export default class RoleRepository implements IRoleRepository {
  async create(data): Promise<RoleEntity> {
    let result = await RoleModel.create(data)
    return result.dataValues as RoleEntity
  }
  async update(data): Promise<RoleEntity> {
    let permissionIds = data.permissionIds
    const permissions = await PermissionModel.findAll({
      where: {
        id: permissionIds
      }
    })
    if (permissions.length == 0) {
      throw new Error('Permission not found')
    }
    let role = await RoleModel.findByPk(data.id)
    if (!role) {
      loggers.error('Role not found')
      return
    }
    let newRole = new RoleEntity({
      name: data.name,
      description: data.description
    }) // Create new role object
    await RoleModel.update(newRole, {
      where: {
        id: data.id
      }
    }) // Update role
    let rolePermission = permissionIds.map((permissionId) => {
      return new RolePermissionEntity({
        roleId: role.id,
        permissionId: permissionId
      })
    })
    await role.addRolePermissions(rolePermission)
    loggers.info('Role updated successfully')
  }
  delete(id): Promise<boolean> {
    throw new Error('Method not implemented.')
  }
  async findById(id): Promise<RoleEntity> {
    let result = await RoleModel.findByPk(id, {
      include: [
        {
          model: PermissionModel,
          through: { attributes: [] } // Optionally exclude junction table attributes
        }
      ],
      order: [['id', 'asc']]
    })
    return result.dataValues
  }
  findByName(name): Promise<RoleEntity> {
    throw new Error('Method not implemented.')
  }
  async list(): Promise<RoleEntity[]> {
    let result = await RoleModel.findAll({
      include: [
        {
          model: PermissionModel,
          through: { attributes: [] } // Optionally exclude junction table attributes
        }
      ],
      order: [['id', 'asc']]
    })
    return result.map((role) => role.dataValues)
  }
}
