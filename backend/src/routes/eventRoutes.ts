import { Router } from 'express'
import {createEvent, findAllEvents } from '../controllers/eventController.js'

const router: Router = Router()

router.post('/events', createEvent)

router.get('/events', findAllEvents)

export default router
