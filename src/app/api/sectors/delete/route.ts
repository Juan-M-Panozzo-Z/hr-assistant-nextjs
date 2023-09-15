import prisma from "@/lib/prima";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const { id } = await req.json();

    try {
        if (id !== 1) {
            await prisma.sector.delete({
                where: {
                    id,
                },
            });
            return NextResponse.json({
                status: 200,
                message: "Sector deleted successfully",
            });
        }
        return NextResponse.json({
            status: 400,
            message: "Sector could not be deleted",
        });
    } catch (error) {
        return NextResponse.json({
            status: 500,
            message: "Sector could not be deleted",
        });
    }
}
