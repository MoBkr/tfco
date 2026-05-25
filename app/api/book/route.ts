import { NextRequest, NextResponse } from "next/server";

const CAL_API_KEY   = process.env.CAL_API_KEY!;
const EVENT_TYPE_ID = 5793092;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, timeZone } = body;
    // Accept slotTime (ElevenLabs tool param) or start (direct calls)
    const start: string = body.start ?? body.slotTime ?? "";

    if (!name || !email || !start) {
      return NextResponse.json(
        { error: "name, email, and start (or slotTime) are required" },
        { status: 400 }
      );
    }

    const res = await fetch("https://api.cal.com/v2/bookings", {
      method: "POST",
      headers: {
        "Authorization":    `Bearer ${CAL_API_KEY}`,
        "cal-api-version":  "2024-08-13",
        "Content-Type":     "application/json",
      },
      body: JSON.stringify({
        eventTypeId: EVENT_TYPE_ID,
        start,
        attendee: {
          name,
          email,
          timeZone: timeZone ?? "Asia/Riyadh",
        },
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      return NextResponse.json({ error: data?.message ?? "Booking failed" }, { status: res.status });
    }

    return NextResponse.json({
      success: true,
      bookingId:  data?.data?.id,
      meetingUrl: data?.data?.meetingUrl,
      start:      data?.data?.start,
    });
  } catch {
    return NextResponse.json({ error: "Failed to book" }, { status: 500 });
  }
}
