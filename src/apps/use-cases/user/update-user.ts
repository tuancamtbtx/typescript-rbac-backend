import IUserRepository from '@src/repo/site/user'
import UserEntity from '@src/entities/site/user.entity'

export default class UpdateUserUsecase {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(updateUser: UserEntity): Promise<UserEntity> {
    return await this.userRepository.update(updateUser)
  }
}
