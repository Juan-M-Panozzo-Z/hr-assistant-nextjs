import { NextResponse } from "next/server";
import prisma from "@/lib/prima";

export async function GET(req: Request, res: Response) {
    const url = new URL(req.url);
    const searchParams = url.searchParams.get("email");

    if (searchParams === null) {
        return NextResponse.error();
    }

    const userData = await prisma.user.findMany({
        where: { email: searchParams },
        select: {
            name: true,
            lastname: true,
            email: true,
            type: true,
        },
    });

    return NextResponse.json({ body: userData[0]});
}
