import prisma from "@/lib/prima";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const body = await req.json();

    try {
        const checkinout = await prisma.checkInOut.create({
            data: {
                ...body,
            },
        });
        return NextResponse.json({ status: "ok", checkinout });
    } catch (error) {
        return NextResponse.json({ status: "error", error });
    }
}
