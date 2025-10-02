import { useState, useEffect } from "react"
import type { CreateEventInput, Event } from "../../types/event"
import {
  findAllEvents,
  createEvent,
  updateEvent,
  deleteEvent,
} from "../../services/api"
import "../../index.css"
import { CalendarGrid } from "../../components/CalendarGrid/CalendarGrid"
import { EventForm } from "../../components/EventForm/EventForm"
import { EventViewModal } from "../../components/EventViewModal/EventViewModal"
import { DeleteConfirmModal } from "../../components/DeleteConfirmModal/DeleteConfirmModal"

export const CalendarPage = () => {
  const [events, setEvents] = useState<Event[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null)
  const [mode, setMode] = useState<"create" | "edit">("create")
  const [viewEventOpen, setViewEventOpen] = useState(false)
  const [viewingEvent, setViewingEvent] = useState<Event | null>(null)
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false)
  const [eventToDelete, setEventToDelete] = useState<Event | null>(null)

  const handleViewEvent = (event: Event) => {
    setViewingEvent(event)
    setViewEventOpen(true)
  }
 
  const handleCloseViewModal = () => {
    setViewEventOpen(false)
    setViewingEvent(null)
  }

  const handleDeleteConfirm = (eventId: number) => {
    const event = events.find(e => e.id === eventId)
    if (event) {
      setEventToDelete(event)
      setDeleteConfirmOpen(true)
    }
  }

  const handleConfirmDelete = async () => {
    if (eventToDelete) {
      try {
        await deleteEvent(eventToDelete.id)
        await loadEvents()
        setDeleteConfirmOpen(false)
        setEventToDelete(null)
        setViewEventOpen(false)
        setViewingEvent(null)
      } catch (error) {
        console.error("Erro ao deletar evento", error)
        setDeleteConfirmOpen(false)
        setEventToDelete(null)
      }
    }
  }

  const handleCloseDeleteModal = () => {
    setDeleteConfirmOpen(false)
    setEventToDelete(null)
  }

  const handleAddEvent = () => {
    setSelectedEvent(null)
    setMode("create")
    setIsModalOpen(true)
  };

  const handleEditEvent = (event: Event) => {
    setSelectedEvent(event)
    setMode("edit")
    setIsModalOpen(true)
    setViewEventOpen(false)
    setViewingEvent(null)
  };

  const handleDeleteEvent = async (eventId: number) => {
    try {
      await deleteEvent(eventId)
      await loadEvents()
      setIsModalOpen(false)
      setViewEventOpen(false)
      setViewingEvent(null)
      setSelectedEvent(null)
    } catch (error) {
      console.error("Erro ao deletar evento", error)
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false)
  };

  const handleSaveEvent = async (eventData: CreateEventInput) => {
    try {
      if (mode === "create") {
        await createEvent(eventData)
      } else if (mode === "edit" && selectedEvent) {
        await updateEvent(selectedEvent.id, eventData)
      }
      await loadEvents()
    } catch (error) {
      console.error("Erro ao criar evento", error)
    }
  };

  useEffect(() => {
    loadEvents()
  }, []);

  const loadEvents = async () => {
    try {
      const events = await findAllEvents()
      setEvents(events)
    } catch (error) {
      console.error("Erro ao carregar eventos", error)
    }
  };

  return (
    <div className="container">
      <CalendarGrid
      events={events}
      onEventClick={handleViewEvent}
      onAddEvent={handleAddEvent}
      />

      <EventForm
        mode={mode}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        event={selectedEvent}
        onSave={handleSaveEvent}
        onDelete={handleDeleteEvent}
      />

      <EventViewModal
        isOpen={viewEventOpen}
        onClose={handleCloseViewModal}
        event={viewingEvent}
        onEdit={handleEditEvent}
        onDelete={handleDeleteConfirm}
      />

      <DeleteConfirmModal
        isOpen={deleteConfirmOpen}
        onClose={handleCloseDeleteModal}
        onConfirm={handleConfirmDelete}
        eventTitle={eventToDelete?.title || ''}
      />
    </div>
  );
};
