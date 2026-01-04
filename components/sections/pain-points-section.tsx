"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { useEffect, useRef, useState } from "react"
import { X, Check } from "lucide-react"
import { cn } from "@/lib/utils"
import { motion, AnimatePresence } from "framer-motion"
import { useTranslations } from 'next-intl'

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
  const [showAdvantages, setShowAdvantages] = useState(true)
  const t = useTranslations('painPoints')
  
  const painPoints = [
    { title: t('before.taxes') },
    { title: t('before.documents') },
    { title: t('before.deductions') },
    { title: t('before.deadline') },
  ]

  const advantages = [
    { title: t('after.taxes') },
    { title: t('after.deductions') },
    { title: t('after.reminders') },
    { title: t('after.documents') },
  ]

  return (
    <section className="bg-blanc py-16 sm:py-20 md:py-24 lg:py-28 px-4 sm:px-6 lg:px-8 overflow-hidden max-w-full">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8 sm:mb-12 md:mb-16">
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl italic mb-4 sm:mb-6 md:mb-10">
            {t('title')}
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gris max-w-2xl mx-auto mt-4 sm:mt-6 mb-8">
            {t('subtitle')}
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
              {t('beforeLabel')}
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
              {t('afterLabel')}
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

