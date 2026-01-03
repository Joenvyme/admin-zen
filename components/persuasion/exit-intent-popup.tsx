"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function ExitIntentPopup() {
  const [showPopup, setShowPopup] = useState(false)
  const [hasShown, setHasShown] = useState(false)

  useEffect(() => {
    // Vérifie si on a déjà montré le popup dans cette session
    if (typeof window !== "undefined") {
      const shown = sessionStorage.getItem("exitIntentShown")
      if (shown === "true") {
        setHasShown(true)
        return
      }
    }

    const handleMouseLeave = (e: MouseEvent) => {
      // Détecte quand la souris quitte la fenêtre par le haut
      if (e.clientY <= 0 && !hasShown) {
        setShowPopup(true)
        setHasShown(true)
        if (typeof window !== "undefined") {
          sessionStorage.setItem("exitIntentShown", "true")
        }
      }
    }

    document.addEventListener("mouseleave", handleMouseLeave)
    return () => document.removeEventListener("mouseleave", handleMouseLeave)
  }, [hasShown])

  const scrollToWaitlist = () => {
    const target = document.querySelector("#waitlist")
    if (target) {
      const offset = 80
      const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset
      window.scrollTo({ top: targetPosition, behavior: "smooth" })
    }
    setShowPopup(false)
  }

  return (
    <AnimatePresence>
      {showPopup && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-noir/50 backdrop-blur-sm z-[9998]"
            onClick={() => setShowPopup(false)}
          />
          {/* Popup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-blanc rounded-2xl p-6 sm:p-8 max-w-md w-[90%] z-[9999] shadow-2xl border-2 border-accent-red"
          >
            <button
              onClick={() => setShowPopup(false)}
              className="absolute top-4 right-4 text-gris hover:text-noir transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="text-center">
              <h3 className="font-display text-2xl sm:text-3xl italic text-noir mb-3">
                Attendez ! Ne partez pas encore
              </h3>
              <p className="text-gris mb-4 text-sm sm:text-base">
                <strong className="text-accent-red">428+ personnes</strong> ont déjà réservé leur place à{" "}
                <strong className="text-vert">CHF 5/mois garanti à vie</strong>
              </p>
              <p className="text-gris mb-6 text-sm sm:text-base">
                Testez AdminZen <strong className="text-vert">gratuitement</strong> et économisez jusqu&apos;à{" "}
                <strong className="text-noir">CHF 2&apos;400/an</strong>
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  onClick={scrollToWaitlist}
                  className="bg-accent-red hover:bg-accent-red-hover text-blanc flex-1"
                >
                  Tester gratuitement
                </Button>
                <Button
                  onClick={() => setShowPopup(false)}
                  variant="outline"
                  className="flex-1"
                >
                  Non merci
                </Button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

