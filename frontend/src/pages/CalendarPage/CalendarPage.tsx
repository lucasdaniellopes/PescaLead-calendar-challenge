import { useState, useEffect } from "react";
import type { Event } from "../../types/event";
import { findAllEvents } from "../../services/api";
import "../../index.css"
import './CalendarPage.css'
import { FiPlus } from "react-icons/fi";
import { CalendarGrid } from "../../components/CalendarGrid/CalendarGrid";

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
    <div className="container">
        <button className="add-event-button">
            <FiPlus />
            Adicionar Evento
        </button>
        
        {/* <ul>
            {events.map((event) => (
            <li key={event.id}>{event.title}</li>
            ))}
        </ul> */}

        <CalendarGrid events={events} />
    </div>
  )
}
