import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript'
import RolePermissionEntity from '@src/entities/role-permission.entity'
import { RoleModel } from './role.model'
import { PermissionModel } from './permission.model'
@Table({
  tableName: 'roles_permissions',
  timestamps: true
})
export class RolePermissionModel extends Model<RolePermissionEntity> {
  @ForeignKey(() => PermissionModel)
  @Column({
    type: DataType.INTEGER,
    allowNull: true
  })
  permissionId: number

  @ForeignKey(() => RoleModel)
  @Column({
    type: DataType.INTEGER,
    allowNull: true
  })
  roleId: number
  @BelongsTo(() => RoleModel)
  role!: RoleModel

  @BelongsTo(() => PermissionModel)
  permission!: PermissionModel
}
