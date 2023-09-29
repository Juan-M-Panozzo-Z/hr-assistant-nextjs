import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    const userId = req.url.split("/").pop();

    try {
        const schedule = await prisma.schedule.findMany({
            where: {
                userId: Number(userId),
            },
            include: {
                sector: true,
            }
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
