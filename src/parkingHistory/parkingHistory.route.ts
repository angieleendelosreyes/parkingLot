import { Request, Response, NextFunction } from "express"
import { parkingHistoryFindAll } from "./parkingHistory.service"

const express = require('express')
const router = express.Router()

// middleware that is specific to this router
router.use((req: Request, res: Response, next: NextFunction) => {
  console.log('Time: ', Date.now())
  next()
})
// define the home page route
router.get('/', async (req: Request, res: Response) => {
  res.send(await parkingHistoryFindAll())
})
// define the about route
router.get('/about', (req: Request, res: Response) => {
  res.send('About birds')
})

module.exports = router