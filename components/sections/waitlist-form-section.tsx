"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { CANTONS, type WaitlistFormData } from "@/types"
import { Loader2 } from "lucide-react"

const formSchema = z.object({
  email: z.string().email("Veuillez entrer une adresse email valide"),
  prenom: z.string().min(2, "Le prénom doit contenir au moins 2 caractères"),
  canton: z.string().min(1, "Veuillez sélectionner votre canton"),
})

export function WaitlistFormSection() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error" | null
    message: string
  }>({ type: null, message: "" })

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<WaitlistFormData>({
    resolver: zodResolver(formSchema),
  })

  const canton = watch("canton")

  // Function to detect device type from user agent
  const detectDeviceType = (): string => {
    const ua = navigator.userAgent.toLowerCase()
    if (/tablet|ipad|playbook|silk/i.test(ua)) {
      return "Tablet"
    }
    if (/mobile|iphone|ipod|android|blackberry|opera|mini|windows\sce|palm|smartphone|iemobile/i.test(ua)) {
      return "Mobile"
    }
    return "Desktop"
  }

  const onSubmit = async (data: WaitlistFormData) => {
    setIsSubmitting(true)
    setSubmitStatus({ type: null, message: "" })

    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          timestamp: new Date().toISOString(),
          source: new URLSearchParams(window.location.search).get("utm_source") || "direct",
          device: detectDeviceType(),
        }),
      })

      const result = await response.json()

      if (response.ok && result.success) {
        setSubmitStatus({
          type: "success",
          message:
            "🎉 Félicitations ! Vous êtes sur la liste d'attente.\n\nVous recevrez un email de confirmation dans quelques minutes avec tous les détails.",
        })
        reset()
      } else {
        throw new Error(result.error || "Une erreur est survenue")
      }
    } catch (error) {
      setSubmitStatus({
        type: "error",
        message: error instanceof Error ? error.message : "Une erreur est survenue. Veuillez réessayer.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="waitlist" className="bg-accent-red text-blanc py-16 sm:py-20 md:py-24 lg:py-32 px-4 sm:px-6 lg:px-8 overflow-hidden max-w-full">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10 sm:mb-12 md:mb-16">
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl italic mb-4 sm:mb-6 md:mb-10">
            Prêt à reprendre le contrôle ?
          </h2>
          <p className="text-base sm:text-lg md:text-xl opacity-90 max-w-2xl mx-auto mb-8 sm:mb-10 md:mb-12 mt-4 sm:mt-6">
            Rejoignez les 428 personnes qui ne veulent plus jamais perdre de temps avec l&apos;administratif
          </p>
        </div>
        <div className="max-w-md mx-auto">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-3 sm:space-y-4">
            <div>
              <Input
                {...register("email")}
                type="email"
                placeholder="Votre email"
                className="bg-blanc text-noir border-gris-clair h-12 placeholder:text-gris placeholder:opacity-80"
                disabled={isSubmitting}
              />
              {errors.email && (
                <p className="text-sm mt-1 text-blanc/90">{errors.email.message}</p>
              )}
            </div>
            <div>
              <Input
                {...register("prenom")}
                type="text"
                placeholder="Prénom"
                className="bg-blanc text-noir border-gris-clair h-12 placeholder:text-gris placeholder:opacity-80"
                disabled={isSubmitting}
              />
              {errors.prenom && (
                <p className="text-sm mt-1 text-blanc/90">{errors.prenom.message}</p>
              )}
            </div>
            <div>
              <Select
                value={canton}
                onValueChange={(value) => setValue("canton", value)}
                disabled={isSubmitting}
              >
                <SelectTrigger className="bg-blanc text-noir border-gris-clair h-12">
                  <SelectValue placeholder="Canton de résidence" />
                </SelectTrigger>
                <SelectContent>
                  {CANTONS.map((canton) => (
                    <SelectItem key={canton.value} value={canton.value}>
                      {canton.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.canton && (
                <p className="text-sm mt-1 text-blanc/90">{errors.canton.message}</p>
              )}
            </div>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-blanc text-accent-red hover:bg-[#2A2A2A] hover:text-blanc text-base sm:text-lg py-5 sm:py-6 min-h-[48px]"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Envoi en cours...
                </>
              ) : (
                "🎉 Réserver ma place (50 restantes)"
              )}
            </Button>
            {submitStatus.type && (
              <div
                className={`p-4 rounded-md ${
                  submitStatus.type === "success"
                    ? "bg-vert/20 border-2 border-vert text-blanc"
                    : "bg-accent-red/20 border-2 border-blanc text-blanc"
                }`}
              >
                <p className="whitespace-pre-line">{submitStatus.message}</p>
              </div>
            )}
            <p className="text-sm text-center opacity-90 mt-4">
              Pas de carte bancaire requise · Vous recevrez un email de confirmation
            </p>
          </form>
        </div>
      </div>
    </section>
  )
}

