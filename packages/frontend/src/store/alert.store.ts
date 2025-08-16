import { create } from "zustand";

type AlertType = "success" | "error" | "info";

interface Alert {
  id: number;
  type: AlertType;
  title: string;
  description?: string;
}

interface AlertStore {
  alerts: Alert[];
  showAlert: (type: AlertType, title: string, description?: string) => void;
  removeAlert: (id: number) => void;
}

let idCounter = 0;

export const useAlertStore = create<AlertStore>((set) => ({
  alerts: [],
  showAlert: (type, title, description) => {
    const id = ++idCounter;
    set((state) => ({
      alerts: [...state.alerts, { id, type, title, description }],
    }));

    // Автоматично ховаємо через 3 секунди
    setTimeout(() => {
      set((state) => ({
        alerts: state.alerts.filter((a) => a.id !== id),
      }));
    }, 3000);
  },
  removeAlert: (id) =>
    set((state) => ({
      alerts: state.alerts.filter((a) => a.id !== id),
    })),
}));
