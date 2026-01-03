"use client"

import { useState, useEffect, useMemo } from "react"

interface OfferTimerProps {
  endDate?: Date
}

export function OfferTimer({ endDate }: OfferTimerProps) {
  // Par défaut, l'offre expire dans 7 jours - utilise useMemo pour éviter la recréation
  const defaultEndDate = useMemo(() => {
    return endDate || new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
  }, [endDate])

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })
  const [expired, setExpired] = useState(false)

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date().getTime()
      const end = defaultEndDate.getTime()
      const difference = end - now

      if (difference <= 0) {
        setExpired(true)
        return { days: 0, hours: 0, minutes: 0, seconds: 0 }
      }

      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((difference % (1000 * 60)) / 1000),
      }
    }

    // Calcul initial
    const initial = calculateTimeLeft()
    setTimeLeft(initial)
    if (initial.days === 0 && initial.hours === 0 && initial.minutes === 0 && initial.seconds === 0) {
      setExpired(true)
      return
    }

    // Mise à jour toutes les secondes
    const interval = setInterval(() => {
      const newTime = calculateTimeLeft()
      setTimeLeft(newTime)
      if (newTime.days === 0 && newTime.hours === 0 && newTime.minutes === 0 && newTime.seconds === 0) {
        setExpired(true)
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [defaultEndDate])

  if (expired) {
    return null
  }

  return (
    <div className="bg-accent-red/10 border-2 border-accent-red rounded-lg p-4 text-center">
      <p className="text-xs sm:text-sm text-gris mb-2 uppercase tracking-wide font-semibold">
        ⏰ Offre de lancement se termine dans
      </p>
      <div className="flex items-center justify-center gap-2 sm:gap-3">
        <div className="bg-blanc rounded-lg px-3 py-2 min-w-[50px]">
          <div className="text-2xl sm:text-3xl font-bold text-accent-red">{timeLeft.days}</div>
          <div className="text-[10px] text-gris uppercase">jours</div>
        </div>
        <span className="text-accent-red text-xl">:</span>
        <div className="bg-blanc rounded-lg px-3 py-2 min-w-[50px]">
          <div className="text-2xl sm:text-3xl font-bold text-accent-red">{String(timeLeft.hours).padStart(2, "0")}</div>
          <div className="text-[10px] text-gris uppercase">heures</div>
        </div>
        <span className="text-accent-red text-xl">:</span>
        <div className="bg-blanc rounded-lg px-3 py-2 min-w-[50px]">
          <div className="text-2xl sm:text-3xl font-bold text-accent-red">{String(timeLeft.minutes).padStart(2, "0")}</div>
          <div className="text-[10px] text-gris uppercase">min</div>
        </div>
        <span className="text-accent-red text-xl">:</span>
        <div className="bg-blanc rounded-lg px-3 py-2 min-w-[50px]">
          <div className="text-2xl sm:text-3xl font-bold text-accent-red">{String(timeLeft.seconds).padStart(2, "0")}</div>
          <div className="text-[10px] text-gris uppercase">sec</div>
        </div>
      </div>
    </div>
  )
}

