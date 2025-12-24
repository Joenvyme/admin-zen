"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"
import { useEffect, useState } from "react"

export function HeroSection() {
  const [waitlistCount, setWaitlistCount] = useState(428)

  useEffect(() => {
    // Simulate dynamic count updates
    const interval = setInterval(() => {
      if (Math.random() > 0.7) {
        setWaitlistCount((prev) => prev + 1)
      }
    }, 30000)
    return () => clearInterval(interval)
  }, [])

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    const target = document.querySelector(href)
    if (target) {
      const offset = 80
      const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset
      window.scrollTo({ top: targetPosition, behavior: "smooth" })
    }
  }

  return (
    <section className="min-h-screen flex items-center px-4 sm:px-6 lg:px-8 pt-24 pb-24 sm:pb-28 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(214,48,49,0.03),transparent_50%),radial-gradient(circle_at_80%_80%,rgba(0,184,148,0.03),transparent_50%)] pointer-events-none" />
      <div className="max-w-7xl mx-auto w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="max-w-2xl">
          <span className="inline-block text-sm sm:text-base uppercase tracking-wider text-accent-red font-bold mb-10 animate-fade-in-up">
            L&apos;Assistant IA Suisse
          </span>
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-tight mb-10 animate-fade-in-up [animation-delay:200ms]">
            Oubliez l&apos;administratif. <em className="italic text-accent-red">Vivez.</em>
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-gris max-w-2xl mb-20 leading-relaxed font-extralight animate-fade-in-up [animation-delay:400ms]" style={{ fontWeight: 200 }}>
            AdminZen gère vos assurances, abonnements et déclarations d&apos;impôts automatiquement. 
            Économisez jusqu&apos;à CHF 2&apos;400/an sans lever le petit doigt.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mb-12 animate-fade-in-up [animation-delay:600ms]">
            <Button
              asChild
              size="lg"
              className="text-lg px-8 py-6 hover:animate-none"
            >
              <Link href="#waitlist" onClick={(e) => scrollToSection(e, "#waitlist")}>
                Rejoindre la liste d&apos;attente
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="text-lg px-8 py-6"
            >
              <Link href="#comment" onClick={(e) => scrollToSection(e, "#comment")}>
                Comment ça marche ?
              </Link>
            </Button>
          </div>
          <div className="flex items-center gap-4 flex-wrap animate-fade-in-up [animation-delay:800ms]">
            <div className="flex -space-x-3">
              {[
                "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face",
                "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
                "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face",
                "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
              ].map((src, i) => (
                <div
                  key={i}
                  className="w-10 h-10 rounded-full border-2 border-blanc overflow-hidden bg-gris-clair flex-shrink-0 relative"
                >
                  <Image
                    src={src}
                    alt={`Profil ${i + 1}`}
                    width={40}
                    height={40}
                    className="object-cover"
                    loading="lazy"
                    unoptimized
                  />
                </div>
              ))}
            </div>
            <p className="text-gris text-sm sm:text-base">
              <strong className="text-noir font-bold">{waitlistCount}</strong> personnes sur liste d&apos;attente
            </p>
          </div>
          </div>
          
          {/* iPhone Mockup */}
          <div className="hidden lg:flex items-center justify-center relative">
            <div className="relative w-64 h-[500px] animate-fade-in-up [animation-delay:1000ms]">
              {/* iPhone Frame */}
              <div className="absolute inset-0 bg-noir rounded-[3rem] p-2 shadow-2xl">
                <div className="w-full h-full bg-blanc rounded-[2.5rem] overflow-hidden relative">
                  {/* Notch */}
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-6 bg-noir rounded-b-2xl z-10" />
                  
                  {/* Screen Content */}
                  <div className="w-full h-full bg-gradient-to-br from-gris-clair to-blanc p-3 pt-7 overflow-y-auto">
                    {/* Status Bar */}
                    <div className="flex justify-between items-center mb-3 text-[10px] text-gris">
                      <span>9:41</span>
                      <div className="flex gap-0.5">
                        <div className="w-3 h-1.5 border border-gris rounded-sm" />
                        <div className="w-0.5 h-0.5 bg-gris rounded-full" />
                      </div>
                    </div>
                    
                    {/* Header */}
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-7 h-7 bg-accent-red rounded-lg flex items-center justify-center flex-shrink-0">
                        <span className="text-blanc text-[10px] font-bold">AZ</span>
                      </div>
                      <div className="flex-1">
                        <div className="h-1.5 bg-gris-clair rounded w-20 mb-1" />
                        <div className="h-1 bg-gris-clair rounded w-14" />
                      </div>
                      <div className="w-5 h-5 bg-gris-clair rounded-full relative">
                        <div className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-accent-red rounded-full border border-blanc" />
                      </div>
                    </div>
                    
                    {/* Notification Alert - Deadline (Plus jamais de deadline ratée) */}
                    <div className="bg-accent-red/10 border-l-3 border-l-accent-red rounded-lg p-2.5 mb-2">
                      <div className="flex items-start gap-2">
                        <div className="w-4 h-4 bg-accent-red rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-blanc text-[8px] font-bold">!</span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-[9px] font-semibold text-noir mb-0.5 leading-tight">
                            Alerte Deadline
                          </p>
                          <p className="text-[8px] text-gris leading-tight">
                            Assurance maladie: 30 nov. Approbation requise.
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    {/* Notification Alert - Économie détectée (Conseils personnalisés) */}
                    <div className="bg-vert/10 border-l-3 border-l-vert rounded-lg p-2.5 mb-2">
                      <div className="flex items-start gap-2">
                        <div className="w-4 h-4 bg-vert rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-blanc text-[8px]">💰</span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-[9px] font-semibold text-noir mb-0.5 leading-tight">
                            Économie détectée !
                          </p>
                          <p className="text-[8px] text-gris leading-tight">
                            CHF 400/an sur votre abonnement internet.
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    {/* Card - Analyse des données (IA intelligente) */}
                    <div className="bg-blanc rounded-lg p-2.5 shadow-sm mb-2 border border-gris-clair">
                      <div className="flex items-center gap-2 mb-1.5">
                        <div className="w-3 h-3 bg-accent-red/20 rounded-full flex items-center justify-center">
                          <div className="w-1.5 h-1.5 bg-accent-red rounded-full animate-pulse" />
                        </div>
                        <p className="text-[9px] font-semibold text-noir flex-1">
                          Analyse en cours
                        </p>
                      </div>
                      <div className="space-y-1 mb-1.5">
                        <div className="flex items-center justify-between">
                          <p className="text-[8px] text-gris">Emails scannés</p>
                          <p className="text-[8px] font-medium text-noir">47/47</p>
                        </div>
                        <div className="w-full h-1 bg-gris-clair rounded-full overflow-hidden">
                          <div className="h-full bg-vert rounded-full" style={{ width: "100%" }} />
                        </div>
                      </div>
                      <p className="text-[8px] text-gris leading-tight">
                        3 contrats détectés • 12 documents identifiés
                      </p>
                    </div>
                    
                    {/* Card - Déclaration d'impôts (Déclaration en 1 clic) */}
                    <div className="bg-blanc rounded-lg p-2.5 shadow-sm mb-2 border border-gris-clair">
                      <div className="flex items-center justify-between mb-1.5">
                        <p className="text-[9px] font-semibold text-noir">Déclaration d&apos;impôts</p>
                        <span className="text-[8px] bg-vert/20 text-vert px-1.5 py-0.5 rounded font-medium">
                          Prêt
                        </span>
                      </div>
                      <p className="text-[8px] text-gris leading-tight">
                        12 documents rassemblés automatiquement
                      </p>
                    </div>
                    
                    {/* Card - Rappels intelligents */}
                    <div className="bg-blanc rounded-lg p-2.5 shadow-sm mb-2 border border-gris-clair">
                      <div className="flex items-center gap-2 mb-1.5">
                        <div className="w-3 h-3 bg-jaune/20 rounded-full flex items-center justify-center">
                          <span className="text-[7px]">🔔</span>
                        </div>
                        <p className="text-[9px] font-semibold text-noir flex-1">
                          Rappel abonnement
                        </p>
                      </div>
                      <p className="text-[8px] text-gris leading-tight ml-5">
                        Netflix - Résiliation possible dans 5 jours
                      </p>
                    </div>
                    
                    {/* Card - Lettres pré-remplies */}
                    <div className="bg-blanc rounded-lg p-2.5 shadow-sm border border-gris-clair">
                      <div className="flex items-center justify-between mb-1">
                        <p className="text-[9px] font-semibold text-noir">Lettre générée</p>
                        <div className="w-4 h-4 bg-accent-red/20 rounded flex items-center justify-center">
                          <span className="text-[7px] text-accent-red">📄</span>
                        </div>
                      </div>
                      <p className="text-[8px] text-gris leading-tight">
                        Résiliation Swisscom prête à envoyer
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Decorative glow */}
              <div className="absolute -inset-4 bg-gradient-to-r from-accent-red/20 via-vert/20 to-accent-red/20 rounded-[3rem] blur-2xl -z-10 opacity-50" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

