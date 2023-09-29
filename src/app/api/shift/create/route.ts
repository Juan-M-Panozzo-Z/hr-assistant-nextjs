import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const { name, startTime, endTime, startTime2, endTime2, sectorId } =
        await req.json();

    try {
        await prisma.shift.create({
            data: {
                name,
                startTime,
                endTime,
                startTime2,
                endTime2,
                sectorId,
            },
        });
        return NextResponse.json({
            status: 200,
            message: "Shift created",
        });
    } catch (error) {
        return NextResponse.json({
            status: 500,
            message: "Something went wrong",
        });
    }
}
