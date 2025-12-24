"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export function Navigation() {
  const [scrolled, setScrolled] = useState(false)

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
        "fixed top-0 left-0 right-0 z-[1000] px-4 sm:px-8 py-6 flex justify-between items-center transition-all duration-300",
        scrolled
          ? "bg-blanc/98 backdrop-blur-md shadow-lg border-b border-noir/5"
          : "bg-blanc/90 backdrop-blur-sm border-b border-noir/5"
      )}
    >
      <Link
        href="#"
        onClick={(e) => scrollToSection(e, "#")}
        className="font-display text-2xl italic text-noir hover:text-accent-red transition-colors"
      >
        AdminZen
      </Link>
      <Button
        asChild
        variant="outline"
        className="border-noir hover:bg-[#2A2A2A] hover:text-blanc"
      >
        <Link href="#waitlist" onClick={(e) => scrollToSection(e, "#waitlist")}>
          Accès anticipé
        </Link>
      </Button>
    </nav>
  )
}

