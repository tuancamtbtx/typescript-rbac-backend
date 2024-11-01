import { IsString } from 'class-validator'

export default class RoleDto {
  @IsString()
  public name: string

  @IsString()
  public description: string
}
