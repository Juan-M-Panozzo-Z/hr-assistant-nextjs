import prisma from "@/lib/prima";
import { Schedule } from "@prisma/client";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const schedule = await req.json();
    console.log(schedule)

    try {
        await prisma.schedule.create({
            data: schedule,
        });

        return NextResponse.json({
            status: 200,
            body: "success",
        });
    } catch (error) {
        return NextResponse.json({
            status: 500,
            body: error,
        });
    }
}
