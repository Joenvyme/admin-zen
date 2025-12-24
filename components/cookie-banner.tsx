"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"

export function CookieBanner() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const consent = localStorage.getItem("cookieConsent")
    if (!consent) {
      setTimeout(() => setShow(true), 1000)
    }
  }, [])

  const handleAccept = () => {
    localStorage.setItem("cookieConsent", "accepted")
    setShow(false)
    // Initialize analytics here if needed
    if (typeof window !== "undefined" && (window as any).gtag) {
      ;(window as any).gtag("consent", "update", {
        analytics_storage: "granted",
      })
    }
  }

  const handleDecline = () => {
    localStorage.setItem("cookieConsent", "declined")
    setShow(false)
  }

  if (!show) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-[#2A2A2A] text-blanc z-[10000] transform transition-transform duration-300 translate-y-0 shadow-2xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex-1 min-w-0">
            <p className="text-sm sm:text-base">
              🍪 Nous utilisons des cookies pour améliorer votre expérience et analyser le trafic. 
              En continuant, vous acceptez notre utilisation des cookies.{" "}
              <a href="#privacy" className="text-vert underline hover:text-vert/80">
                En savoir plus
              </a>
            </p>
          </div>
          <div className="flex gap-3 flex-shrink-0">
            <Button
              variant="outline"
              size="sm"
              onClick={handleDecline}
              className="border-gris text-blanc hover:bg-gris"
            >
              Refuser
            </Button>
            <Button
              onClick={handleAccept}
              size="sm"
              className="bg-accent-red hover:bg-accent-red-hover"
            >
              Accepter
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

