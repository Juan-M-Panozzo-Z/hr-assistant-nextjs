import prisma from "@/lib/prima";
import { Schedule } from "@prisma/client";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const scheduleToCreate = await req.json();

    try {
        const schedule = await prisma.schedule.create({
            data: scheduleToCreate,
        });

        return NextResponse.json({
            status: 200,
            body: schedule,
        });
    } catch (error) {
        return NextResponse.json({
            status: 500,
            body: error,
        });
    }
}
