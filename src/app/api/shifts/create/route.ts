import prisma from "@/lib/prima";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const { name, startTime, endTime } = await req.json();

    try {
        await prisma.shift.create({
            data: {
                name,
                startTime,
                endTime
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
