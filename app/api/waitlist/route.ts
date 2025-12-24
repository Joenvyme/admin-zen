import { NextRequest, NextResponse } from "next/server"
import { z } from "zod"
import type { WaitlistFormData, WaitlistResponse } from "@/types"

// Dynamic import to avoid build errors if package not installed
let Airtable: any = null
if (typeof window === 'undefined') {
  try {
    Airtable = require('airtable')
  } catch (e) {
    console.warn('Airtable package not installed')
  }
}

const waitlistSchema = z.object({
  email: z.string().email(),
  prenom: z.string().min(2),
  canton: z.string().min(1),
  source: z.string().optional(),
  device: z.string().optional(),
  timestamp: z.string().optional(),
})

// Initialize Airtable
const base = process.env.AIRTABLE_API_KEY && process.env.AIRTABLE_BASE_ID
  ? new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(process.env.AIRTABLE_BASE_ID)
  : null

export async function POST(request: NextRequest): Promise<NextResponse<WaitlistResponse>> {
  try {
    const body = await request.json()
    
    // Validate data
    const validatedData = waitlistSchema.parse(body)

    // Save to Airtable if configured
    if (base) {
      try {
        // Log for debugging
        console.log("🔍 Attempting to save to Airtable...")
        console.log("🔍 Base ID:", process.env.AIRTABLE_BASE_ID)
        console.log("🔍 Table name: Waitlist")
        
        await base('Waitlist').create([
          {
            fields: {
              'Email': validatedData.email,
              'Prénom': validatedData.prenom,
              'Canton': validatedData.canton,
              'Source': validatedData.source || 'direct',
              'Device': validatedData.device || '',
              'Timestamp': validatedData.timestamp || new Date().toISOString(),
            },
          },
        ])
        console.log("✅ Waitlist signup saved to Airtable:", validatedData.email)
      } catch (airtableError: any) {
        console.error("❌ Airtable error:", airtableError)
        console.error("❌ Error details:", {
          error: airtableError.error,
          message: airtableError.message,
          statusCode: airtableError.statusCode,
        })
        // Continue even if Airtable fails, so user still gets success message
      }
    } else {
      console.log("⚠️ Airtable not configured. Missing:", {
        hasApiKey: !!process.env.AIRTABLE_API_KEY,
        hasBaseId: !!process.env.AIRTABLE_BASE_ID,
      })
      console.log("⚠️ Signup logged:", validatedData)
    }

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

