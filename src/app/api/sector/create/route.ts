import prisma from "@/lib/prima";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const { name, parentId } = await req.json();

    try {
        const sector = await prisma.sector.create({
            data: {
                name: name.toLowerCase(),
                parentId: parentId ? parentId : null,
            },
        });

        return NextResponse.json({
            status: 200,
            body: {
                message: "Sector created",
                sector,
            },
        });
    } catch (error) {
        return NextResponse.json({
            status: 500,
            body: {
                message: "Error creating sector",
            },
        });
    }
}
