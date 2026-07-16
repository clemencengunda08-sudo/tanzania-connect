"use client";

import { 
  createContext, 
  useContext, 
  useState, 
  useCallback, 
  ReactNode,
  useEffect
} from "react";
import { motion, AnimatePresence } from "framer-motion";

type ToastType = "success" | "error" | "warning" | "info";

interface Toast {
  id: string;
  type: ToastType;
  title: string;
  description?: string;
  duration?: number;
}

interface ToastContextValue {
  show: (toast: Omit<Toast, "id">) => void;
  success: (title: string, description?: string) => void;
  error: (title: string, description?: string) => void;
  warning: (title: string, description?: string) => void;
  info: (title: string, description?: string) => void;
  dismiss: (id: string) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

const TOAST_CONFIG = {
  success: {
    icon: "✅",
    color: "from-green-500 to-emerald-600",
    bg: "bg-green-50 dark:bg-green-950/40",
    border: "border-green-200 dark:border-green-800",
    text: "text-green-900 dark:text-green-100",
  },
  error: {
    icon: "❌",
    color: "from-red-500 to-rose-600",
    bg: "bg-red-50 dark:bg-red-950/40",
    border: "border-red-200 dark:border-red-800",
    text: "text-red-900 dark:text-red-100",
  },
  warning: {
    icon: "⚠️",
    color: "from-amber-500 to-orange-600",
    bg: "bg-amber-50 dark:bg-amber-950/40",
    border: "border-amber-200 dark:border-amber-800",
    text: "text-amber-900 dark:text-amber-100",
  },
  info: {
    icon: "ℹ️",
    color: "from-tanzania-500 to-zanzibar-600",
    bg: "bg-tanzania-50 dark:bg-tanzania-950/40",
    border: "border-tanzania-200 dark:border-tanzania-800",
    text: "text-tanzania-900 dark:text-tanzania-100",
  },
};

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const dismiss = useCallback((id: string): void => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const show = useCallback(
    (toast: Omit<Toast, "id">): void => {
      const id = Math.random().toString(36).slice(2);
      const newToast: Toast = { ...toast, id };
      setToasts((prev) => [...prev, newToast]);

      const duration = toast.duration ?? 4000;
      setTimeout(() => dismiss(id), duration);
    },
    [dismiss]
  );

  const success = useCallback(
    (title: string, description?: string) => show({ type: "success", title, description }),
    [show]
  );

  const error = useCallback(
    (title: string, description?: string) => show({ type: "error", title, description, duration: 6000 }),
    [show]
  );

  const warning = useCallback(
    (title: string, description?: string) => show({ type: "warning", title, description }),
    [show]
  );

  const info = useCallback(
    (title: string, description?: string) => show({ type: "info", title, description }),
    [show]
  );

  return (
    <ToastContext.Provider value={{ show, success, error, warning, info, dismiss }}>
      {children}
      {mounted && (
        <div className="fixed top-20 right-4 z-[200] flex flex-col gap-2 max-w-sm w-full pointer-events-none">
          <AnimatePresence>
            {toasts.map((toast) => {
              const config = TOAST_CONFIG[toast.type];
              return (
                <motion.div
                  key={toast.id}
                  layout
                  initial={{ opacity: 0, x: 100, scale: 0.9 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: 100, scale: 0.9 }}
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  className={`pointer-events-auto ${config.bg} ${config.border} border-2 rounded-2xl shadow-2xl backdrop-blur-xl overflow-hidden relative`}
                >
                  <div className={`absolute top-0 left-0 bottom-0 w-1 bg-gradient-to-b ${config.color}`} />
                  <div className="p-4 pl-5">
                    <div className="flex items-start gap-3">
                      <span className="text-2xl shrink-0">{config.icon}</span>
                      <div className="flex-1 min-w-0">
                        <h4 className={`font-bold text-sm ${config.text}`}>{toast.title}</h4>
                        {toast.description && (
                          <p className={`text-xs mt-0.5 opacity-80 ${config.text}`}>{toast.description}</p>
                        )}
                      </div>
                      <button
                        onClick={() => dismiss(toast.id)}
                        className={`${config.text} opacity-50 hover:opacity-100 transition-opacity text-lg leading-none shrink-0`}
                      >
                        ×
                      </button>
                    </div>
                  </div>
                  <motion.div
                    initial={{ scaleX: 1 }}
                    animate={{ scaleX: 0 }}
                    transition={{ duration: (toast.duration ?? 4000) / 1000, ease: "linear" }}
                    className={`absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r ${config.color} origin-left`}
                  />
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      )}
    </ToastContext.Provider>
  );
}

export function useToast(): ToastContextValue {
  const context = useContext(ToastContext);
  if (!context) throw new Error("useToast must be used inside ToastProvider");
  return context;
}
