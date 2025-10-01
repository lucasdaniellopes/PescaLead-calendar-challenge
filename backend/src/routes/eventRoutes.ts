import { Router } from 'express'
import { createEvent } from '../controllers/eventController.js'

const router: Router = Router()

router.post('/events', createEvent)

export default router
