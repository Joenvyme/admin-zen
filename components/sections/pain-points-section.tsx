"use client"

import { Card, CardContent } from "@/components/ui/card"
import { useEffect, useRef, useState } from "react"

const painPoints = [
  {
    icon: "📅",
    title: "30 novembre encore raté",
    description: "Chaque année, vous ratez la deadline de changement d'assurance maladie et payez CHF 400 de trop. Encore.",
  },
  {
    icon: "😰",
    title: "Déclaration d'impôts : la torture",
    description: "3 piliers, déductions cantonales, formulaires en allemand... Vous procrastinez jusqu'à la dernière seconde.",
  },
  {
    icon: "📧",
    title: "Emails perdus dans le chaos",
    description: "Votre police d'assurance expire dans 2 semaines mais l'email est noyé entre 500 newsletters non lues.",
  },
  {
    icon: "💸",
    title: "Abonnements oubliés",
    description: "Netflix, Spotify, Swisscom, Salt, la salle de sport que vous n'utilisez plus... CHF 150/mois qui partent en fumée.",
  },
  {
    icon: "🤯",
    title: "Trop de paperasse",
    description: "Entre Suva, LAMal, LPP, AVS... vous ne comprenez rien et vous n'avez pas le temps de chercher.",
  },
  {
    icon: "😓",
    title: "Zero temps libre",
    description: "Le week-end, vous devriez profiter. Pas passer 3h à comparer des assurances sur Comparis.",
  },
]

function PainCard({ icon, title, description, index }: typeof painPoints[0] & { index: number }) {
  const [isVisible, setIsVisible] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1, rootMargin: "-100px" }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`group relative bg-blanc border-l-2 border-l-accent-red/60 rounded-lg shadow-sm transition-all duration-300 ease-out overflow-hidden ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      } ${
        isHovered
          ? "-translate-y-1 shadow-md scale-[1.01] border-l-accent-red border-l-[3px]"
          : "hover:shadow-sm"
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      {/* Subtle gradient overlay on hover */}
      <div
        className={`absolute inset-0 bg-gradient-to-br from-accent-red/3 via-transparent to-vert/3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none`}
      />

      <div className="relative p-4 sm:p-5 md:p-6">
        <div className="text-2xl sm:text-3xl md:text-4xl mb-2 sm:mb-3 transform transition-transform duration-300 group-hover:scale-105 opacity-80 group-hover:opacity-100">
          {icon}
        </div>
        <h3 className="text-base sm:text-lg md:text-xl font-semibold mb-2 sm:mb-3 md:mb-4 text-noir group-hover:text-accent-red transition-colors duration-300">
          {title}
        </h3>
        <p className="text-gris leading-relaxed text-sm sm:text-base mt-2 sm:mt-3">
          {description}
        </p>
      </div>
    </div>
  )
}

export function PainPointsSection() {
  return (
    <section className="bg-gris-clair py-16 sm:py-20 md:py-24 lg:py-28 px-4 sm:px-6 lg:px-8 overflow-hidden max-w-full">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8 sm:mb-12 md:mb-16">
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl italic mb-4 sm:mb-6 md:mb-10">
            Vous reconnaissez ces situations ?
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gris max-w-2xl mx-auto mt-4 sm:mt-6">
            La complexité administrative suisse n&apos;est pas une fatalité
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6 lg:gap-8">
          {painPoints.map((point, index) => (
            <PainCard key={index} {...point} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}

