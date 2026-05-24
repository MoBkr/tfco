import { NextRequest, NextResponse } from "next/server";

const CAL_API_KEY   = process.env.CAL_API_KEY!;
const EVENT_TYPE_ID = 5793092;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));

    const now   = new Date();
    const start = body.startTime ?? now.toISOString();
    const end   = body.endTime   ?? new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000).toISOString();

    const url = new URL("https://api.cal.com/v2/slots/available");
    url.searchParams.set("eventTypeId", String(EVENT_TYPE_ID));
    url.searchParams.set("startTime",   start);
    url.searchParams.set("endTime",     end);

    const res = await fetch(url.toString(), {
      headers: {
        "Authorization":    `Bearer ${CAL_API_KEY}`,
        "cal-api-version":  "2024-06-14",
      },
    });

    const data = await res.json();

    // Format slots in Riyadh time, human-readable
    const slots: { iso: string; display: string }[] = [];

    if (data?.data?.slots) {
      for (const [, daySlots] of Object.entries(data.data.slots)) {
        for (const slot of daySlots as Array<{ time: string }>) {
          const date = new Date(slot.time);
          const display = date.toLocaleString("ar-SA", {
            timeZone: "Asia/Riyadh",
            weekday: "long",
            day: "numeric",
            month: "long",
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
          });
          slots.push({ iso: slot.time, display });
        }
      }
    }

    const first10 = slots.slice(0, 10);

    return NextResponse.json({
      available_slots: first10,
      message: first10.length > 0
        ? `يوجد ${first10.length} مواعيد متاحة`
        : "لا توجد مواعيد متاحة هذا الأسبوع",
    });
  } catch {
    return NextResponse.json({ error: "Failed to fetch slots" }, { status: 500 });
  }
}
