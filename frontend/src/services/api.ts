import axios from "axios";
import type { CreateEventInput, Event } from "../types/event";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
})


export const findAllEvents = async (): Promise<Event[]> => {
  const response = await api.get<Event[]>("/events")
  return response.data

}

export const createEvent = async (eventData: CreateEventInput): Promise<Event> => {
    const response = await api.post<Event>("/events", eventData)
    return response.data
}

export const updateEvent = async (eventId: number, eventData: CreateEventInput): Promise<Event> => {
    const response = await api.patch<Event>(`/events/${eventId}`, eventData)
    return response.data
}

export const deleteEvent = async (eventId: number): Promise<void> => {
    await api.delete(`/events/${eventId}`)
}


