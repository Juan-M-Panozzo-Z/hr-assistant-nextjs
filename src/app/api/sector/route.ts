import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
    const sectors = await prisma.sector.findMany();
    return NextResponse.json(sectors);
}
