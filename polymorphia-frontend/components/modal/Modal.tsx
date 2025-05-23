import { ModalProps } from '@/interfaces/modal/ModalInterfaces';
import clsx from 'clsx';
import { X } from 'lucide-react';
import Image from 'next/image';
import { createPortal } from 'react-dom';

export default function Modal({
  isOpen,
  onClose,
  title,
  children,
}: ModalProps) {
  return createPortal(
    <div
      className={clsx(
        'fixed top-0 left-0 flex items-center justify-center w-screen h-screen z-[51] bg-neutral-800/50 backdrop-blur-xs transition-opacity',
        isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
      )}
      onClick={isOpen ? onClose : undefined}
    >
      <div
        className={clsx(
          'm-3 w-sm lg:w-md 2xl:w-lg min-h-32 p-3 md:p-5 z-[52] bg-neutral-300 border-2 border-neutral-800 rounded-xl transition-opacity',
        )}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div className="flex flex-row justify-between items-start mb-2">
          <h1 className="text-4xl">{title}</h1>
          <X className="cursor-pointer hover:drop-shadow-lg" onClick={onClose}/>
        </div>
        {children}
      </div>
    </div>,
    document.body
  );
}
