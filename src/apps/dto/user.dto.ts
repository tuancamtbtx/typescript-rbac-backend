import { IsString, IsNumber } from 'class-validator'

export default class CreateUserDto {
  @IsString()
  public fullname: string

  @IsString()
  public username: string

  @IsString()
  public email: string
}
