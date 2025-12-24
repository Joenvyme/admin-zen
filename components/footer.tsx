import Link from "next/link"

export function Footer() {
  return (
    <footer className="bg-[#2A2A2A] text-gris py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto text-center">
        <p className="mb-4">&copy; 2025 AdminZen · Made with ❤️ in Switzerland</p>
        <p className="mb-2">
          <Link href="#privacy" className="text-blanc hover:text-accent-red transition-colors">
            Politique de confidentialité
          </Link>
          {" · "}
          <Link href="#cgu" className="text-blanc hover:text-accent-red transition-colors">
            CGU
          </Link>
          {" · "}
          <Link href="#contact" className="text-blanc hover:text-accent-red transition-colors">
            Contact
          </Link>
        </p>
        <p className="text-sm mt-2">
          Hébergé en Suisse 🇨🇭 · Conforme RGPD/LPD
        </p>
      </div>
    </footer>
  )
}

