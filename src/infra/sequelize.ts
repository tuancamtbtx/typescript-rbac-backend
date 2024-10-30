// sequelize.ts
import { Sequelize } from 'sequelize-typescript'
import { UserModel } from '@src/infra/models/user.model'
import { RoleModel } from '@src/infra/models/role.model'
import { PermissionModel } from '@src/infra/models/permission.model'
import { RolePermissionModel } from '@src/infra/models/role-permission.model'
import DBConfig from '@src/configs/db.config'
import logger from '@src/utils/logger'

logger.info(`DBConfig:, ${DBConfig.DB}, ${DBConfig.USER}, ${DBConfig.HOST}`)

const sequelize = new Sequelize({
  database: DBConfig.DB,
  dialect: 'postgres',
  username: DBConfig.USER,
  password: DBConfig.PASSWORD,
  host: DBConfig.HOST,
  port: parseInt(DBConfig.PORT),
  models: [UserModel, RoleModel, PermissionModel, RolePermissionModel]
})

export default sequelize
