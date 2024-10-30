import { Container } from 'inversify'
import 'reflect-metadata'
import UserRepository from '@src/repo/user.repo'
import IUserRepository from '@src/repo/interface/user'
import LoginUsecase from '@src/apps/use-cases/auth/login'
const container = new Container()

container.bind<IUserRepository>('UserRepository').to(UserRepository)
container.bind<LoginUsecase>('LoginUsecase').toDynamicValue((context) => {
  return new LoginUsecase(context.container.get<IUserRepository>('UserRepository'))
})

export default container
