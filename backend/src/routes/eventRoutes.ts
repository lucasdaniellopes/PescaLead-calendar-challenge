import { Router } from 'express'
import {createEvent, deleteEvent, findAllEvents, findEventById, updateEvent } from '../controllers/eventController.js'

const router: Router = Router()

router.post('/events', createEvent)

router.get('/events', findAllEvents)

router.get('/events/:id', findEventById)

router.patch('/events/:id', updateEvent)

router.delete('/events/:id', deleteEvent)

export default router
