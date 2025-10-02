import "./DeleteConfirmModal.css"

interface DeleteConfirmModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  eventTitle: string
}

export const DeleteConfirmModal = ({ isOpen, onClose, onConfirm, eventTitle }: DeleteConfirmModalProps) => {
  if (!isOpen) return null

  return (
    <div className="modal-overlay">
      <div className="modal-content delete-confirm">
        <h2>Confirmar Exclusão</h2>
        <p>Tem certeza que deseja excluir o evento "{eventTitle}"?</p>
        <div className="modal-buttons">
          <button type="button" onClick={onClose}>
            Cancelar
          </button>
          <button type="button" className="delete-button" onClick={onConfirm}>
            Excluir
          </button>
        </div>
      </div>
    </div>
  )
}

