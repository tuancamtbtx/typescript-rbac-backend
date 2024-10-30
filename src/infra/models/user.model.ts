import { Table, Column, Model, DataType, BelongsTo, ForeignKey } from 'sequelize-typescript'
import UserEntity from '@src/entities/user.entity'
import { RoleModel } from './role.model'
@Table({
  tableName: 'users',
  timestamps: true
})
export class UserModel extends Model<UserEntity> {
  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  email: string

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  username: string

  @Column({
    type: DataType.STRING,
    allowNull: true
  })
  fullname: string

  @Column({
    type: DataType.STRING,
    allowNull: true
  })
  avatar: string

  @Column({
    type: DataType.INTEGER,
    allowNull: true,
    references: {
      model: 'roles',
      key: 'id'
    }
  })
  @ForeignKey(() => RoleModel)
  @Column({
    type: DataType.INTEGER,
    allowNull: true
  })
  roleId: number

  @BelongsTo(() => RoleModel)
  role!: RoleModel
}
