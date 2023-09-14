import prisma from "@/lib/prima";
import { NextResponse } from "next/server";

export async function GET() {
    const checkinout = await prisma.checkInOut.findMany();
    return NextResponse.json(checkinout);
}