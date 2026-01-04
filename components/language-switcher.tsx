"use client"

import { useLocale } from 'next-intl'
import { usePathname, useRouter } from '@/i18n/routing'
import { routing } from '@/i18n/routing'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const languages = [
  { value: 'fr', label: 'FR' },
  { value: 'de', label: 'DE' },
  { value: 'en', label: 'ENG' },
]

export function LanguageSwitcher() {
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()

  const handleLanguageChange = (newLocale: string) => {
    // Handle dynamic routes by extracting params from current URL
    if (pathname === '/blog/[slug]') {
      const currentPath = window.location.pathname
      const pathSegments = currentPath.split('/').filter(Boolean)
      const localeIndex = routing.locales.indexOf(pathSegments[0] as any)
      const slug = pathSegments[localeIndex >= 0 ? 2 : 1] || pathSegments[1]
      router.push({ pathname: '/blog/[slug]', params: { slug } } as any, { locale: newLocale })
    } else {
      // For static routes, use router.push with locale
      router.push(pathname as any, { locale: newLocale })
    }
  }

  return (
    <Select value={locale} onValueChange={handleLanguageChange}>
      <SelectTrigger className="w-[70px] h-9 bg-blanc/90 backdrop-blur-sm border-2 border-gris-clair hover:border-gris text-sm font-medium">
        <SelectValue />
      </SelectTrigger>
      <SelectContent className="z-[1001]">
        {languages.map((lang) => (
          <SelectItem key={lang.value} value={lang.value}>
            {lang.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

