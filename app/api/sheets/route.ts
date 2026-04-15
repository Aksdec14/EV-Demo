// app/api/sheets/route.ts

import { NextRequest, NextResponse } from "next/server";

const SCRIPT_URL = process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_URL!;

export async function GET(request: NextRequest): Promise<NextResponse> {
    const { searchParams } = new URL(request.url);
    const sheet = searchParams.get("sheet");
    const partner_id = searchParams.get("partner_id");

    if (!sheet) {
        return NextResponse.json(
            { error: "Missing required query param: sheet" },
            { status: 400 }
        );
    }

    if (!SCRIPT_URL) {
        return NextResponse.json(
            { error: "Google Script URL is not configured" },
            { status: 500 }
        );
    }

    try {
        let url = `${SCRIPT_URL}?sheet=${encodeURIComponent(sheet)}`;
        if (partner_id) url += `&partner_id=${encodeURIComponent(partner_id)}`;

        const res = await fetch(url);

        if (!res.ok) {
            return NextResponse.json(
                { error: `Upstream error: ${res.statusText}` },
                { status: res.status }
            );
        }

        const data = await res.json();
        return NextResponse.json(data);
    } catch (err) {
        const message = err instanceof Error ? err.message : "Unknown error";
        return NextResponse.json({ error: message }, { status: 500 });
    }
}

export async function POST(request: NextRequest): Promise<NextResponse> {
    if (!SCRIPT_URL) {
        return NextResponse.json(
            { error: "Google Script URL is not configured" },
            { status: 500 }
        );
    }

    try {
        const body = await request.json();
        const res = await fetch(SCRIPT_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
        });

        if (!res.ok) {
            return NextResponse.json(
                { error: `Upstream error: ${res.statusText}` },
                { status: res.status }
            );
        }

        const data = await res.json();
        return NextResponse.json(data);
    } catch (err) {
        const message = err instanceof Error ? err.message : "Unknown error";
        return NextResponse.json({ error: message }, { status: 500 });
    }
}