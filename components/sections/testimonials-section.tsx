"use client"

import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"
import { useEffect, useRef, useState } from "react"
import { Star } from "lucide-react"

const testimonials = [
  {
    name: "Sophie M.",
    location: "Genève",
    text: "CHF 800 économisés cette année. Alertée 10 jours avant la deadline. Inestimable !",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&crop=face",
    rating: 5,
  },
  {
    name: "Marc L.",
    location: "Zurich",
    text: "Fini le stress des impôts. L'IA détecte toutes les déductions. Je recommande à 100%.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face",
    rating: 5,
  },
  {
    name: "Julie B.",
    location: "Lausanne",
    text: "3 abonnements oubliés annulés. CHF 45/mois récupérés automatiquement.",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&crop=face",
    rating: 5,
  },
  {
    name: "Thomas R.",
    location: "Berne",
    text: "Enfin un outil qui comprend l'administratif suisse. Ça change la vie !",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop&crop=face",
    rating: 5,
  },
  {
    name: "Camille D.",
    location: "Bâle",
    text: "Mode pilote automatique : je n'ai plus à penser à rien. Tout est géré.",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&h=80&fit=crop&crop=face",
    rating: 5,
  },
  {
    name: "David K.",
    location: "Fribourg",
    text: "CHF 1'200 économisés sur mon 3e pilier. L'IA a trouvé des déductions inconnues.",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=80&h=80&fit=crop&crop=face",
    rating: 5,
  },
]

function TestimonialCard({
  testimonial,
  index,
}: {
  testimonial: typeof testimonials[0]
  index: number
}) {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.2 }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <Card
      ref={ref}
      className={`bg-blanc border-gris-clair transition-all duration-300 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      } hover:border-gris/30 hover:shadow-lg`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <CardContent className="p-4 sm:p-5 md:p-6">
        {/* Rating */}
        <div className="flex gap-1 mb-3 sm:mb-4">
          {[...Array(testimonial.rating)].map((_, i) => (
            <Star
              key={i}
              className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-jaune text-jaune"
            />
          ))}
        </div>

        {/* Text */}
        <p className="text-gris text-sm sm:text-base leading-relaxed mb-3 sm:mb-4 font-light">
          &quot;{testimonial.text}&quot;
        </p>

        {/* Author */}
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full overflow-hidden bg-gris-clair flex-shrink-0 relative">
            <Image
              src={testimonial.avatar}
              alt={testimonial.name}
              width={40}
              height={40}
              className="object-cover"
              loading="lazy"
              unoptimized
            />
          </div>
          <div>
            <p className="text-noir text-xs sm:text-sm font-medium">{testimonial.name}</p>
            <p className="text-gris text-[10px] sm:text-xs">{testimonial.location}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export function TestimonialsSection() {
  return (
    <section className="bg-blanc py-16 sm:py-20 md:py-24 lg:py-28 px-4 sm:px-6 lg:px-8 overflow-hidden max-w-full">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8 sm:mb-12 md:mb-16">
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl italic mb-4 sm:mb-6 md:mb-10 text-noir">
            Ils économisent déjà des milliers
          </h2>
          <p className="text-gris text-sm sm:text-base md:text-lg max-w-2xl mx-auto mt-4 sm:mt-6">
            Découvrez comment nos utilisateurs ont simplifié leur vie administrative
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={index} testimonial={testimonial} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}

