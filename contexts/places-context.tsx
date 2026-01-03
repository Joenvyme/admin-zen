"use client"

import { createContext, useContext, useState, useEffect, useCallback } from "react"

interface PlacesContextType {
  placesLeft: number
  totalPlaces: number
  decreasePlaces: (amount?: number) => void
}

const PlacesContext = createContext<PlacesContextType | undefined>(undefined)

const TOTAL_PLACES = 50
const MIN_PLACES = 5
const INITIAL_PLACES = 35

export function PlacesProvider({ children }: { children: React.ReactNode }) {
  const [placesLeft, setPlacesLeft] = useState(INITIAL_PLACES)

  const decreasePlaces = useCallback((amount: number = 1) => {
    setPlacesLeft((prev) => Math.max(MIN_PLACES, prev - amount))
  }, [])

  // Diminution aléatoire périodique (moins fréquente maintenant qu'on a les notifications)
  useEffect(() => {
    const interval = setInterval(() => {
      // 5% de chance de diminuer toutes les 20 secondes (pour simuler des inscriptions naturelles)
      if (Math.random() > 0.95 && placesLeft > MIN_PLACES) {
        decreasePlaces(1)
      }
    }, 20000)

    return () => clearInterval(interval)
  }, [placesLeft, decreasePlaces])

  return (
    <PlacesContext.Provider value={{ placesLeft, totalPlaces: TOTAL_PLACES, decreasePlaces }}>
      {children}
    </PlacesContext.Provider>
  )
}

export function usePlaces() {
  const context = useContext(PlacesContext)
  if (context === undefined) {
    throw new Error("usePlaces must be used within a PlacesProvider")
  }
  return context
}

