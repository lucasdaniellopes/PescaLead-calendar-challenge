import { useState, useEffect } from "react";
import type { CreateEventInput, Event } from "../../types/event";
import { findAllEvents, createEvent } from "../../services/api";
import "../../index.css"
import './CalendarPage.css'
import { FiPlus } from "react-icons/fi";
import { CalendarGrid } from "../../components/CalendarGrid/CalendarGrid";
import { EventForm } from "../../components/EventForm/EventForm";

export const CalendarPage = () => {
    const [events, setEvents] = useState<Event[]>([])
    const [isModalOpen, setIsModalOpen] = useState(false)

     const handleAddEvent = () => {
        setIsModalOpen(true)
    }

    const handleCloseModal = () => {
        setIsModalOpen(false)
    }

    const handleSaveEvent = async (eventData: CreateEventInput) => {
        try {
            await createEvent(eventData)
            await loadEvents()
        } catch (error) {
            console.error("Erro ao criar evento", error)
        }
    }

    useEffect(() => {
        loadEvents()
    }, [])

    const loadEvents = async () => {
        try {
            const events = await findAllEvents()
            setEvents(events);
        } catch (error) {
            console.error("Erro ao carregar eventos", error)
        }
    }

  return (
    <div className="container">
        <button className="add-event-button" onClick={handleAddEvent}>
            <FiPlus />
            Adicionar Evento
        </button>
        
        {/* <ul>
            {events.map((event) => (
            <li key={event.id}>{event.title}</li>
            ))}
        </ul> */}

        <CalendarGrid events={events} />

        <EventForm 
            isOpen={isModalOpen} 
            onClose={handleCloseModal} 
            onSave={handleSaveEvent} 
        />
    </div>
  )
}
