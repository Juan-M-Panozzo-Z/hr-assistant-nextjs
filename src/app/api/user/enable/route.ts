import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const {id} = await req.json()

    await prisma.user.update({
        where: {
            id
        },
        data: {
            enabled: true
        }
    })

    return NextResponse.json({success: true})
}
