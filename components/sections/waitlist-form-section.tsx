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
import { UrgencyCounter } from "@/components/persuasion/urgency-counter"
import { ProgressBar } from "@/components/persuasion/progress-bar"
import { usePlaces } from "@/contexts/places-context"
import { useTranslations } from 'next-intl'

export function WaitlistFormSection() {
  const t = useTranslations('waitlist')
  const tErrors = useTranslations('waitlist.errors')
  
  const formSchema = z.object({
    email: z.string().email(tErrors('email')),
    prenom: z.string().min(2, tErrors('prenom')),
    canton: z.string().min(1, tErrors('canton')),
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const { decreasePlaces } = usePlaces()
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
        // Diminue le compteur de places quand quelqu'un s'inscrit
        decreasePlaces(1)
        setSubmitStatus({
          type: "success",
          message: t('success'),
        })
        reset()
      } else {
        throw new Error(result.error || t('error'))
      }
    } catch (error) {
      setSubmitStatus({
        type: "error",
        message: error instanceof Error ? error.message : t('error'),
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="waitlist" className="bg-blanc py-16 sm:py-20 md:py-24 lg:py-32 px-4 sm:px-6 lg:px-8 overflow-hidden max-w-full">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10 sm:mb-12 md:mb-16">
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl italic mb-4 sm:mb-6 md:mb-10 text-noir">
            {t('title')}
          </h2>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gris max-w-2xl mx-auto mb-8 sm:mb-10 md:mb-12 mt-4 sm:mt-6 px-2">
            <strong className="text-noir">{t('subtitlePart1', { count: 428 })}</strong><br className="sm:hidden" />
            <span className="hidden sm:inline"> · </span>
            <strong className="text-vert">{t('freeTrial')}</strong> · <strong className="text-accent-red">{t('price')}</strong><br className="sm:hidden" />
            <span className="hidden sm:inline"> · </span>
            {t('subtitlePart2')}
          </p>
        </div>
        <div className="max-w-md mx-auto">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-3 sm:space-y-4">
            <div>
              <Input
                {...register("email")}
                type="email"
                placeholder={t('email')}
                autoComplete="email"
                className="bg-blanc text-noir border-2 border-gris hover:border-gris/60 focus:border-accent-red focus:ring-2 focus:ring-accent-red/20 h-12 placeholder:text-gris placeholder:opacity-70"
                disabled={isSubmitting}
              />
              {errors.email && (
                <p className="text-sm mt-1 text-gris">{errors.email.message}</p>
              )}
            </div>
            <div>
              <Input
                {...register("prenom")}
                type="text"
                placeholder={t('firstName')}
                autoComplete="given-name"
                className="bg-blanc text-noir border-2 border-gris hover:border-gris/60 focus:border-accent-red focus:ring-2 focus:ring-accent-red/20 h-12 placeholder:text-gris placeholder:opacity-70"
                disabled={isSubmitting}
              />
              {errors.prenom && (
                <p className="text-sm mt-1 text-gris">{errors.prenom.message}</p>
              )}
            </div>
            <div>
              <Select
                value={canton}
                onValueChange={(value) => setValue("canton", value)}
                disabled={isSubmitting}
              >
                <SelectTrigger className="bg-blanc text-noir border-2 border-gris hover:border-gris/60 focus:border-accent-red focus:ring-2 focus:ring-accent-red/20 h-12">
                  <SelectValue placeholder={t('canton')} />
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
                <p className="text-sm mt-1 text-gris">{errors.canton.message}</p>
              )}
            </div>
            <div className="mb-2">
              <ProgressBar />
            </div>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-accent-red text-blanc hover:bg-accent-red/90 text-base sm:text-lg py-5 sm:py-6 min-h-[48px]"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  {t('submitting')}
                </>
              ) : (
                t('submit')
              )}
            </Button>
            {submitStatus.type && (
              <div
                className={`p-4 rounded-md ${
                  submitStatus.type === "success"
                    ? "bg-vert/10 border-2 border-vert text-noir"
                    : "bg-accent-red/10 border-2 border-accent-red text-noir"
                }`}
              >
                <p className="whitespace-pre-line">{submitStatus.message}</p>
              </div>
            )}
            <div className="mt-4 flex justify-center">
              <UrgencyCounter />
            </div>
            <p className="text-sm text-center text-gris mt-4">
              {t('footer')}
            </p>
          </form>
        </div>
      </div>
    </section>
  )
}

