import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import type { Metadata } from "next"
import { Instrument_Serif, DM_Sans } from "next/font/google"
import "../globals.css"
import { CookieBanner } from "@/components/cookie-banner"
import { ScrollProgress } from "@/components/scroll-progress"
import { GoogleAnalytics } from "@/components/google-analytics"
import { GoogleTagManager, GoogleTagManagerNoscript } from "@/components/google-tag-manager"
import { ExitIntentPopup } from "@/components/persuasion/exit-intent-popup"
import { SocialProofNotifications } from "@/components/persuasion/social-proof-notifications"
import { PlacesProvider } from "@/contexts/places-context"

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400"],
  style: ["normal", "italic"],
})

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["200", "300", "400", "500", "700"],
})

const metadataByLocale: Record<string, Metadata> = {
  fr: {
    title: "AdminZen - Assistant IA pour votre administratif suisse | Économisez CHF 2'400/an",
    description: "AdminZen gère automatiquement vos assurances, abonnements et impôts en Suisse. Économisez jusqu'à CHF 2'400/an et 10h/mois. Essai gratuit.",
    keywords: "assistant administratif suisse, gestion assurance maladie, changement assurance, IA suisse, fintech suisse",
  },
  de: {
    title: "AdminZen - KI-Assistent für Ihre Schweizer Verwaltung | Sparen Sie CHF 2'400/Jahr",
    description: "AdminZen verwaltet automatisch Ihre Versicherungen, Abonnements und Steuern in der Schweiz. Sparen Sie bis zu CHF 2'400/Jahr und 10h/Monat. Kostenlose Testversion.",
    keywords: "Schweizer Verwaltungsassistent, Krankenversicherungsverwaltung, Versicherungswechsel, Schweizer KI, Schweizer Fintech",
  },
  en: {
    title: "AdminZen - AI Assistant for your Swiss admin | Save CHF 2,400/year",
    description: "AdminZen automatically manages your insurance, subscriptions and taxes in Switzerland. Save up to CHF 2,400/year and 10h/month. Free trial.",
    keywords: "Swiss administrative assistant, health insurance management, insurance change, Swiss AI, Swiss fintech",
  },
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const finalLocale = locale || 'fr'
  const baseMetadata = metadataByLocale[finalLocale] || metadataByLocale.fr

  return {
    ...baseMetadata,
    icons: {
      icon: "/favicon.png",
      apple: "/favicon.png",
    },
    viewport: {
      width: "device-width",
      initialScale: 1,
      maximumScale: 1,
      userScalable: false,
    },
    openGraph: {
      title: baseMetadata.title || "AdminZen",
      description: baseMetadata.description || "",
      url: "https://adminzen.ch",
      siteName: "AdminZen",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: baseMetadata.title || "AdminZen",
      description: baseMetadata.description || "",
    },
  }
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params

  // Ensure that the incoming `locale` is valid
  if (!routing.locales.includes(locale as any)) {
    notFound()
  }

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages()

  return (
    <html lang={locale} className={`${instrumentSerif.variable} ${dmSans.variable}`}>
      <head>
        <GoogleTagManager />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              name: "AdminZen",
              applicationCategory: "FinanceApplication",
              operatingSystem: "Web",
              offers: {
                "@type": "Offer",
                price: "14.90",
                priceCurrency: "CHF",
              },
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: "4.9",
                ratingCount: "428",
              },
            }),
          }}
        />
      </head>
      <body>
        <GoogleTagManagerNoscript />
        <NextIntlClientProvider messages={messages}>
          <PlacesProvider>
            <GoogleAnalytics />
            <ScrollProgress />
            <ExitIntentPopup />
            <SocialProofNotifications />
            {children}
            <CookieBanner />
          </PlacesProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}

