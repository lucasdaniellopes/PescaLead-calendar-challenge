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

    async findAll(): Promise<Event[]> {
        const { data, error } = await database
            .from("events")
            .select("*")
            .order('start_time', { ascending: true })

        if (error) throw new Error(error.message)

        return data
    }

    async findById(id: number): Promise<Event | null> {
        const { data, error } = await database
            .from("events")
            .select("*")
            .eq("id", id)
            .single()

        if (error) throw new Error(error.message)

        return data
    }

    async updateEvent(id: number, event: UpdateEventInput): Promise<Event> {
        const { data, error } = await database
            .from("events")
            .update(event)
            .eq("id", id)
            .select()
            .single()

        if (error) throw new Error(error.message)

        return data
    }

    async deleteEvent(id: number): Promise<void> {
        const { error } = await database
            .from("events")
            .delete()
            .eq("id", id)


        if (error) throw new Error(error.message)
    }
}