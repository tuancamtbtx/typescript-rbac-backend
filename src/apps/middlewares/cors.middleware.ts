import { Request, Response, NextFunction } from 'express'
import express from 'express'

import cors from 'cors'

const app = express()

// FIXES CORS ERROR
const whiteList = ['http://localhost:3000', '*']

const corsOptions = {
  origin: (origin, callback) => {
    if (app.get('env') === 'production') {
      const originIsWhiteListed = whiteList.indexOf(origin) !== -1
      callback(null, originIsWhiteListed)
    } else {
      callback(null, true)
    }
  },
  credentials: true
}
export default cors(corsOptions)
