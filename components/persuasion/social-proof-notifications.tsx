"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { usePlaces } from "@/contexts/places-context"

const fakeNames = [
  "Marie", "Jean", "Sophie", "Pierre", "Laura", "Thomas", "Emma", "Lucas",
  "Camille", "Antoine", "Julie", "Nicolas", "Sarah", "David", "Claire", "Marc"
]

const fakeCities = [
  "Genève", "Zurich", "Lausanne", "Berne", "Bâle", "Lucerne", "Lugano", "Neuchâtel"
]

export function SocialProofNotifications() {
  const [notifications, setNotifications] = useState<Array<{ id: number; name: string; city: string; time: string }>>([])
  const { decreasePlaces } = usePlaces()

  useEffect(() => {
    const interval = setInterval(() => {
      // 30% de chance d'afficher une notification toutes les 8-15 secondes
      if (Math.random() > 0.7) {
        const newNotification = {
          id: Date.now(),
          name: fakeNames[Math.floor(Math.random() * fakeNames.length)],
          city: fakeCities[Math.floor(Math.random() * fakeCities.length)],
          time: Math.floor(Math.random() * 5) + 1 + " min",
        }
        setNotifications((prev) => [...prev.slice(-2), newNotification]) // Garde max 3 notifications

        // Diminue le compteur de places quand une notification apparaît
        decreasePlaces(1)

        // Supprime la notification après 5 secondes
        setTimeout(() => {
          setNotifications((prev) => prev.filter((n) => n.id !== newNotification.id))
        }, 5000)
      }
    }, 8000)

    return () => clearInterval(interval)
  }, [decreasePlaces])

  return (
    <div className="fixed bottom-4 right-4 z-50 space-y-2 max-w-sm">
      <AnimatePresence>
        {notifications.map((notification) => (
          <motion.div
            key={notification.id}
            initial={{ opacity: 0, y: 20, x: 100 }}
            animate={{ opacity: 1, y: 0, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            className="bg-blanc border-2 border-vert shadow-lg rounded-lg p-3 text-sm"
          >
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-vert rounded-full animate-pulse" />
              <span className="text-noir font-medium">
                {notification.name} de {notification.city}
              </span>
              <span className="text-gris text-xs">vient de s'inscrire il y a {notification.time}</span>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}

