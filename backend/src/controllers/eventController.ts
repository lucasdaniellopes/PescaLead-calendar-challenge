import type { Request, Response } from 'express'
import { EventService} from '../services/eventService.js'
import type { CreateEventInput } from '../models/event.js'

const eventService = new EventService()

export const createEvent = async (req:Request, res: Response) => {
    try {
        const eventData: CreateEventInput = req.body
        const newEvent = await eventService.create(eventData)
        res.status(201).json(newEvent)
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : 'Erro ao criar evento'
        res.status(400).json({ error: message })
    }
}

export const findAllEvents = async (req: Request, res: Response) => {
    try {
        const events = await eventService.findAll()
        res.status(200).json(events)
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : 'Erro ao buscar eventos'
        res.status(500).json({ error: message })
    }
}

export const findEventById = async (req: Request, res: Response ) => {
    try {
        const id = Number(req.params.id)
        const event = await eventService.findById(id)

        if (!event) {
            return res.status(404).json({ error: 'Evento não encontrado' })
        }

        res.status(200).json(event)

    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : 'Erro ao buscar evento'
        res.status(500).json({ error: message })
    }
}