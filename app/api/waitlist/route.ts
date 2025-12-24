import { NextRequest, NextResponse } from "next/server"
import { z } from "zod"
import type { WaitlistFormData, WaitlistResponse } from "@/types"

const waitlistSchema = z.object({
  email: z.string().email(),
  prenom: z.string().min(2),
  canton: z.string().min(1),
  source: z.string().optional(),
  device: z.string().optional(),
  timestamp: z.string().optional(),
})

export async function POST(request: NextRequest): Promise<NextResponse<WaitlistResponse>> {
  try {
    const body = await request.json()
    
    // Validate data
    const validatedData = waitlistSchema.parse(body)

    // TODO: Save to your database (Supabase, Airtable, Google Sheets, etc.)
    // Example with console.log for now - replace with your backend
    console.log("New waitlist signup:", validatedData)

    // Example: Save to a database
    // await saveToDatabase(validatedData)

    // Example: Send confirmation email
    // await sendConfirmationEmail(validatedData.email, validatedData.prenom)

    return NextResponse.json(
      {
        success: true,
        message: "Inscription réussie !",
      },
      { status: 200 }
    )
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          success: false,
          error: "Données invalides",
        },
        { status: 400 }
      )
    }

    console.error("Waitlist API error:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Une erreur est survenue. Veuillez réessayer plus tard.",
      },
      { status: 500 }
    )
  }
}

// Example function to save to database (implement based on your backend)
// async function saveToDatabase(data: WaitlistFormData) {
//   // Example with Supabase:
//   // const { data, error } = await supabase
//   //   .from('waitlist')
//   //   .insert([data])
//
//   // Example with Airtable:
//   // await airtable('Waitlist').create([{ fields: data }])
//
//   // Example with Google Sheets API:
//   // await sheets.spreadsheets.values.append(...)
// }

// Example function to send confirmation email (implement with Resend, SendGrid, etc.)
// async function sendConfirmationEmail(email: string, prenom: string) {
//   // Example with Resend:
//   // await resend.emails.send({
//   //   from: 'AdminZen <noreply@adminzen.ch>',
//   //   to: email,
//   //   subject: '🎉 Bienvenue sur AdminZen !',
//   //   html: `...`
//   // })
// }

