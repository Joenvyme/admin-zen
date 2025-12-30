"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { useEffect, useRef, useState } from "react"
import { X, Check } from "lucide-react"
import { cn } from "@/lib/utils"
import { motion, AnimatePresence } from "framer-motion"

const painPoints = [
  {
    title: "Impôts : vous procrastinez jusqu'à la dernière seconde.",
  },
  {
    title: "Documents fiscaux éparpillés dans vos emails. Vous perdez des heures à chercher.",
  },
  {
    title: "Déductions fiscales manquées. Vous payez plus d'impôts que nécessaire.",
  },
  {
    title: "Deadline du 30 novembre oubliée. CHF 400 perdus chaque année.",
  },
  {
    title: "Abonnements inutilisés qui continuent de vous coûter.",
  },
  {
    title: "Assurances trop chères. Vous n'avez pas le temps de comparer.",
  },
]

const advantages = [
  {
    title: "Impôts gérés par IA. Vos documents rassemblés automatiquement.",
  },
  {
    title: "Déductions fiscales identifiées automatiquement selon votre canton.",
  },
  {
    title: "Rappels automatiques pour ne jamais rater une deadline.",
  },
  {
    title: "Résiliation automatique de vos abonnements inutilisés.",
  },
  {
    title: "Économies sur vos assurances. L'IA compare et vous propose le meilleur.",
  },
  {
    title: "Tout centralisé. Plus besoin de chercher dans vos emails.",
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
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
    >
      <Card className="group border border-gris-clair hover:border-gris/40 transition-all duration-200">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <motion.div 
              className={cn(
                "flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center transition-colors",
                isAdvantage 
                  ? "bg-vert/10 group-hover:bg-vert/20" 
                  : "bg-accent-red/10 group-hover:bg-accent-red/20"
              )}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.2, delay: index * 0.05 + 0.1 }}
            >
              {isAdvantage ? (
                <Check className="w-5 h-5 text-vert" />
              ) : (
                <X className="w-5 h-5 text-accent-red" />
              )}
            </motion.div>
            <div className="flex-1 min-w-0">
              <p className="text-base sm:text-lg font-normal text-noir leading-relaxed">
                {title}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

export function PainPointsSection() {
  const [showAdvantages, setShowAdvantages] = useState(false)

  return (
    <section className="bg-blanc py-16 sm:py-20 md:py-24 lg:py-28 px-4 sm:px-6 lg:px-8 overflow-hidden max-w-full">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8 sm:mb-12 md:mb-16">
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl italic mb-4 sm:mb-6 md:mb-10">
            AdminZen vous simplifie la vie
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gris max-w-2xl mx-auto mt-4 sm:mt-6 mb-8">
            Découvrez comment AdminZen transforme votre quotidien administratif
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
          <AnimatePresence mode="wait">
            {(showAdvantages ? advantages : painPoints).map((item, index) => (
              <ItemCard 
                key={`${showAdvantages ? 'after' : 'before'}-${index}`}
                {...item} 
                index={index}
                isAdvantage={showAdvantages}
              />
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}

