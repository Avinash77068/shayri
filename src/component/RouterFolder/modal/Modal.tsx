import React from "react";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
  showCloseButton?: boolean;
  className?: string;
}

const Modal: React.FC<ModalProps> = ({
  open,
  onClose,
  children,
  title,
  showCloseButton = true,
  className = "",
}) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 bg-black text-black  bg-opacity-40 flex justify-center items-center z-50">
      <div className={`bg-white p-6 rounded-lg shadow-lg min-w-[600px] min-h-[500px] relative ${className}`}>
        {showCloseButton && (
          <button className="absolute top-2 right-4 text-2xl p-1 bg-blue-400 h-16 border rounded-full w-16" onClick={onClose}>X</button>
        )}
        {title && <h2 className="text-lg font-bold mb-2">{title}</h2>}
        {children}
      </div>
    </div>
  );
};

export default Modal; 