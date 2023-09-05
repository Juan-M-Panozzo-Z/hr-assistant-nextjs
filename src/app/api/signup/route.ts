import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const { name, lastname, email, password } = await req.json();

        const existingUser = await prisma.user.findUnique({
            where: {
                email: email.toLowerCase(),
            },
        });

        if (existingUser) {
            return NextResponse.json({
                status: 401,
                body: {
                    error: "User already exists",
                },
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await prisma.user.create({
            data: {
                name,
                lastname,
                email: email.toLowerCase(),
                password: hashedPassword,
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
    } catch (error) {
        console.error(error);

        return NextResponse.json({
            status: 500,
            body: {
                error: "Internal server error",
            },
        });
    }
}
