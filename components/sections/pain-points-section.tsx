"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { useEffect, useRef, useState } from "react"
import { X, Check } from "lucide-react"
import { cn } from "@/lib/utils"

const painPoints = [
  {
    title: "30 novembre raté. CHF 400 perdus chaque année sur votre assurance maladie.",
  },
  {
    title: "Impôts : procrastination jusqu'à la dernière seconde. 3 piliers, déductions cantonales... trop complexe.",
  },
  {
    title: "Email important noyé dans 500 newsletters. Votre police expire dans 2 semaines et vous ne le savez pas.",
  },
  {
    title: "CHF 150/mois pour des abonnements oubliés. Netflix, Spotify, salle de sport... vous n'utilisez plus.",
  },
  {
    title: "Suva, LAMal, LPP, AVS... vous ne comprenez rien et n'avez pas le temps de chercher.",
  },
  {
    title: "3h perdues le week-end à comparer des assurances sur Comparis. Vous devriez profiter.",
  },
]

const advantages = [
  {
    title: "Alertes 10 jours avant chaque deadline. Le 30 novembre ? On vous rappelle à temps.",
  },
  {
    title: "Impôts en 1 clic. Tous vos documents rassemblés automatiquement. Fini les heures de recherche.",
  },
  {
    title: "Résiliez vos abonnements au bon moment. Rappels automatiques pour ne plus payer l'inutile.",
  },
  {
    title: "CHF 150/mois récupérés automatiquement. Détection des abonnements inutilisés et recommandations.",
  },
  {
    title: "Déductions fiscales détectées automatiquement. 3e pilier, frais pro... selon votre canton.",
  },
  {
    title: "L'IA compare et vous propose les meilleures offres. Économisez sur assurances et abonnements.",
  },
]

function ItemCard({ 
  title, 
  index,
  isAdvantage = false 
}: { 
  title: string
  index: number
  isAdvantage?: boolean
}) {
  const [isVisible, setIsVisible] = useState(false)
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
    <Card
      ref={ref}
      className={cn(
        "group border border-gris-clair hover:border-gris/40 transition-all duration-200",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      )}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          <div className={cn(
            "flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center transition-colors",
            isAdvantage 
              ? "bg-vert/10 group-hover:bg-vert/20" 
              : "bg-accent-red/10 group-hover:bg-accent-red/20"
          )}>
            {isAdvantage ? (
              <Check className="w-5 h-5 text-vert" />
            ) : (
              <X className="w-5 h-5 text-accent-red" />
            )}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-base sm:text-lg font-normal text-noir leading-relaxed">
              {title}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export function PainPointsSection() {
  const [showAdvantages, setShowAdvantages] = useState(false)

  return (
    <section className="bg-blanc py-16 sm:py-20 md:py-24 lg:py-28 px-4 sm:px-6 lg:px-8 overflow-hidden max-w-full">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8 sm:mb-12 md:mb-16">
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl italic mb-4 sm:mb-6 md:mb-10">
            {showAdvantages ? "Vos avantages avec AdminZen" : "Vous reconnaissez ces situations ?"}
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gris max-w-2xl mx-auto mt-4 sm:mt-6 mb-8">
            {showAdvantages 
              ? "Des bénéfices concrets pour simplifier votre quotidien administratif"
              : "La complexité administrative suisse n&apos;est pas une fatalité"
            }
          </p>
          
          {/* Toggle */}
          <div className="flex items-center justify-center gap-3 sm:gap-4 mb-8">
            <Label 
              htmlFor="toggle-avant-apres" 
              className={cn(
                "text-sm sm:text-base font-medium cursor-pointer transition-colors",
                !showAdvantages ? "text-noir" : "text-gris"
              )}
            >
              Avant
            </Label>
            <Switch
              id="toggle-avant-apres"
              checked={showAdvantages}
              onCheckedChange={setShowAdvantages}
            />
            <Label 
              htmlFor="toggle-avant-apres" 
              className={cn(
                "text-sm sm:text-base font-medium cursor-pointer transition-colors",
                showAdvantages ? "text-noir" : "text-gris"
              )}
            >
              Après
            </Label>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 md:gap-6 lg:gap-8">
          {(showAdvantages ? advantages : painPoints).map((item, index) => (
            <ItemCard 
              key={index} 
              {...item} 
              index={index}
              isAdvantage={showAdvantages}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

