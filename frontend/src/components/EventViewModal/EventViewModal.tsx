import { FiEdit2, FiTrash2, FiX } from 'react-icons/fi'
import type { Event } from '../../types/event'
import './EventViewModal.css'

interface EventViewModalProps {
    isOpen: boolean
    onClose: () => void
    event: Event | null
    onEdit: (event: Event) => void
    onDelete: (eventId: number) => void
}

export const EventViewModal = ({ isOpen, onClose, event, onEdit, onDelete }: EventViewModalProps) => {
    if (!isOpen || !event) return null

    const formatDateTime = (dateTime: string) => {
        const date = new Date(dateTime)
        return date.toLocaleString('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content event-view">
                <div className="modal-header">
                    <h2>Detalhes do Evento</h2>
                    <div className="modal-actions">
                        <button
                            className="action-btn edit-btn"
                            onClick={() => onEdit(event)}
                            title="Editar evento"
                        >
                            <FiEdit2 />
                        </button>
                        <button
                            className="action-btn delete-btn"
                            onClick={() => onDelete(event.id)}
                            title="Excluir evento"
                        >
                            <FiTrash2 />
                        </button>
                        <button
                            className="action-btn close-btn"
                            onClick={onClose}
                            title="Fechar"
                        >
                            <FiX />
                        </button>
                    </div>
                </div>

                <div className="event-details">
                    <div className="detail-item">
                        <span className="detail-label">Título:</span>
                        <span className="detail-value">{event.title}</span>
                    </div>

                    <div className="detail-item">
                        <span className="detail-label">Início:</span>
                        <span className="detail-value">{formatDateTime(event.start_time)}</span>
                    </div>

                    <div className="detail-item">
                        <span className="detail-label">Término:</span>
                        <span className="detail-value">{formatDateTime(event.end_time)}</span>
                    </div>

                    <div className="detail-item">
                        <span className="detail-label">Cor:</span>
                        <div className="color-display">
                            <div
                                className="color-circle"
                                style={{ backgroundColor: event.color }}
                            ></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};