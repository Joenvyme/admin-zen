"use client"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

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
  return (
    <section className="bg-blanc py-16 sm:py-20 md:py-24 lg:py-32 px-4 sm:px-6 lg:px-8 overflow-hidden max-w-full">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10 sm:mb-12 md:mb-16 lg:mb-20">
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl italic mb-4 sm:mb-6 md:mb-10 text-noir">
            Prix de lancement : CHF 5/mois
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gris max-w-2xl mx-auto mt-4 sm:mt-6">
            Rejoignez les 428 early adopters · <strong className="text-noir">Prix garanti à vie</strong> · Seulement 50 places restantes
          </p>
        </div>
        <div className="max-w-md mx-auto">
          <Card className="bg-blanc text-noir relative overflow-hidden shadow-2xl hover:-translate-y-1 transition-transform duration-300">
            <div className="absolute top-4 sm:top-5 -right-8 sm:-right-10 md:-right-12 bg-vert text-blanc px-8 sm:px-10 md:px-14 py-2 sm:py-2.5 rotate-45 text-[9px] sm:text-[10px] font-bold uppercase tracking-tight whitespace-nowrap flex items-center justify-center">
              Prix lancement
            </div>
            <CardHeader className="p-5 sm:p-6">
              <h3 className="font-display text-xl sm:text-2xl italic mb-3 sm:mb-4">Early Access</h3>
              <div className="font-display text-4xl sm:text-5xl md:text-6xl italic text-noir mb-2">
                <span className="text-lg sm:text-xl md:text-2xl text-gris">CHF</span> 5
                <span className="text-2xl sm:text-3xl">.00</span>
              </div>
              <p className="text-gris text-sm sm:text-base">
                par mois · <span className="text-vert font-semibold">Prix garanti à vie</span>
              </p>
              <p className="text-xs sm:text-sm text-gris mt-2">
                Moins qu&apos;un café par jour · ROI 400x
              </p>
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
              <Button
                asChild
                className="w-full bg-accent-red hover:bg-accent-red-hover text-base sm:text-lg py-5 sm:py-6 min-h-[48px]"
              >
                <Link href="#waitlist">Réserver ma place maintenant</Link>
              </Button>
              <p className="text-center mt-4 text-sm font-medium text-accent-red">
                ⚡ Seulement 50 places restantes à CHF 5/mois
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}

