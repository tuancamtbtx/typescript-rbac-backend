import IUserRepository from '@src/repo/interface/user'
import loggers from '@src/utils/logger'

export default class DeleteUserUsecase {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(id: number): Promise<void> {
    loggers.info(`CreateUserUsecase.execute, ${JSON.stringify(id)}`)
    return await this.userRepository.delete(id)
  }
}
