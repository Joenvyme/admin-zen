"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X } from "lucide-react"

const messages = [
  "3 personnes viennent de s'inscrire",
  "Nouvelle inscription depuis Genève",
  "5 places réservées dans la dernière heure",
  "Offre de lancement bientôt terminée",
]

export function ToastNotifications() {
  const [toasts, setToasts] = useState<Array<{ id: number; message: string }>>([])

  useEffect(() => {
    const interval = setInterval(() => {
      // 25% de chance d'afficher un toast toutes les 10-20 secondes
      if (Math.random() > 0.75) {
        const newToast = {
          id: Date.now(),
          message: messages[Math.floor(Math.random() * messages.length)],
        }
        setToasts((prev) => [...prev, newToast])

        // Supprime le toast après 4 secondes
        setTimeout(() => {
          setToasts((prev) => prev.filter((t) => t.id !== newToast.id))
        }, 4000)
      }
    }, 12000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 space-y-2 max-w-sm w-[90%]">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: -20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.9 }}
            className="bg-accent-red text-blanc rounded-lg px-4 py-3 shadow-lg flex items-center justify-between gap-3"
          >
            <span className="text-sm font-medium">{toast.message}</span>
            <button
              onClick={() => setToasts((prev) => prev.filter((t) => t.id !== toast.id))}
              className="flex-shrink-0 hover:opacity-70 transition-opacity"
            >
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}

