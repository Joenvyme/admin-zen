"use client"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Card } from "@/components/ui/card"
import { useTranslations } from 'next-intl'

export function FAQSection() {
  const t = useTranslations('faq')
  
  const faqs = [
    {
      question: t('items.security.question'),
      answer: t('items.security.answer'),
    },
    {
      question: t('items.savings.question'),
      answer: t('items.savings.answer'),
    },
    {
      question: t('items.difference.question'),
      answer: t('items.difference.answer'),
    },
    {
      question: t('items.complexity.question'),
      answer: t('items.complexity.answer'),
    },
    {
      question: t('items.cantons.question'),
      answer: t('items.cantons.answer'),
    },
    {
      question: t('items.afterWaitlist.question'),
      answer: t('items.afterWaitlist.answer'),
    },
  ]

  return (
    <section className="bg-blanc py-16 sm:py-20 md:py-24 lg:py-32 px-4 sm:px-6 lg:px-8 overflow-hidden max-w-full">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10 sm:mb-12 md:mb-16 lg:mb-20">
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl italic mb-4 sm:mb-6 md:mb-10">
            {t('title')}
          </h2>
        </div>
        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-3 sm:space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-blanc rounded-lg border-2 border-transparent hover:border-accent-red transition-colors"
              >
                <AccordionTrigger className="px-4 sm:px-6 py-3 sm:py-4 font-bold text-left text-sm sm:text-base">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="px-4 sm:px-6 pb-3 sm:pb-4 text-gris leading-relaxed text-sm sm:text-base">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  )
}

