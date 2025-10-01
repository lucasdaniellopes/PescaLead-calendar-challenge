import { useState, useEffect } from 'react';
import type { CreateEventInput } from '../../types/event';
import './EventForm.css'

interface EventFormProps {
      isOpen: boolean;
      onClose: () => void;
      onSave: (event: CreateEventInput) => void;
}

  export const EventForm = ({ isOpen, onClose, onSave }:EventFormProps) => {
    const [formData, setFormData] = useState<CreateEventInput>({
          title: '',
          start_time: '',
          end_time: '',
          color: '#bf7e05'
      })

      useEffect(() => {
            if (isOpen) {
                setFormData({
                    title: '',
                    start_time: '',
                    end_time: '',
                    color: '#bf7e05'
                })
            }
        }, [isOpen])

      const handleSubmit = (e: React.FormEvent) => {
          e.preventDefault()
          onSave(formData)
          onClose()
      }

      if (!isOpen) return null;

      return (
          <div className="modal-overlay">
              <div className="modal-content">
                  <h2>Novo Evento</h2>
                  <form onSubmit={handleSubmit}>
                      <input
                          type="text"
                          placeholder="Título"
                          value={formData.title}
                          onChange={(e) => setFormData({...formData, title: e.target.value})}
                          required
                      />
                      <input
                          type="datetime-local"
                          value={formData.start_time}
                          onChange={(e) => setFormData({...formData, start_time: e.target.value})}
                          required
                      />
                      <input
                          type="datetime-local"
                          value={formData.end_time}
                          onChange={(e) => setFormData({...formData, end_time: e.target.value})}
                          required
                      />
                      <input
                          type="color"
                          value={formData.color}
                          onChange={(e) => setFormData({...formData, color: e.target.value})}
                      />
                      <div className="modal-buttons">
                          <button type="button" onClick={onClose}>Cancelar</button>
                          <button type="submit">Salvar</button>
                      </div>
                  </form>
              </div>
          </div>
      );
  };
