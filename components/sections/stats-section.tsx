"use client"

import { useEffect, useRef, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { TrendingUp, Clock, CheckCircle2 } from "lucide-react"
import { cn } from "@/lib/utils"

interface StatItemProps {
  target: number
  prefix?: string
  suffix?: string
  label: string
  icon: React.ReactNode
  iconColor: string
  textGradient: string
  delay: number
}

function StatItem({ target, prefix = "", suffix = "", label, icon, iconColor, textGradient, delay }: StatItemProps) {
  const [count, setCount] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true)
        }
      },
      { threshold: 0.3 }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [isVisible])

  useEffect(() => {
    if (!isVisible) return

    const duration = 2000
    const increment = target / (duration / 16)
    let current = 0

    const timer = setInterval(() => {
      current += increment
      if (current >= target) {
        setCount(target)
        clearInterval(timer)
      } else {
        setCount(Math.floor(current))
      }
    }, 16)

    return () => clearInterval(timer)
  }, [isVisible, target])

  return (
    <Card
      ref={ref}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={cn(
        "group relative bg-blanc border-gris-clair transition-all duration-300 overflow-hidden",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4",
        isHovered
          ? "scale-[1.01] shadow-lg border-gris/20"
          : "hover:shadow-md hover:border-gris/15"
      )}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {/* Subtle gradient overlay on hover */}
      <div
        className={cn(
          "absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none",
          textGradient.includes("vert")
            ? "bg-gradient-to-br from-vert/5 via-transparent to-transparent"
            : textGradient.includes("jaune")
            ? "bg-gradient-to-br from-jaune/5 via-transparent to-transparent"
            : "bg-gradient-to-br from-accent-red/5 via-transparent to-transparent"
        )}
      />

      <CardContent className="p-6 sm:p-8 relative z-10">
        {/* Icon */}
        <div
          className={cn(
            "mb-4 w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-300 opacity-70",
            iconColor,
            isHovered ? "opacity-100 scale-105" : "group-hover:opacity-90"
          )}
        >
          <div className="text-noir">{icon}</div>
        </div>

        {/* Number */}
        <div className="mb-3">
          <span
            className={cn(
              "font-display text-3xl sm:text-4xl md:text-5xl italic font-normal block bg-clip-text text-transparent transition-all duration-500",
              textGradient,
              isHovered && "scale-105"
            )}
          >
            {prefix}
            {count.toLocaleString("fr-CH")}
            {suffix}
          </span>
        </div>

        {/* Label */}
        <p className="text-gris text-xs sm:text-sm font-light uppercase tracking-wider opacity-70">
          {label}
        </p>
      </CardContent>
    </Card>
  )
}

export function StatsSection() {
  const stats = [
    {
      target: 2400,
      prefix: "CHF ",
      label: "Économies/an",
      icon: <TrendingUp className="w-7 h-7" />,
      iconColor: "bg-vert/20",
      textGradient: "bg-gradient-to-r from-vert to-vert/80",
      delay: 0,
    },
    {
      target: 10,
      suffix: "h",
      label: "Temps gagné/mois",
      icon: <Clock className="w-7 h-7" />,
      iconColor: "bg-jaune/20",
      textGradient: "bg-gradient-to-r from-jaune to-jaune/80",
      delay: 150,
    },
    {
      target: 0,
      label: "Deadlines manquées",
      icon: <CheckCircle2 className="w-7 h-7" />,
      iconColor: "bg-accent-red/20",
      textGradient: "bg-gradient-to-r from-accent-red to-accent-red/80",
      delay: 300,
    },
  ]

  return (
    <section className="bg-blanc py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {stats.map((stat, index) => (
            <StatItem key={index} {...stat} />
          ))}
        </div>
      </div>
    </section>
  )
}

