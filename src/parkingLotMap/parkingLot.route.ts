import { Request, Response, NextFunction } from "express"
import { park, parkingLotfindAll, unpark } from "./parkingLot.service"

const express = require('express')
const router = express.Router()

// middleware that is specific to this router
router.use((req: Request, res: Response, next: NextFunction) => {
  console.log('Time: ', Date.now())
  next()
})
// define the home page route
router.get('/', async (req: Request, res: Response) => {
  res.send(await parkingLotfindAll())
})
// define the about route
router.get('/about', (req: Request, res: Response) => {
  res.send('About birds')
})
router.post('/park', async (req: Request, res: Response) => {
  console.log('req. body', req.body)
  res.send(await park(req.body.entryPoint, parseInt(req.body.carType), new Date(req.body.date), req.body.plateNumber))
})

router.post('/unpark', async (req: Request, res: Response) => {
  console.log('req. body', req.body)
  res.send(await unpark(new Date(req.body.date), req.body.plateNumber))
})
module.exports = router