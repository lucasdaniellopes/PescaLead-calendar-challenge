import pool from "./database.js";
import type { Event, CreateEventInput, UpdateEventInput } from "../models/event.js";

export class EventService {
    async create(event: CreateEventInput): Promise<Event> {
       const result = await pool.query(
            'INSERT INTO events (title, start_time, end_time, color) VALUES ($1, $2, $3, $4) RETURNING *',
            [event.title, event.start_time, event.end_time, event.color]
        );
        return result.rows[0];
    }

    async findAll(): Promise<Event[]> {
        const result = await pool.query('SELECT * FROM events ORDER BY start_time ASC');
        return result.rows;
    }

    async findById(id: number): Promise<Event | null> {
        const result = await pool.query('SELECT * FROM events WHERE id = $1', [id]);
        if (result.rows.length === 0) {
            return null;
        }
        return result.rows[0];
    }

    async updateEvent(id: number, event: UpdateEventInput): Promise<Event> {
        const result = await pool.query(
            `UPDATE events SET 
                title = COALESCE($1, title), 
                start_time = COALESCE($2, start_time), 
                end_time = COALESCE($3, end_time), 
                color = COALESCE($4, color) 
             WHERE id = $5 RETURNING *`,
            [event.title, event.start_time, event.end_time, event.color, id]
        );
        if (result.rows.length === 0) {
            throw new Error('Evento não encontrado');
        }
        return result.rows[0];    
    }

    async deleteEvent(id: number): Promise<void> {
        const result = await pool.query('DELETE FROM events WHERE id = $1', [id]);
        if (result.rows.length === 0) {
            throw new Error('Evento não encontrado');
        }
    }
}