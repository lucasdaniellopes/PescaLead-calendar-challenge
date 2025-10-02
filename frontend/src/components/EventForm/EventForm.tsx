import { useState, useEffect } from "react"
import type { Event, CreateEventInput } from "../../types/event"
import "./EventForm.css"

interface EventFormProps {
  mode: "create" | "edit"
  isOpen: boolean
  onClose: () => void
  event?: Event | null
  onSave: (event: CreateEventInput) => void
  onDelete: (eventId: number) => void
}

export const EventForm = ({
  mode,
  isOpen,
  onClose,
  event,
  onSave,
  onDelete,
}: EventFormProps) => {
  const [formData, setFormData] = useState<CreateEventInput>({
    title: "",
    start_time: "",
    end_time: "",
    color: "#bf7e05",
  });

  const colorOptions = [
    { name: "Laranja", value: "#bf7e05" },
      { name: "Azul", value: "#0d6efd" },
      { name: "Verde", value: "#198754" },
      { name: "Vermelho", value: "#dc3545" },
      { name: "Roxo", value: "#6f42c1" },

  ]

  useEffect(() => {
    if (isOpen) {
      if (mode === "edit" && event) {
        setFormData({
          title: event.title,
          start_time: event.start_time.slice(0, 16),
          end_time: event.end_time.slice(0, 16),
          color: event.color,
        });
      } else {
        setFormData({
          title: "",
          start_time: "",
          end_time: "",
          color: "#bf7e05",
        });
      }
    }
  }, [isOpen, mode, event]);

  const getTitle = () => {
    return mode === "create" ? "Novo Evento" : "Editar Evento";
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (mode === "create") {
      onSave(formData)
    } else if (mode === "edit") {
      onSave(formData)
    }
    onClose()
  };

  if (!isOpen) return null

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>{getTitle()}</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="title">Título:</label>
          <input
            id="title"
            type="text"
            placeholder="Título"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            required
          />

          <label htmlFor="start_time">Início:</label>
          <input
            id="start_time"
            type="datetime-local"
            value={formData.start_time}
            onChange={(e) =>
              setFormData({ ...formData, start_time: e.target.value })
            }
            required
          />

          <label htmlFor="end_time">Término:</label>
          <input
            id="end_time"
            type="datetime-local"
            value={formData.end_time}
            onChange={(e) =>
              setFormData({ ...formData, end_time: e.target.value })
            }
            required
          />
          <div className="color-options">
            {colorOptions.map((color) => (
              <button
                key={color.value}
                type="button"
                className={`color-option ${
                  formData.color === color.value ? "selected" : ""
                }`}
                style={{ backgroundColor: color.value }}
                onClick={() => setFormData({ ...formData, color: color.value })}
                title={color.name}
              ></button>
            ))}
          </div>
          {mode === "edit" && (
            <button
              type="button"
              className="delete-button"
              onClick={() => onDelete(event!.id)}
            >
              Deletar Evento
            </button>
          )}
          <div className="modal-buttons">
            <button type="button" onClick={onClose}>
              Cancelar
            </button>
            <button type="submit">Salvar</button>
          </div>
        </form>
      </div>
    </div>
  );
};
