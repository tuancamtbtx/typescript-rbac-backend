import { Table, Column, Model, DataType, BelongsToMany } from 'sequelize-typescript'
import RoleEntity from '@src/entities/role.entity'
import RolePermissionEntity from '@src/entities/role-permission.entity'
import { PermissionModel } from './permission.model'
import { RolePermissionModel } from './role-permission.model'

@Table({
  tableName: 'roles',
  timestamps: true
})
export class RoleModel extends Model<RoleEntity> {
  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  name: string

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  description: string

  @BelongsToMany(() => PermissionModel, () => RolePermissionModel)
  permissions: PermissionModel[]

  async addRolePermissions(rolePermissions: RolePermissionEntity[]) {
    if (rolePermissions.length == 0) {
      return
    }
    let roleId = rolePermissions[0].roleId

    let updatedPermissionIds = rolePermissions.map((rolePermission) => {
      return rolePermission.permissionId
    })
    let currentPermissionByRoleId = await RolePermissionModel.findAll({
      where: {
        roleId: roleId
      }
    })
    let currentPermissionIds = currentPermissionByRoleId.map((role) => {
      return role.dataValues.permissionId
    })
    let permissionIdsToDelete = currentPermissionIds.filter((permissionId) => {
      return !updatedPermissionIds.includes(permissionId)
    })
    permissionIdsToDelete.forEach(async (permissionId) => {
      await RolePermissionModel.destroy({
        where: {
          roleId: roleId,
          permissionId: permissionId
        }
      })
    })
    rolePermissions.forEach(async (rolePermission) => {
      let rolePermissionCheck = await RolePermissionModel.findOne({
        where: {
          roleId: rolePermission.roleId,
          permissionId: rolePermission.permissionId
        }
      })
      if (!rolePermissionCheck) {
        await RolePermissionModel.create(rolePermission)
      }
    })
  }
}
