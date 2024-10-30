import { Request, Response, NextFunction } from 'express'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const canAccessMiddleware = (req: Request, res: Response, next: NextFunction) => {
  if (req.headers.authorization === 'Basic YWR 2OnNlY3JldA==') {
    return next()
  }
  return res.status(401).json({ message: 'Unauthorized' })
}
