import prisma from "@/lib/prima";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const {
        userId,
        sectorId,
        startDay,
        endDay = null,
        startTime,
        endTime,
        startTime2,
        endTime2,
    } = await req.json();

    console.log(req.json())

    const schedule = await prisma.schedule.create({
        data: {
            userId: Number(userId),
            sectorId: Number(sectorId),
            startDay,
            endDay,
            startTime,
            endTime,
            startTime2,
            endTime2,
        },
    });

    return NextResponse.json({
        status: 200,
        body: schedule,
    });
}
