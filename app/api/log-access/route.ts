import { NextRequest, NextResponse } from "next/server"
import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: NextRequest) {

  const body = await req.json()

  const ip =
    req.headers.get("x-forwarded-for") ||
    req.headers.get("x-real-ip") ||
    "unknown"

  const city = req.headers.get("x-vercel-ip-city")
  const region = req.headers.get("x-vercel-ip-country-region")
  const country = req.headers.get("x-vercel-ip-country")

  const logData = {
    ip,
    name: body.visitorName || "Unknown Visitor",
    city,
    region,
    country,
    device: body.userAgent,
    result: body.result,
    time: new Date().toISOString()
  }

  console.log("ACCESS ATTEMPT", logData)

  try {

   const response = await resend.emails.send({
     from: "onboarding@resend.dev",
     to: "manasgoel2005@gmail.com",
     subject: "Manas Archive Access Attempt",
     html: `
     <h2>Archive Access Attempt</h2>
     <p><b>Name:</b> ${logData.name}</p>
     <p><b>Result:</b> ${logData.result}</p>
     <p><b>IP:</b> ${logData.ip}</p>
     <p><b>Location:</b> ${logData.city}, ${logData.region}, ${logData.country}</p>
     <p><b>Device:</b> ${logData.device}</p>
     <p><b>Time:</b> ${logData.time}</p>
    `})

    console.log("EMAIL RESPONSE", response)

  } catch (err) {
    console.log("Email send failed", err)
  }

  return NextResponse.json({ success: true })
}
