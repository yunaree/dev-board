"use client";

import { useAlertStore } from "@/store/alert.store";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { CheckCircle2, XCircle, Info } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function GlobalAlerts() {
  const { alerts } = useAlertStore();

  const iconMap = {
    success: <CheckCircle2 className="text-green-500" />,
    error: <XCircle className="text-red-500" />,
    info: <Info className="text-blue-500" />,
  };

  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 space-y-2 z-[9999] w-full max-w-md">
      <AnimatePresence>
        {alerts.map((alert) => (
          <motion.div
            key={alert.id}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
          >
            <Alert className="shadow-lg flex items-start gap-2">
              {iconMap[alert.type]}
              <div>
                <AlertTitle>{alert.title}</AlertTitle>
                {alert.description && (
                  <AlertDescription>{alert.description}</AlertDescription>
                )}
              </div>
            </Alert>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
