"use client"

import { Card, CardContent } from "@/components/ui/card"
import { useEffect, useRef, useState } from "react"
import {
  Brain,
  Bell,
  Sparkles,
  FileText,
  CheckCircle2,
} from "lucide-react"
import { cn } from "@/lib/utils"

const advantages = [
  {
    icon: FileText,
    title: "Déclaration d'impôts en 1 clic",
    description: "Rassemblez automatiquement tous vos documents nécessaires pour votre déclaration d'impôts. Plus besoin de chercher dans vos emails pendant des heures.",
    color: "text-vert",
    bgColor: "bg-vert/10",
  },
  {
    icon: Bell,
    title: "Rappels intelligents",
    description: "Système de rappel automatique pour résilier vos abonnements au bon moment. Ne payez plus pour des services que vous n'utilisez plus.",
    color: "text-accent-red",
    bgColor: "bg-accent-red/10",
  },
  {
    icon: Sparkles,
    title: "Conseils personnalisés",
    description: "Recommandations pour économiser sur vos assurances et abonnements. L'IA compare les offres et vous propose les meilleures options.",
    color: "text-jaune",
    bgColor: "bg-jaune/10",
  },
  {
    icon: CheckCircle2,
    title: "Plus jamais de deadline ratée",
    description: "Alertes 10 jours avant chaque échéance importante. Le 30 novembre pour changer d'assurance ? On vous rappelle à temps.",
    color: "text-vert",
    bgColor: "bg-vert/10",
  },
  {
    icon: FileText,
    title: "Lettres pré-remplies",
    description: "Génération automatique de vos lettres de résiliation avec tous les détails. Il ne reste plus qu'à signer et envoyer.",
    color: "text-accent-red",
    bgColor: "bg-accent-red/10",
  },
  {
    icon: Brain,
    title: "Optimisation fiscale",
    description: "Détection automatique des déductions possibles (3e pilier, frais professionnels) selon votre canton. Maximisez vos économies.",
    color: "text-jaune",
    bgColor: "bg-jaune/10",
  },
]

function AdvantageCard({
  advantage,
  index,
}: {
  advantage: typeof advantages[0]
  index: number
}) {
  const [isVisible, setIsVisible] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const Icon = advantage.icon

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

  return (
    <Card
      ref={ref}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={cn(
        "group relative bg-blanc border-gris-clair transition-all duration-300 overflow-hidden",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4",
        isHovered
          ? "scale-[1.02] shadow-md border-gris/30"
          : "hover:shadow-sm hover:border-gris/20"
      )}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <CardContent className="p-4 sm:p-5 md:p-6">
        <div className="flex items-start gap-3 sm:gap-4">
          {/* Icon */}
          <div
            className={cn(
              "w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center flex-shrink-0 transition-all duration-300",
              advantage.bgColor,
              isHovered && "scale-110"
            )}
          >
            <Icon className={cn("w-5 h-5 sm:w-6 sm:h-6", advantage.color)} />
          </div>

          {/* Content */}
          <div className="flex-1">
            <h3 className="text-base sm:text-lg font-semibold mb-2 sm:mb-3 md:mb-4 text-noir group-hover:text-accent-red transition-colors duration-300">
              {advantage.title}
            </h3>
            <p className="text-gris text-sm leading-relaxed">
              {advantage.description}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export function FeaturesSection() {
  return (
    <section className="bg-blanc py-16 sm:py-20 md:py-24 lg:py-28 px-4 sm:px-6 lg:px-8 overflow-hidden max-w-full">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8 sm:mb-12 md:mb-16">
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl italic mb-4 sm:mb-6 md:mb-10">
            Vos avantages avec AdminZen
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gris max-w-2xl mx-auto mt-4 sm:mt-6">
            Des bénéfices concrets pour simplifier votre quotidien administratif
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
          {advantages.map((advantage, index) => (
            <AdvantageCard key={index} advantage={advantage} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}

