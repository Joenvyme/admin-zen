import Link from "next/link"

export function Footer() {
  return (
    <footer className="bg-gris-clair/30 text-gris py-10 sm:py-12 px-4 sm:px-6 lg:px-8 overflow-hidden max-w-full border-t border-gris-clair/50">
      <div className="max-w-7xl mx-auto text-center">
        <p className="mb-3 sm:mb-4 text-gris/60 text-sm sm:text-base">&copy; 2025 AdminZen · Made with ❤️ in Switzerland</p>
        <p className="mb-2 text-xs sm:text-sm">
          <Link href="#privacy" className="text-gris/60 hover:text-accent-red transition-colors">
            Politique de confidentialité
          </Link>
          {" · "}
          <Link href="#cgu" className="text-gris/60 hover:text-accent-red transition-colors">
            CGU
          </Link>
          {" · "}
          <Link href="#contact" className="text-gris/60 hover:text-accent-red transition-colors">
            Contact
          </Link>
        </p>
        <p className="text-xs sm:text-sm mt-2 text-gris/50">
          Hébergé en Suisse 🇨🇭 · Conforme RGPD/LPD
        </p>
      </div>
    </footer>
  )
}

