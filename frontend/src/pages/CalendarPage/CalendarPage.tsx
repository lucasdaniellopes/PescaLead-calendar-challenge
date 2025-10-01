import { useState, useEffect } from "react";
import type { Event } from "../../types/event";
import { findAllEvents } from "../../services/api";

export const CalendarPage = () => {
    const [events, setEvents] = useState<Event[]>([]);

    useEffect(() => {
        loadEvents()
    }, []);

    const loadEvents = async () => {
        try {
            const events = await findAllEvents();
            setEvents(events);
        } catch (error) {
            console.error("Erro ao carregar eventos", error);
        }
    }

  return (
    <div>
      <h1>Calendar Page</h1>
      <ul>
        {events.map((event) => (
          <li key={event.id}>{event.title}</li>
        ))}
      </ul>
    </div>
  )
}
