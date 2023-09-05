import prisma from "@/lib/prima";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const { name, lastname, email, password } = await req.json();

    const user = await prisma.user.findUnique({
        where: {
            email : email.toLowerCase() as string,
        },
    });

    if (user) {
        return {
            status: 401,
            body: {
                error: "User already exists",
            },
        };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
        data: {
            name,
            lastname,
            email: email.toLowerCase() as string,
            password: hashedPassword as string,
        },
    });

    if (newUser) {
        return NextResponse.json({
            status: 200,
            body: {
                message: "User created",
            },
        });
    }

    console.log(newUser);
}
