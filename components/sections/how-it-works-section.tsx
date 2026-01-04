"use client"

import { Card, CardContent } from "@/components/ui/card"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { useTranslations } from 'next-intl'

interface StepData {
  number: number
  title: string
  description: string
}

function Step({ step, index }: { step: StepData; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ 
        duration: 0.5, 
        delay: index * 0.1,
        ease: [0.22, 1, 0.36, 1]
      }}
      className="relative mb-6 last:mb-0"
    >
      <Card className="border border-gris-clair hover:border-gris/40 transition-all duration-200">
        <CardContent className="p-6">
          <motion.div 
            className="flex items-start gap-4"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.1 + 0.2 }}
          >
            <motion.div 
              className="flex-shrink-0 w-8 h-8 rounded-full bg-accent-red text-blanc flex items-center justify-center font-display text-base italic font-semibold"
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ 
                type: "spring", 
                stiffness: 200, 
                damping: 15,
                delay: index * 0.1 + 0.3
              }}
            >
              {step.number}
            </motion.div>
            <div className="flex-1 min-w-0">
              <h3 className="text-base sm:text-lg font-semibold mb-2 text-noir">
                {step.title}
              </h3>
              <p className="text-gris text-sm leading-relaxed">
                {step.description}
              </p>
            </div>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

export function HowItWorksSection() {
  const t = useTranslations('howItWorks')
  
  const steps = [
    {
      number: 1,
      title: t('step1.title'),
      description: t('step1.description'),
    },
    {
      number: 2,
      title: t('step2.title'),
      description: t('step2.description'),
    },
    {
      number: 3,
      title: t('step3.title'),
      description: t('step3.description'),
    },
  ]

  return (
    <section id="comment" className="bg-blanc py-16 sm:py-20 md:py-24 lg:py-28 px-4 sm:px-6 lg:px-8 overflow-hidden max-w-full">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          className="text-center mb-8 sm:mb-12 md:mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.h2 
            className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl italic mb-4 sm:mb-6 md:mb-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {t('title')}
          </motion.h2>
          <motion.p 
            className="text-base sm:text-lg md:text-xl text-gris max-w-2xl mx-auto mt-4 sm:mt-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {t('subtitle')}
          </motion.p>
        </motion.div>
        <div className="max-w-3xl mx-auto">
          {steps.map((step, index) => (
            <Step key={step.number} step={step} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}

