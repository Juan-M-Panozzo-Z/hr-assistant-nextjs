import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    const email = req.url.split("/").pop();

    try {
        const user = await prisma.user.findUnique({
            where: {
                email: email,
            },
        });
        if (user?.typeId !== 1) {
            console.log("admin");
            const checkinout = await prisma.checkInOut.findMany({
                include: {
                    user: {
                        select: {
                            legajo: true,
                            name: true,
                            lastname: true,
                            email: true,
                            sector: {
                                select: {
                                    name: true,
                                },
                            }
                        }
                    }
                },
            });
            return NextResponse.json({
                status: 200,
                body: checkinout,
            });
        } else {
            console.log("user");
            const checkinout = await prisma.checkInOut.findMany({
                where: {
                    user: {
                        email: email,
                    },
                },
                include: {
                    user: {
                        select: {
                            legajo: true,
                            name: true,
                            lastname: true,
                            email: true,
                            sector: {
                                select: {
                                    name: true,
                                },
                            }
                        }
                    }
                },
            });
            return NextResponse.json({
                status: 200,
                body: checkinout,
            });
        }
    } catch (error) {
        return NextResponse.json({
            status: 500,
            body: error,
        });
    }
}
