"use client"

import { useState, useEffect } from "react"
import { usePlaces } from "@/contexts/places-context"
import { useTranslations } from 'next-intl'

interface ProgressBarProps {
  totalPlaces?: number
  placesLeft?: number
}

export function ProgressBar({ totalPlaces: propTotalPlaces, placesLeft: propPlacesLeft }: ProgressBarProps) {
  const { placesLeft: contextPlacesLeft, totalPlaces: contextTotalPlaces } = usePlaces()
  const placesLeft = propPlacesLeft ?? contextPlacesLeft
  const totalPlaces = propTotalPlaces ?? contextTotalPlaces
  const [animatedProgress, setAnimatedProgress] = useState(0)
  const placesTaken = totalPlaces - placesLeft
  const percentage = (placesTaken / totalPlaces) * 100
  const t = useTranslations('progressBar')

  useEffect(() => {
    // Animation de la barre de progression
    const timer = setTimeout(() => {
      setAnimatedProgress(percentage)
    }, 300)

    return () => clearTimeout(timer)
  }, [percentage])

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-2">
        <span className="text-xs sm:text-sm text-gris">
          <strong className="text-vert">{placesTaken}</strong> {t('placesReserved', { count: placesTaken }).replace(`${placesTaken}`, '').trim()}
        </span>
        <span className="text-xs sm:text-sm text-gris">
          <strong className="text-accent-red">{placesLeft}</strong> {t('placesLeft', { count: placesLeft }).replace(`${placesLeft}`, '').trim()}
        </span>
      </div>
      <div className="w-full bg-gris-clair rounded-full h-1.5 sm:h-2 overflow-hidden">
        <div
          className="bg-vert h-full rounded-full transition-all duration-1000 ease-out"
          style={{ width: `${animatedProgress}%` }}
        />
      </div>
      <p className="text-xs text-center text-gris mt-2">
        {t('percentage', { percentage: percentage.toFixed(0) })}
      </p>
    </div>
  )
}

