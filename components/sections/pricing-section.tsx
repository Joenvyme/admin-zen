"use client"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const features = [
  "Connexion emails sécurisée",
  "Analyse illimitée de vos documents",
  "Alertes avant chaque deadline",
  "Recommandations personnalisées",
  "Lettres de résiliation automatiques",
  "Support prioritaire 🇨🇭",
  "Garantie satisfait ou remboursé 60 jours",
]

export function PricingSection() {
  return (
    <section className="bg-[#2A2A2A] text-blanc py-16 sm:py-20 md:py-24 lg:py-32 px-4 sm:px-6 lg:px-8 overflow-hidden max-w-full">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10 sm:mb-12 md:mb-16 lg:mb-20">
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl italic mb-4 sm:mb-6 md:mb-10 text-blanc">
            Accès anticipé à prix réduit
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gris-clair max-w-2xl mx-auto mt-4 sm:mt-6">
            Rejoignez les 428 early adopters et profitez d&apos;un tarif à vie
          </p>
        </div>
        <div className="max-w-md mx-auto">
          <Card className="bg-blanc text-noir relative overflow-hidden shadow-2xl hover:-translate-y-1 transition-transform duration-300">
            <div className="absolute top-4 sm:top-5 -right-6 sm:-right-8 md:-right-10 bg-vert text-blanc px-6 sm:px-8 md:px-12 py-1.5 sm:py-2 rotate-45 text-[10px] sm:text-xs font-bold uppercase tracking-wide overflow-hidden">
              -40% à vie
            </div>
            <CardHeader className="p-5 sm:p-6">
              <h3 className="font-display text-xl sm:text-2xl italic mb-3 sm:mb-4">Early Access</h3>
              <div className="font-display text-4xl sm:text-5xl md:text-6xl italic text-noir mb-2">
                <span className="text-lg sm:text-xl md:text-2xl text-gris">CHF</span> 14
                <span className="text-2xl sm:text-3xl">.90</span>
              </div>
              <p className="text-gris text-sm sm:text-base">
                par mois · <s className="text-gris">CHF 24.90</s>
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
                <Link href="#waitlist">Réserver ma place</Link>
              </Button>
              <p className="text-center mt-4 text-sm text-gris">
                ⚡ Seulement 50 places restantes à ce tarif
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}

