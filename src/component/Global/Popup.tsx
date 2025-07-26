import React from 'react';
import {
  FaCheckCircle,
  FaTimesCircle,
  FaExclamationTriangle,
  FaInfoCircle,
  FaTimes,
} from 'react-icons/fa';

interface PopupProps {
  title?: string;
  message: string;
  onClose: () => void;
  onConfirm?: () => void;
  onCancel?: () => void;
  button1Text?: string;
  button2Text?: string;
  type?: 'success' | 'error' | 'warning' | 'info';
}

const getIcon = (type?: string) => {
  switch (type) {
    case 'success':
      return <FaCheckCircle className="text-green-600 w-5 h-5 sm:w-6 sm:h-6" />;
    case 'error':
      return <FaTimesCircle className="text-red-600 w-5 h-5 sm:w-6 sm:h-6" />;
    case 'warning':
      return <FaExclamationTriangle className="text-yellow-500 w-5 h-5 sm:w-6 sm:h-6" />;
    case 'info':
      return <FaInfoCircle className="text-blue-600 w-5 h-5 sm:w-6 sm:h-6" />;
    default:
      return null;
  }
};

const Popup: React.FC<PopupProps> = ({
  message,
  onClose,
  onConfirm,
  onCancel,
  button1Text = 'Yes',
  button2Text = 'No',
  type,
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm pl-3 pr-3 sm:px-4">
      <div className="bg-white rounded-xl p-4 sm:p-6 w-full max-w-sm sm:max-w-md shadow-xl relative">
        {/* Close Button */}
        

        {/* Message */}
        <div className="flex flex-row items-center justify-between text-center sm:text-left gap-3 mb-6">
          <div>{getIcon(type)}</div>
          <p className="text-base sm:text-base text-gray-700 font-bold">
            {message}
          </p>
          <button
          onClick={onClose}
          className=" text-gray-400 hover:text-red-500 text-xl -mt-1 font-bold"
        >
          <FaTimes className="text-xl text-gray-400 hover:text-red-500" />
        </button>
        </div>

        {/* Buttons */}
        <div className="flex flex-row justify-end gap-4">
          {onCancel && (
            <button
              onClick={onCancel}
              className="max-w-max sm:w-auto px-4 py-2 rounded-md border border-gray-300 bg-gray-100 text-gray-700 text-base hover:bg-gray-200 transition"
            >
              {button2Text}
            </button>
          )}
          {onConfirm && (
            <button
              onClick={onConfirm}
              className="max-w-max sm:w-auto px-4 py-2 rounded-md bg-red-600 text-white text-base hover:bg-red-700 transition"
            >
              {button1Text}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Popup;
