import { Router } from 'express'
import {createEvent, findAllEvents, findEventById } from '../controllers/eventController.js'

const router: Router = Router()

router.post('/events', createEvent)

router.get('/events', findAllEvents)

router.get('/events/:id', findEventById)

export default router
