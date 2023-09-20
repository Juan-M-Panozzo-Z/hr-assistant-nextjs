import prisma from "@/lib/prima";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const {id, name, users, shifts} = await req.json();
    
    try {
        const response = await prisma.sector.update({
            where: {
                id: id,
            },
            data: {
                name: name
            },
        });
    
        return NextResponse.json({
            status: "success",
            message: "Sector updated successfully",
        });
    } catch (error) {
        return NextResponse.json({
            status: 500,
            message: "Something went wrong",
        });
    }
}
