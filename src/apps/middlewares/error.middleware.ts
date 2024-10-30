import { Request, Response, NextFunction } from 'express'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function error404Forwarder(req: Request, res: Response, next: NextFunction) {
  var err: any = new Error('Not Found')
  err.status = 404
  next(err)
}

export function errorDebugMiddleware(err, req, res, next) {
  res.status(err.status || 500)
  res.json({
    message: err.message,
    error: err
  })
}

export function errorReleaseMiddleware(err, req, res, next) {
  res.status(err.status || 500)
  res.json({
    message: err.message,
    error: {}
  })
}
