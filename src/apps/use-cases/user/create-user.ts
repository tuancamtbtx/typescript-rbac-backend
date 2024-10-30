import IUserRepository from '@src/repo/site/user'
import UserEntity from '@src/entities/site/user.entity'
import loggers from '@src/utils/logger'
export default class CreateUserUsecase {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(user: UserEntity): Promise<UserEntity> {
    loggers.info(`CreateUserUsecase.execute, ${JSON.stringify(user)}`)
    return await this.userRepository.create(user)
  }
}
