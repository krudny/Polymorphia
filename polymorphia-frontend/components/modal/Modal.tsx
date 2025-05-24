import { ModalProps } from '@/interfaces/modal/ModalInterfaces';
import clsx from 'clsx';
import { X } from 'lucide-react';
import { createPortal } from 'react-dom';
import '../../styles/modal.css';

export default function Modal({
  isOpen,
  onClose,
  title,
  children,
}: ModalProps) {
  return createPortal(
    <div
      className={clsx(
        'modal-backdrop',
        isOpen ? 'modal-visible' : 'modal-not-visible'
      )}
      onClick={isOpen ? onClose : undefined}
    >
      <div
        className="modal overflow-auto"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div className="modal-header">
          <h1>{title}</h1>
          <X className="modal-header-exit-button" onClick={onClose} />
        </div>
        {children}
      </div>
    </div>,
    document.body
  );
}
