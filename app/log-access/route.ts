import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {

  const body = await req.json()

  const ip =
    req.headers.get("x-forwarded-for") ||
    req.headers.get("x-real-ip") ||
    "unknown"

  console.log("ACCESS ATTEMPT", {
    ip,
    device: body.userAgent,
    result: body.result,
    time: new Date().toISOString()
  })

  return NextResponse.json({ success: true })
}
