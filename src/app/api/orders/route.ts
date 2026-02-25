import { NextRequest, NextResponse } from "next/server";

const SCRIPT_URL = process.env.APPS_SCRIPT_URL!; // tanpa NEXT_PUBLIC_

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const response = await fetch(SCRIPT_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      redirect: "follow", // penting! Apps Script sering redirect
    });

    const text = await response.text();

    return NextResponse.json({ success: true, data: text });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 },
    );
  }
}
