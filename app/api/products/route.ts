import products from "@/utils/data/products";
import { NextResponse } from "next/server";

// fake data

export async function GET() {
    return NextResponse.json(products);
}
