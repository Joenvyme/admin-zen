import Link from "next/link"

export function Footer() {
  return (
    <footer className="bg-blanc text-gris py-12 px-4 sm:px-6 lg:px-8 overflow-hidden max-w-full border-t border-gris-clair">
      <div className="max-w-7xl mx-auto text-center">
        <p className="mb-4 text-noir">&copy; 2025 AdminZen · Made with ❤️ in Switzerland</p>
        <p className="mb-2">
          <Link href="#privacy" className="text-noir hover:text-accent-red transition-colors">
            Politique de confidentialité
          </Link>
          {" · "}
          <Link href="#cgu" className="text-noir hover:text-accent-red transition-colors">
            CGU
          </Link>
          {" · "}
          <Link href="#contact" className="text-noir hover:text-accent-red transition-colors">
            Contact
          </Link>
        </p>
        <p className="text-sm mt-2 text-gris">
          Hébergé en Suisse 🇨🇭 · Conforme RGPD/LPD
        </p>
      </div>
    </footer>
  )
}

