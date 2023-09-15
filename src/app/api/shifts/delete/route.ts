import prisma from "@/lib/prima";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const { id } = await req.json();

    try {
        await prisma.shift.delete({
            where: {
                id: id,
            },
        });
        return NextResponse.json({
            status: 200,
            message: "Shift deleted",
        });
    } catch (error) {
        return NextResponse.json({
            status: 500,
            message: "Something went wrong",
        });
    }
}
