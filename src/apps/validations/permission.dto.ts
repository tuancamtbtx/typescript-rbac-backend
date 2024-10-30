import { IsString } from 'class-validator'

export default class PermissionDto {
  @IsString()
  public name: string

  @IsString()
  public description: string
}
