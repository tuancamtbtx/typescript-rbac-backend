import IUserRepository from '@src/repo/site/user'
import UserEntity from '@src/entities/site/user.entity'

export default class GetUserUsecase {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(query: {}): Promise<UserEntity[]> {
    return await this.userRepository.findAll(query)
  }
}
