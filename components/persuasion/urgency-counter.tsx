"use client"

import { usePlaces } from "@/contexts/places-context"

interface UrgencyCounterProps {
  initialPlaces?: number
  minPlaces?: number
  maxPlaces?: number
}

export function UrgencyCounter({ initialPlaces, minPlaces, maxPlaces }: UrgencyCounterProps) {
  const { placesLeft } = usePlaces()

  return (
    <div className="flex items-center gap-2 text-accent-red font-semibold">
      <span className="text-sm sm:text-base">⚡</span>
      <span className="text-sm sm:text-base">
        Seulement <strong className="text-lg sm:text-xl">{placesLeft}</strong> places restantes
      </span>
    </div>
  )
}

