import prisma from "@/lib/prima";
import { NextResponse } from "next/server";

export async function GET() {
    const checkinouts = await prisma.checkInOut.findMany({
        include: {
            user: true,
        },
    });

    return NextResponse.json({ status: "ok", checkinouts });
}
