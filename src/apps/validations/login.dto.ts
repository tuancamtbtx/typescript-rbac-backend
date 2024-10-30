import { IsString } from 'class-validator'

export default class LoginDto {
  @IsString()
  credential: string
}
