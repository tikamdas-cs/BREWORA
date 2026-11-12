import React, { useEffect } from 'react';
import { CheckCircle2, ShoppingBag, X } from 'lucide-react';

export interface ToastMessage {
  id: string;
  title: string;
  message: string;
  actionLabel?: string;
  onAction?: () => void;
}

interface ToastProps {
  toast: ToastMessage | null;
  onDismiss: () => void;
}

export const Toast: React.FC<ToastProps> = ({ toast, onDismiss }) => {
  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => {
      onDismiss();
    }, 3800);
    return () => clearTimeout(timer);
  }, [toast, onDismiss]);

  if (!toast) return null;

  return (
    <div
      className="fixed bottom-6 right-6 z-50 max-w-sm w-full bg-[#1F150F] border border-[#3E291D] rounded-2xl p-4 shadow-2xl text-[#FDFBF7] flex items-start gap-3 animate-in slide-in-from-bottom-5 duration-300"
      role="status"
      aria-live="polite"
    >
      <div className="w-9 h-9 rounded-full bg-[#2E1E15] text-[#D4AF37] border border-[#4A3223] flex items-center justify-center shrink-0">
        <ShoppingBag className="w-4 h-4" />
      </div>

      <div className="flex-1 min-w-0">
        <p className="text-xs font-serif font-bold text-[#FDFBF7] truncate">
          {toast.title}
        </p>
        <p className="text-[11px] text-[#A8988B] mt-0.5 leading-snug">
          {toast.message}
        </p>

        {toast.actionLabel && toast.onAction && (
          <button
            type="button"
            onClick={() => {
              toast.onAction?.();
              onDismiss();
            }}
            className="mt-2 text-[11px] font-bold text-[#D4AF37] hover:underline flex items-center gap-1 cursor-pointer"
          >
            <span>{toast.actionLabel}</span>
            <span>→</span>
          </button>
        )}
      </div>

      <button
        type="button"
        onClick={onDismiss}
        className="text-[#8C7A6D] hover:text-[#FDFBF7] p-1 transition-colors"
        aria-label="Dismiss notification"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};
