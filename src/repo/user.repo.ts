import { injectable } from 'inversify'

import IUserRepository from '@src/repo/interface/user'
import UserEntity from '@src/entities/user.entity'

import { UserModel } from '@src/infra/models/user.model'
import { RoleModel } from '@src/infra/models/role.model'
import { PermissionModel } from '@src/infra/models/permission.model'
import loggers from '@src/utils/logger'
@injectable()
export default class UserRepository implements IUserRepository {
  async findAll(query: any): Promise<UserEntity[]> {
    loggers.info(`UserRepository - findAll - query: ${query}`)
    let result = await UserModel.findAll({
      include: [
        {
          model: RoleModel,
          as: 'role',
          include: [
            {
              model: PermissionModel,
              as: 'permissions'
            }
          ]
        }
      ],
      order: [['id', 'asc']]
    })
    return result.map((user) => user.dataValues)
  }
  async findById(id: string): Promise<UserEntity | null> {
    let result = await UserModel.findOne({
      where: { id },
      include: [
        {
          model: RoleModel,
          as: 'role'
        }
      ]
    })
    if (result) {
      return result.dataValues
    }
  }
  async findByEmail(email: string): Promise<UserEntity | null> {
    let result = await UserModel.findOne({
      where: { email },
      include: [
        {
          model: RoleModel,
          as: 'role'
        }
      ]
    })
    if (result) {
      return result.dataValues
    }
    throw new Error(`User with email ${email} not found.`)
  }
  async create(user: UserEntity): Promise<UserEntity> {
    const role = await RoleModel.findByPk(user.roleId)
    if (!role) {
      throw new Error(`Role with ID ${user.roleId} does not exist.`)
    }
    let result = await UserModel.create(user)
    return result.dataValues
  }
  async update(user: UserEntity): Promise<UserEntity> {
    if (user.roleId) {
      const role = await RoleModel.findByPk(user.roleId)
      if (!role) {
        throw new Error(`Role with ID ${user.roleId} does not exist.`)
      }
    }
    if (user.id) {
      let userCheck = await UserModel.findOne({ where: { id: user.id } })
      if (!userCheck) {
        throw new Error(`User with Id ${user.id} does not exist.`)
      }
    }
    let result = await UserModel.update(user, { where: { id: user.id }, returning: true })
    return result[1][0].dataValues as UserEntity
  }
  async delete(id: number): Promise<void> {
    let result = await UserModel.destroy({ where: { id } })
    if (!result) {
      throw new Error(`User with ID ${id} does not exist.`)
    }
  }
}
