import { Request, Response, NextFunction } from 'express'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  return res.status(err.httpCode || 500).json({
    status: err.statusCode || '500',
    message: err.message
  })
}

export const basicAuthMiddleware = (req: Request, res: Response, next: NextFunction) => {
  if (req.headers.authorization === 'Basic YWR 2OnNlY3JldA==') {
    return next()
  }
  return res.status(401).json({ message: 'Unauthorized' })
}
