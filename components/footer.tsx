"use client"

import { Link } from '@/i18n/routing'
import Image from "next/image"
import { useTranslations } from 'next-intl'

export function Footer() {
  const t = useTranslations('footer')
  
  return (
    <footer className="bg-gris-clair/30 text-gris py-10 sm:py-12 px-4 sm:px-6 lg:px-8 overflow-hidden max-w-full border-t border-gris-clair/50">
      <div className="max-w-7xl mx-auto text-center">
        <div className="mb-4 sm:mb-6 flex justify-center">
          <Link href="/" className="hover:opacity-80 transition-opacity">
            <Image
              src="/logo.png"
              alt="AdminZen"
              width={100}
              height={33}
              className="h-6 sm:h-8 w-auto mx-auto"
            />
          </Link>
        </div>
        <p className="mb-3 sm:mb-4 text-gris/60 text-sm sm:text-base">{t('copyright')}</p>
        <p className="mb-2 text-xs sm:text-sm">
          <Link href="/blog" className="text-gris/60 hover:text-accent-red transition-colors">
            {t('blog')}
          </Link>
          {" · "}
          <Link href="#privacy" className="text-gris/60 hover:text-accent-red transition-colors">
            {t('privacy')}
          </Link>
          {" · "}
          <Link href="#cgu" className="text-gris/60 hover:text-accent-red transition-colors">
            {t('terms')}
          </Link>
          {" · "}
          <Link href="#contact" className="text-gris/60 hover:text-accent-red transition-colors">
            {t('contact')}
          </Link>
        </p>
        <p className="text-xs sm:text-sm mt-2 text-gris/50">
          {t('hosted')}
        </p>
      </div>
    </footer>
  )
}

