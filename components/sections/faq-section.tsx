"use client"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Card } from "@/components/ui/card"

const faqs = [
  {
    question: "Mes données sont-elles en sécurité ?",
    answer:
      "Oui. Chiffrement bout en bout (AES-256), données hébergées en Suisse (Zurich), 100% conforme RGPD/LPD. Accès uniquement aux emails administratifs (assurance, facture, contrat), jamais à vos emails personnels.",
  },
  {
    question: "Comment économiser CHF 2'400/an ?",
    answer:
      "Moyenne constatée : CHF 400-800/an sur l'assurance maladie, CHF 600-1'200/an en annulant les abonnements oubliés, CHF 500-1'000 en optimisant les déductions fiscales (3e pilier, frais pro). Même à CHF 1'000 économisés, AdminZen se rembourse 67× par an.",
  },
  {
    question: "Différence avec Comparis ou Bonus.ch ?",
    answer:
      "Comparis = comparaison manuelle. AdminZen = automatique : détection de vos contrats, comparaison continue, alertes au bon moment, lettres de résiliation pré-remplies. De 3h de recherche à 1 clic.",
  },
  {
    question: "Je suis nul en administratif, c'est pour moi ?",
    answer:
      "EXACTEMENT pour vous ! Conçu pour ceux qui détestent l'administratif. Si \"LAMal\", \"LPP\" ou \"déduction 3a\" vous donnent des sueurs froides, on est fait pour s'entendre.",
  },
  {
    question: "Ça marche dans tous les cantons ?",
    answer:
      "Oui ! AdminZen fonctionne dans les 26 cantons suisses. L'IA connaît les spécificités fiscales de chaque canton (taux, déductions, formulaires) et s'adapte automatiquement à votre situation. Que vous soyez à Genève, Zurich, Fribourg ou au Tessin, on a tout ce qu'il faut.",
  },
  {
    question: "Que se passe-t-il après la liste d'attente ?",
    answer:
      "Nous lançons la version bêta en mars 2026 avec les 500 premiers inscrits. Vous recevrez un email avec vos accès, un onboarding personnalisé (15 min), et votre tarif réduit à CHF 14.90/mois sera garanti À VIE (même quand on passera à 24.90). Vous pouvez annuler à tout moment, pas d'engagement.",
  },
]

export function FAQSection() {
  return (
    <section className="bg-blanc py-16 sm:py-20 md:py-24 lg:py-32 px-4 sm:px-6 lg:px-8 overflow-hidden max-w-full">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10 sm:mb-12 md:mb-16 lg:mb-20">
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl italic mb-4 sm:mb-6 md:mb-10">
            Questions fréquentes
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

