"use client"

import { usePlaces } from "@/contexts/places-context"
import { useTranslations } from 'next-intl'

interface UrgencyCounterProps {
  initialPlaces?: number
  minPlaces?: number
  maxPlaces?: number
}

export function UrgencyCounter({ initialPlaces, minPlaces, maxPlaces }: UrgencyCounterProps) {
  const { placesLeft } = usePlaces()
  const t = useTranslations('pricing')

  return (
    <div className="flex items-center gap-2 text-accent-red font-semibold">
      <span className="text-sm sm:text-base">⚡</span>
      <span className="text-sm sm:text-base">
        {t('urgency', { count: placesLeft })}
      </span>
    </div>
  )
}

