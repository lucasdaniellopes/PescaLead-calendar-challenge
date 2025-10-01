import { database } from "./database.js";
import type { Event, CreateEventInput, UpdateEventInput } from "../models/event.js";

export class EventService {
    async create(event: CreateEventInput): Promise<Event> {
        const { data, error } = await database
            .from("events")
            .insert([event])
            .select()
            .single()

        if (error) throw new Error(error.message)
        return data
    }
}