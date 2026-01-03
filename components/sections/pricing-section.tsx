"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { UrgencyCounter } from "@/components/persuasion/urgency-counter"
import { OfferTimer } from "@/components/persuasion/offer-timer"
import { ProgressBar } from "@/components/persuasion/progress-bar"
import { usePlaces } from "@/contexts/places-context"

const features = [
  "Économisez jusqu'à CHF 2'400/an",
  "Alertes 10 jours avant chaque deadline",
  "Déclaration d'impôts en 1 clic",
  "Lettres de résiliation automatiques",
  "Analyse illimitée de vos documents",
  "Support prioritaire 🇨🇭",
  "Garantie satisfait ou remboursé 60 jours",
]

export function PricingSection() {
  const { placesLeft } = usePlaces()

  return (
    <section className="bg-blanc py-16 sm:py-20 md:py-24 lg:py-32 px-4 sm:px-6 lg:px-8 overflow-hidden max-w-full">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10 sm:mb-12 md:mb-16 lg:mb-20">
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl italic mb-4 sm:mb-6 md:mb-10 text-noir">
            Prix de lancement : CHF 5/mois
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gris max-w-2xl mx-auto mt-4 sm:mt-6">
            Rejoignez les 428 early adopters · <strong className="text-noir">Prix garanti à vie</strong>
          </p>
          <div className="mt-6 max-w-md mx-auto">
            <OfferTimer />
          </div>
        </div>
        <div className="max-w-md mx-auto">
          <Card className="bg-blanc text-noir relative overflow-hidden shadow-2xl hover:-translate-y-1 transition-transform duration-300 border-2 border-gris-clair">
            {/* Badge en haut à droite */}
            <div className="absolute top-4 right-4 z-10">
              <Badge className="bg-vert text-blanc border-0 px-3 py-1 text-xs font-bold">
                Prix lancement -80%
              </Badge>
            </div>
            
            <CardHeader className="p-6 sm:p-8 pb-4">
              <div className="mb-4">
                <CardTitle className="font-display text-xl sm:text-2xl italic text-noir">
                  Early Access
                </CardTitle>
              </div>
              
              {/* Prix principal */}
              <div className="mb-4">
                <div className="flex items-baseline gap-3 mb-2">
                  <div className="flex items-baseline">
                    <span className="text-lg sm:text-xl md:text-2xl text-gris font-medium mr-1">CHF</span>
                    <span className="font-display text-5xl sm:text-6xl md:text-7xl italic text-noir leading-none">5</span>
                    <span className="text-2xl sm:text-3xl md:text-4xl text-gris">.00</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-lg sm:text-xl text-gris line-through">CHF 24.90</span>
                  <span className="text-xs text-gris">par mois</span>
                </div>
                <div className="flex items-center gap-2 flex-wrap">
                  <Badge variant="outline" className="border-vert text-vert bg-vert/5 text-xs">
                    Prix garanti à vie
                  </Badge>
                  <span className="text-xs text-gris">· Moins qu&apos;un café par jour</span>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-5 sm:p-6 pt-0">
              <ul className="space-y-2 sm:space-y-3 mb-4 sm:mb-6">
                {features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-2 sm:gap-3 text-gris text-sm sm:text-base">
                    <span className="text-vert font-bold text-lg sm:text-xl flex-shrink-0">✓</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <div className="mb-4">
                <ProgressBar />
              </div>
              <Button
                asChild
                className="w-full bg-accent-red hover:bg-accent-red-hover text-base sm:text-lg py-5 sm:py-6 min-h-[48px]"
              >
                <Link href="#waitlist">Tester gratuitement</Link>
              </Button>
              <div className="mt-4 flex justify-center">
                <UrgencyCounter />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}

