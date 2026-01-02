import type { Metadata } from "next"
import { Instrument_Serif, DM_Sans } from "next/font/google"
import "./globals.css"
import { CookieBanner } from "@/components/cookie-banner"
import { ScrollProgress } from "@/components/scroll-progress"
import { GoogleAnalytics } from "@/components/google-analytics"

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

export const metadata: Metadata = {
  title: "AdminZen - Assistant IA pour votre administratif suisse | Économisez CHF 2'400/an",
  description: "AdminZen gère automatiquement vos assurances, abonnements et impôts en Suisse. Économisez jusqu'à CHF 2'400/an et 10h/mois. Essai gratuit.",
  keywords: "assistant administratif suisse, gestion assurance maladie, changement assurance, IA suisse, fintech suisse",
  icons: {
    icon: "/favicon.png",
    apple: "/favicon.png",
  },
  openGraph: {
    title: "AdminZen - Oubliez l'administratif suisse",
    description: "L'IA qui gère vos assurances, abonnements et impôts. CHF 2'400 économisés/an.",
    url: "https://adminzen.ch",
    siteName: "AdminZen",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AdminZen - Assistant administratif IA suisse",
    description: "Économisez CHF 2'400/an sans effort",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr" className={`${instrumentSerif.variable} ${dmSans.variable}`}>
      <head>
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
        <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:bg-accent-red focus:text-blanc focus:px-4 focus:py-2 focus:rounded-md">
          Aller au contenu principal
        </a>
        <GoogleAnalytics />
        <ScrollProgress />
        {children}
        <CookieBanner />
      </body>
    </html>
  )
}

