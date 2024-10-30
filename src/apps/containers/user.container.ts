// src/infrastructure/di/container.ts
import { Container } from 'inversify'
import 'reflect-metadata'
import UserRepository from '@src/repo/user.repo'
import IUserRepository from '@src/repo/interface/user'
import { IRoleRepository } from '@src/repo/interface/role'
import RoleRepository from '@src/repo/role.repo'
import CreateUserUsecase from '@src/apps/use-cases/user/create-user'
import GetUserUsecase from '@src/apps/use-cases/user/get-user'
import GetMeUsecase from '@src/apps/use-cases/user/get-me'
import DeleteUserUsecase from '@src/apps/use-cases/user/delete-user'
import UpdateUserUsecase from '@src/apps/use-cases/user/update-user'

const container = new Container()

container.bind<IUserRepository>('UserRepository').to(UserRepository)
container.bind<IRoleRepository>('RoleRepository').to(RoleRepository)

container.bind<CreateUserUsecase>('CreateUserUseCase').toDynamicValue((context) => {
  return new CreateUserUsecase(context.container.get<IUserRepository>('UserRepository'))
})
container.bind<GetUserUsecase>('GetUserUseCase').toDynamicValue((context) => {
  return new GetUserUsecase(context.container.get<IUserRepository>('UserRepository'))
})
container.bind<GetMeUsecase>('GetMeUseCase').toDynamicValue((context) => {
  return new GetMeUsecase(
    context.container.get<IUserRepository>('UserRepository'),
    context.container.get<IRoleRepository>('RoleRepository')
  )
})
container.bind<DeleteUserUsecase>('DeleteUserUseCase').toDynamicValue((context) => {
  return new DeleteUserUsecase(context.container.get<IUserRepository>('UserRepository'))
})

container.bind<UpdateUserUsecase>('UpdateUserUseCase').toDynamicValue((context) => {
  return new UpdateUserUsecase(context.container.get<IUserRepository>('UserRepository'))
})
export default container
