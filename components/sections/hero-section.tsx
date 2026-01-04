"use client"

import { Button } from "@/components/ui/button"
import LinkStandard from "next/link"
import Image from "next/image"
import { useEffect, useState } from "react"
import { Check, Loader2, ArrowUp, Mic, Mail, Folder, Globe } from "lucide-react"
import { useTranslations } from 'next-intl'

export function HeroSection() {
  const [waitlistCount, setWaitlistCount] = useState(428)
  const t = useTranslations('hero')
  const tChat = useTranslations('chat')

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
    <section className="min-h-screen flex items-center px-4 sm:px-6 lg:pl-8 lg:pr-0 pt-20 sm:pt-24 pb-16 sm:pb-24 lg:pb-28 relative bg-blanc overflow-x-clip">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(214,48,49,0.02),transparent_50%),radial-gradient(circle_at_80%_80%,rgba(0,184,148,0.02),transparent_50%)] pointer-events-none" />
      <div className="max-w-7xl mx-auto w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-0 items-center relative">
          <div className="max-w-2xl lg:pr-8 relative z-20">
          <span className="inline-block text-xs sm:text-sm md:text-base uppercase tracking-wider text-accent-red font-bold mb-4 sm:mb-6 md:mb-10 animate-fade-in-up">
            {t('badge')}
          </span>
          <h1 className="font-display text-5xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-[1.1] sm:leading-tight mb-4 sm:mb-6 md:mb-10 animate-fade-in-up [animation-delay:200ms]">
            {t('title')} <em className="italic text-accent-red">{t('titleHighlight')}</em>
          </h1>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gris max-w-2xl mb-8 sm:mb-12 md:mb-16 lg:mb-20 leading-relaxed font-extralight animate-fade-in-up [animation-delay:400ms]" style={{ fontWeight: 200 }}>
            {t('description')} <strong className="font-medium text-noir">{t('savings')}</strong> {t('descriptionSuffix')}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-8 sm:mb-12 animate-fade-in-up [animation-delay:600ms]">
            <Button
              asChild
              size="lg"
              className="text-base sm:text-lg px-6 sm:px-8 py-5 sm:py-6 hover:animate-none w-full sm:w-auto min-h-[48px]"
            >
              <LinkStandard href="#waitlist" onClick={(e) => scrollToSection(e, "#waitlist")}>
                {t('ctaPrimary')}
              </LinkStandard>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="text-base sm:text-lg px-6 sm:px-8 py-5 sm:py-6 w-full sm:w-auto min-h-[48px]"
            >
              <LinkStandard href="#comment" onClick={(e) => scrollToSection(e, "#comment")}>
                {t('ctaSecondary')}
              </LinkStandard>
            </Button>
          </div>
          <div className="flex items-center gap-3 sm:gap-4 flex-wrap animate-fade-in-up [animation-delay:800ms]">
            <div className="flex -space-x-2 sm:-space-x-3">
              {[
                "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face",
                "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
                "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face",
                "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
              ].map((src, i) => (
                <div
                  key={i}
                  className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 border-blanc overflow-hidden bg-gris-clair flex-shrink-0 relative"
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
            <p className="text-gris text-xs sm:text-sm md:text-base">
              <strong className="text-noir font-bold">{waitlistCount}+</strong> {t('socialProof', { count: waitlistCount }).replace(`${waitlistCount}+`, '').trim()}
            </p>
          </div>
          </div>
        </div>
      </div>
      
      {/* Tablet Mockup - Outside container to touch right edge */}
      <div className="hidden 2xl:block absolute right-0 top-1/2 -translate-y-1/2 z-10">
        <div className="relative w-[675px] h-[600px] animate-fade-in-up [animation-delay:1000ms] pb-12">
          {/* Tablet Frame */}
          <div className="absolute inset-0 bg-noir rounded-l-[2rem] pl-1.5 pt-1.5 pb-1.5 pr-0 shadow-2xl" style={{ borderTopRightRadius: 0, borderBottomRightRadius: 0 }}>
            <div className="w-full h-full bg-blanc rounded-l-[1.75rem] overflow-hidden relative" style={{ borderTopRightRadius: 0, borderBottomRightRadius: 0 }}>
              {/* Screen Content - Desktop Interface */}
              <div className="w-full h-full bg-blanc p-5 overflow-hidden flex flex-col relative z-0">
                {/* Header */}
                <div className="flex items-center justify-between mb-5 pb-4 border-b border-gris-clair">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-gris-clair flex-shrink-0">
                      <Image
                        src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face"
                        alt="Profil"
                        width={40}
                        height={40}
                        className="object-cover w-full h-full"
                        loading="lazy"
                        unoptimized
                      />
                    </div>
                    <div>
                      <div className="h-2.5 bg-gris-clair rounded w-32 mb-1.5" />
                      <div className="h-2 bg-gris-clair rounded w-20" />
                    </div>
                  </div>
                </div>
                
                {/* Chat IA - Full Width */}
                <div className="flex-1 flex flex-col overflow-hidden min-h-0">
                  {/* Chat Messages */}
                  <div className="flex-1 overflow-y-auto pr-2 bg-gris-clair/10 min-h-0">
                    {/* Welcome Message - Message reçu (IA) */}
                    <div className="mb-6">
                      <h3 className="text-lg font-semibold text-noir mb-1">
                        {tChat('greeting')}
                      </h3>
                      <p className="text-sm text-gris leading-relaxed">
                        {tChat('help')}
                      </p>
                    </div>
                    
                    {/* Message envoyé (Utilisateur) - Exemple */}
                    <div className="mb-6 flex justify-end">
                      <div className="bg-accent-red/10 rounded-lg px-3 py-2 max-w-[85%]">
                        <p className="text-sm text-noir leading-relaxed">
                          {tChat('userMessage')}
                        </p>
                      </div>
                    </div>
                    
                    {/* Thinking Mode - Plusieurs étapes */}
                    <div className="mb-6">
                      <div className="space-y-2.5 relative pl-6">
                        {/* Ligne de connexion verticale subtile */}
                        <div className="absolute left-[7px] top-2 bottom-2 w-px bg-gradient-to-b from-vert via-vert via-vert to-gris-clair"></div>
                        
                        {/* Étape 1 - Terminée */}
                        <div className="relative flex items-start gap-3">
                          <div className="flex-shrink-0 mt-0.5">
                            <Check className="w-4 h-4 text-vert stroke-[2]" />
                          </div>
                          <div className="flex-1 pt-0.5">
                            <p className="text-xs text-vert leading-relaxed">{tChat('thinking.analyzing')}</p>
                          </div>
                        </div>
                        
                        {/* Étape 2 - En cours */}
                        <div className="relative flex items-start gap-3">
                          <div className="flex-shrink-0 mt-0.5">
                            <Loader2 className="w-4 h-4 text-vert stroke-[2] animate-spin" />
                          </div>
                          <div className="flex-1 pt-0.5">
                            <div className="flex items-center gap-2">
                              <p className="text-xs text-noir leading-relaxed font-medium">{tChat('thinking.identifying')}</p>
                              <div className="h-4 px-1.5 rounded-full bg-gris flex items-center gap-1 flex-shrink-0">
                                <Globe className="w-2.5 h-2.5 text-blanc" />
                                <span className="text-[8px] text-blanc font-medium">Web</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        {/* Étape 3 - Recherche dans les emails */}
                        <div className="relative flex items-start gap-3">
                          <div className="flex-shrink-0 mt-0.5">
                            <Loader2 className="w-4 h-4 text-vert stroke-[2] animate-spin" />
                          </div>
                          <div className="flex-1 pt-0.5">
                            <div className="flex items-center gap-2">
                              <p className="text-xs text-noir leading-relaxed font-medium">{tChat('thinking.searching')}</p>
                              <div className="h-4 px-1.5 rounded-full bg-[#EA4335] flex items-center gap-1 flex-shrink-0">
                                <Mail className="w-2.5 h-2.5 text-blanc" />
                                <span className="text-[8px] text-blanc font-medium">Gmail</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        {/* Étape 4 - À venir */}
                        <div className="relative flex items-start gap-3">
                          <div className="flex-shrink-0 mt-0.5">
                            <Loader2 className="w-4 h-4 text-gris stroke-[2]" />
                          </div>
                          <div className="flex-1 pt-0.5">
                            <p className="text-xs text-gris/70 leading-relaxed">{tChat('thinking.calculating')}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                  </div>
                  
                  {/* Input Field - Section distincte avec fond plus foncé */}
                  <div className="pt-2 px-4 pb-4 bg-zinc-100 rounded-2xl">
                    {/* Input Row */}
                    <div className="mb-2">
                      <div className="relative">
                        <div className="absolute left-2 top-1/2 -translate-y-1/2 pointer-events-none">
                          <svg className="w-4 h-4 text-gris" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                          </svg>
                        </div>
                        <input
                          type="text"
                          placeholder={tChat('placeholder')}
                          className="w-full bg-zinc-100 rounded-lg pl-8 pr-4 py-3 text-sm text-noir placeholder:text-gris focus:outline-none focus:bg-zinc-100 transition-colors"
                        />
                      </div>
                    </div>
                    
                    {/* Apps Icons and Action Buttons Row */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <button className="h-6 px-2 rounded-full bg-[#EA4335] flex items-center gap-1.5 hover:opacity-80 transition-opacity flex-shrink-0">
                          <Mail className="w-3 h-3 text-blanc" />
                          <span className="text-[10px] text-blanc font-medium">Gmail</span>
                        </button>
                        <button className="h-6 px-2 rounded-full bg-[#0078D4] flex items-center gap-1.5 hover:opacity-80 transition-opacity flex-shrink-0">
                          <Mail className="w-3 h-3 text-blanc" />
                          <span className="text-[10px] text-blanc font-medium">Outlook</span>
                        </button>
                        <button className="h-6 px-2 rounded-full bg-[#4285F4] flex items-center gap-1.5 hover:opacity-80 transition-opacity flex-shrink-0">
                          <Folder className="w-3 h-3 text-blanc" />
                          <span className="text-[10px] text-blanc font-medium">Drive</span>
                        </button>
                        <button className="w-8 h-8 rounded-full bg-gris-clair flex items-center justify-center hover:bg-gris-clair/80 transition-colors flex-shrink-0 border border-gris-clair">
                          <svg className="w-3.5 h-3.5 text-gris" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                          </svg>
                        </button>
                      </div>
                      <div className="flex items-center gap-2">
                        <button className="w-8 h-8 flex items-center justify-center text-gris hover:text-noir transition-colors flex-shrink-0">
                          <Mic className="w-4 h-4" />
                        </button>
                        <button className="w-8 h-8 bg-gris hover:bg-gris/80 rounded-full flex items-center justify-center text-blanc transition-colors flex-shrink-0">
                          <ArrowUp className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Decorative glow */}
          <div className="absolute -inset-4 sm:-inset-6 md:-inset-8 bg-gradient-to-r from-accent-red/20 via-vert/20 to-accent-red/20 rounded-[2rem] blur-2xl -z-10 opacity-50" style={{ bottom: '-2rem' }} />
        </div>
      </div>
    </section>
  )
}

