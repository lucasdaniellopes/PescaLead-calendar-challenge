import pool from "./database.js";
import type { Event, CreateEventInput, UpdateEventInput } from "../models/event.js";

export class EventService {
    async create(event: CreateEventInput): Promise<Event> {
       await this.validateEvent(event)

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
        await this.validateUpdateEvent(event, id)
        
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
        const result = await pool.query('DELETE FROM events WHERE id = $1 RETURNING id', [id]);
        if (result.rows.length === 0) {
            throw new Error('Evento não encontrado');
        }
    }

    private async validateEvent(eventData: CreateEventInput, excludeEventId?: number): Promise<void> {
        this.validateTimeOrder(eventData.start_time, eventData.end_time)
        this.validateDuration(eventData.start_time, eventData.end_time)
        await this.validateDailyLimit(eventData.start_time, excludeEventId)
        await this.validateTimeOverlap(eventData, excludeEventId)
    }

    private async validateUpdateEvent(eventData: UpdateEventInput, excludeEventId?: number): Promise<void> {
        
        if (!eventData.start_time || !eventData.end_time) {
            return
        }
        
        const eventForValidation: CreateEventInput = {
            title: eventData.title || '',
            start_time: eventData.start_time || '',
            end_time: eventData.end_time || '',
            color: eventData.color || ''
        }
        await this.validateEvent(eventForValidation, excludeEventId)
    }

    public validateTimeOrder(startTime: string, endTime: string): void {
        const startDate = new Date(startTime)
        const endDate = new Date(endTime)
        if (endDate <= startDate) {
            throw new Error('O horário de término deve ser posterior ao horário de início.');
        }
    }

    public validateDuration(startTime: string, endTime: string): void {
        const startDate = new Date(startTime)
        const endDate = new Date(endTime)
        const durationMinutes = (endDate.getTime() - startDate.getTime()) / (1000 * 60)

        if (durationMinutes < 15) {
            throw new Error('A duração do evento deve ser de pelo menos 15 minutos');
        }

        if (durationMinutes > 720) {
            throw new Error('A duração maxima do evento é de 12 horas');
        }
    }

    public async validateDailyLimit(startTime: string,  excludeEventId?: number): Promise<void> {
        const startDate = new Date(startTime)
        const eventDate = startDate.toISOString().split('T')[0]
        const query = excludeEventId
            ? 'SELECT COUNT(*) FROM events WHERE DATE(start_time) = $1 AND id != $2'
            : 'SELECT COUNT(*) FROM events WHERE DATE(start_time) = $1';
        const params = excludeEventId ? [eventDate, excludeEventId] : [eventDate];
        const result = await pool.query(query, params);
        const eventCount = parseInt(result.rows[0].count);

        if (eventCount >= 8) {
            throw new Error('Máximo de 8 eventos por dia');
        }
    }

    public async validateTimeOverlap(eventData: CreateEventInput, excludeEventId?: number): Promise<void> {
        const query = excludeEventId
            ? `SELECT COUNT(*) FROM events
              WHERE id != $1 AND
                (start_time, end_time) OVERLAPS ($2, $3)`
            : `SELECT COUNT(*) FROM events
              WHERE (start_time, end_time) OVERLAPS ($1, $2)`;
        const params = excludeEventId
            ? [excludeEventId, eventData.start_time, eventData.end_time]
            : [eventData.start_time, eventData.end_time];
        const result = await pool.query(query, params);
        const overlapCount = parseInt(result.rows[0].count);

        if (overlapCount > 0) {
            throw new Error('Já existe um evento nesse intervalo de tempo')
        }
    }
        
}