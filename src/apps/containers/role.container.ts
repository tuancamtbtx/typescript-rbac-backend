import { Container } from 'inversify'
import 'reflect-metadata'
import { IRoleRepository } from '@src/repo/interface/role'
import RoleRepository from '@src/repo/role.repo'
import CreateRoleUsecase from '../use-cases/role/create-role'
import UpdateRoleUsecase from '../use-cases/role/update-role'
import DeleteRoleUsecase from '../use-cases/role/delete-role'
import GetListRoleUsecase from '../use-cases/role/get-role'

const container = new Container()
container.bind<IRoleRepository>('RoleRepository').to(RoleRepository)

container.bind<CreateRoleUsecase>('CreateRoleUseCase').toDynamicValue((context) => {
  return new CreateRoleUsecase(context.container.get<IRoleRepository>('RoleRepository'))
})
container.bind<UpdateRoleUsecase>('UpdateRoleUseCase').toDynamicValue((context) => {
  return new UpdateRoleUsecase(context.container.get<IRoleRepository>('RoleRepository'))
})
container.bind<DeleteRoleUsecase>('DeleteRoleUseCase').toDynamicValue((context) => {
  return new DeleteRoleUsecase(context.container.get<IRoleRepository>('RoleRepository'))
})
container.bind<GetListRoleUsecase>('GetListRoleUseCase').toDynamicValue((context) => {
  return new GetListRoleUsecase(context.container.get<IRoleRepository>('RoleRepository'))
})
export default container
