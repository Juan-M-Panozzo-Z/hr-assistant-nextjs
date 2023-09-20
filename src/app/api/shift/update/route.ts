import prisma from "@/lib/prima";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const { id, startTime, endTime, startTime2, endTime2, sectorId } =
        await req.json();

    try {
        await prisma.shift.update({
            where: {
                id: id,
            },
            data: {
                startTime: startTime,
                endTime: endTime,
                startTime2: startTime2,
                endTime2: endTime2,
                sectorId: sectorId,
            },
        });

        return NextResponse.json({
            status: 200,
            message: "Shift updated",
        });
    } catch (error) {
        return NextResponse.json({
            status: 500,
            message: "Error updating shift",
        });
    }
}
