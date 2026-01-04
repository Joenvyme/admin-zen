"use client"

import { useEffect, useState } from "react"
import { useTranslations } from 'next-intl'
import { Link, usePathname } from '@/i18n/routing'
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { LanguageSwitcher } from "./language-switcher"

export function Navigation() {
  const [scrolled, setScrolled] = useState(false)
  const t = useTranslations('navigation')
  const tCommon = useTranslations('common')
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href === "#") {
      e.preventDefault()
      window.scrollTo({ top: 0, behavior: "smooth" })
      return
    }
    e.preventDefault()
    const target = document.querySelector(href)
    if (target) {
      const offset = 80
      const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset
      window.scrollTo({ top: targetPosition, behavior: "smooth" })
    }
  }

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-[1000] px-3 sm:px-6 lg:px-8 py-3 sm:py-4 lg:py-6 flex justify-between items-center transition-all duration-300",
        scrolled
          ? "bg-blanc/98 backdrop-blur-md shadow-lg border-b border-noir/5"
          : "bg-blanc/90 backdrop-blur-sm border-b border-noir/5"
      )}
    >
      <Link
        href="/"
        className="flex items-center gap-2 hover:opacity-80 transition-opacity"
      >
        <Image
          src="/logo.png"
          alt="AdminZen"
          width={120}
          height={40}
          className="h-6 sm:h-8 w-auto"
          priority
        />
      </Link>
      <div className="flex items-center gap-3 sm:gap-4">
        <Link
          href="/blog"
          className="text-gris hover:text-accent-red transition-colors text-sm sm:text-base font-medium hidden sm:inline"
        >
          {t('blog')}
        </Link>
        <LanguageSwitcher />
        <Button
          asChild
          variant="outline"
          size="sm"
          className="border-noir hover:bg-[#2A2A2A] hover:text-blanc text-xs sm:text-sm px-3 sm:px-4 py-2 sm:py-2.5"
        >
          <Link href="#waitlist" onClick={(e) => scrollToSection(e, "#waitlist")}>
            <span className="hidden sm:inline">{t('testFree')}</span>
            <span className="sm:hidden">{tCommon('test')}</span>
          </Link>
        </Button>
      </div>
    </nav>
  )
}

