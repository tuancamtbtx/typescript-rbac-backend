import { Container } from 'inversify'
import 'reflect-metadata'
import { IPermissionRepository } from '@src/repo/interface/permission'
import PermissionRepository from '@src/repo/permission.repo'
import CreatePermissionUseCase from '@src/apps/use-cases/permission/create-permission'
import GetListPermissionUsecase from '@src/apps/use-cases/permission/get-permission'
const container = new Container()
container.bind<IPermissionRepository>('PermissionRepository').to(PermissionRepository)

container.bind<CreatePermissionUseCase>('CreatePermissionUseCase').toDynamicValue((context) => {
  return new CreatePermissionUseCase(context.container.get<IPermissionRepository>('PermissionRepository'))
})
container.bind<GetListPermissionUsecase>('GetListPermissionUsecase').toDynamicValue((context) => {
  return new GetListPermissionUsecase(context.container.get<IPermissionRepository>('PermissionRepository'))
})

export default container
