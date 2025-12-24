"use client"

import { useEffect, useRef, useState } from "react"

const steps = [
  {
    number: 1,
    title: "Connectez vos emails (sécurisé)",
    description:
      "En 2 clics, AdminZen accède à vos emails pour détecter automatiquement vos polices d'assurance, contrats d'abonnements et documents fiscaux. Chiffrement de bout en bout, données hébergées en Suisse. Conforme RGPD/LPD.",
  },
  {
    number: 2,
    title: "L'IA analyse et surveille pour vous",
    description:
      "Notre intelligence artificielle scanne le marché suisse 24/7, compare les prix, détecte les opportunités d'économies et vous alerte 10 jours avant chaque deadline importante. Plus jamais de 30 novembre manqué.",
  },
  {
    number: 3,
    title: "Validez en 1 clic (ou on s'en occupe)",
    description:
      "AdminZen vous propose les meilleures options avec calculs précis. Validez en un clic, et on génère même vos lettres de résiliation pré-remplies. Ou optez pour le mode \"pilote automatique\" : on gère tout.",
  },
]

function Step({ step, index }: { step: typeof steps[0]; index: number }) {
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
      { threshold: 0.2 }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [])

  const isEven = index % 2 === 1

  return (
    <div
      ref={ref}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`group relative flex flex-col ${
        isEven ? "md:flex-row-reverse" : "md:flex-row"
      } gap-4 md:gap-6 items-center md:items-start mb-14 md:mb-16 last:mb-0 transition-all duration-300 ${
        isVisible
          ? "opacity-100 translate-x-0"
          : `opacity-0 ${isEven ? "translate-x-8" : "-translate-x-8"}`
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      {/* Connection line (desktop only) - more subtle */}
      {index < steps.length - 1 && (
        <div className={`hidden md:block absolute top-16 left-1/2 w-0.5 h-[calc(100%+2rem)] bg-gradient-to-b from-accent-red/10 via-vert/15 to-accent-red/10 -z-10 transform -translate-x-1/2 transition-opacity duration-300 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`} />
      )}

      {/* Number circle - smaller and more discrete */}
      <div className="relative flex-shrink-0">
        <div
          className={`w-14 h-14 rounded-full bg-accent-red text-blanc flex items-center justify-center font-display text-2xl italic font-semibold shadow-sm transition-all duration-300 ${
            isHovered
              ? "scale-105 shadow-md"
              : "group-hover:scale-102"
          }`}
        >
          {step.number}
        </div>
      </div>

      {/* Content card - more discrete */}
      <div
        className={`flex-1 bg-gris-clair rounded-lg p-5 sm:p-6 shadow-sm transition-all duration-300 ${
          isHovered
            ? "shadow-md scale-[1.01] bg-blanc border border-accent-red/10"
            : "group-hover:shadow-sm group-hover:bg-blanc/30"
        }`}
      >
        <div className="text-center md:text-left">
          <h3 className="text-lg sm:text-xl font-semibold mb-6 text-noir group-hover:text-accent-red transition-colors duration-300">
            {step.title}
          </h3>
          <p className="text-gris text-sm sm:text-base leading-relaxed mt-4">
            {step.description}
          </p>
        </div>
      </div>
    </div>
  )
}

export function HowItWorksSection() {
  return (
    <section id="comment" className="bg-blanc py-20 sm:py-24 lg:py-28 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl italic mb-10">
            Comment AdminZen vous simplifie la vie
          </h2>
          <p className="text-lg sm:text-xl text-gris max-w-2xl mx-auto mt-6">
            3 étapes. Zéro effort de votre part.
          </p>
        </div>
        <div className="max-w-4xl mx-auto">
          {steps.map((step, index) => (
            <Step key={step.number} step={step} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}

