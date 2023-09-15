import prisma from "@/lib/prima";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const { legajo } = await req.json();

    try {
        const user = await prisma.user.findUnique({
            where: {
                legajo: legajo,
            },
        });

        console.log(user);

        if (!user) {
            return NextResponse.json({
                status: "error",
                error: "User not found",
            });
        }

        // que checkinout tambien me devuelva el usuario
        const checkinout = await prisma.checkInOut.create({
            data: {
                userId: user.id,
                checkType: "1",
            },
            include: {
                user: true,
            },
        });

        return NextResponse.json({ status: "ok", checkinout });
    } catch (error) {
        return NextResponse.json({ status: "error", error });
    }
}
