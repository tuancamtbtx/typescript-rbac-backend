import jwt from 'jsonwebtoken'
import loggers from '@src/utils/logger'

const SECRET_KEY = 'SECRET_KEY' // please update key here

export default class JWTService {
  constructor() {}

  public static async generateToken(payload: any): Promise<string> {
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '30d' })
    return token
  }

  public static async verifyToken(token: string): Promise<any> {
    try {
      const decoded = jwt.verify(token, SECRET_KEY)
      loggers.info(`Decoded Payload', ${decoded}`)
      return decoded
    } catch (err) {
      throw new Error('Invalid token')
    }
  }
}
