import { NextResponse } from "next/server";

// fake data

export async function GET() {
    return NextResponse.json("123456");
}
