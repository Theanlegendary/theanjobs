import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, XCircle, Info, AlertTriangle, X } from 'lucide-react';

export type ToastType = 'success' | 'error' | 'info' | 'warning';

interface NotificationToastProps {
  type: ToastType;
  message: string;
  onClose: () => void;
  duration?: number;
}

export function NotificationToast({ 
  type, 
  message, 
  onClose, 
  duration = 5000 
}: NotificationToastProps) {
  useEffect(() => {
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const icons = {
    success: { Icon: CheckCircle, color: 'text-green-500', bg: 'bg-green-50', border: 'border-green-500' },
    error: { Icon: XCircle, color: 'text-red-500', bg: 'bg-red-50', border: 'border-red-500' },
    info: { Icon: Info, color: 'text-blue-500', bg: 'bg-blue-50', border: 'border-blue-500' },
    warning: { Icon: AlertTriangle, color: 'text-yellow-500', bg: 'bg-yellow-50', border: 'border-yellow-500' },
  };

  const { Icon, color, bg, border } = icons[type];

  return (
    <motion.div
      initial={{ opacity: 0, y: -50, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className={`${bg} ${border} border-l-4 p-4 rounded-lg shadow-lg flex items-start gap-3 min-w-[300px] max-w-md`}
    >
      <Icon className={`${color} flex-shrink-0 mt-0.5`} size={20} />
      <p className="text-gray-800 flex-1 text-sm">{message}</p>
      <button
        onClick={onClose}
        className="text-gray-500 hover:text-gray-700 transition-colors flex-shrink-0"
      >
        <X size={16} />
      </button>
    </motion.div>
  );
}

// Toast container component
export function ToastContainer({ children }: { children: React.ReactNode }) {
  return (
    <div className="fixed top-4 right-4 z-[9999] flex flex-col gap-2">
      {children}
    </div>
  );
}
