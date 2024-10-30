import { Table, Column, Model, DataType, BelongsToMany } from 'sequelize-typescript'
import PermissionEntity from '@src/entities/permission.entity'
import { RoleModel } from './role.model'
import { RolePermissionModel } from './role-permission.model'
@Table({
  tableName: 'permissions',
  timestamps: true
})
export class PermissionModel extends Model<PermissionEntity> {
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
  @BelongsToMany(() => RoleModel, () => RolePermissionModel)
  roles: RoleModel[]
}
