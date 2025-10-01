import { Router } from 'express'
import {createEvent, findAllEvents, findEventById, updateEvent } from '../controllers/eventController.js'

const router: Router = Router()

router.post('/events', createEvent)

router.get('/events', findAllEvents)

router.get('/events/:id', findEventById)

router.patch('/events/:id', updateEvent)

export default router
