import { jwtDecode } from 'jwt-decode'

export default class GoogleService {
  public static getUserFromToken(token: string): any {
    return jwtDecode(token)
  }
}
