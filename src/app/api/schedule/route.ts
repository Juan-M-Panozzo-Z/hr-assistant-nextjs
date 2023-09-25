import prisma from "@/lib/prima";
import { Schedule } from "@prisma/client";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const schedules: Schedule[] = await prisma.schedule.findMany({});

        return NextResponse.json({
            status: 200,
            body: schedules,
        });
    } catch (error) {
        return NextResponse.json({
            status: 500,
            body: error,
        });
    }
}
