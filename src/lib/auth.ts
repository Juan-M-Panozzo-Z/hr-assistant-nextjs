import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "./prisma";
import bcrypt from "bcrypt";

interface Credentials {
    email: string;
    password: string;
}

export const authOptions: NextAuthOptions = {
    session: {
        strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET,
    providers: [
        CredentialsProvider({
            name: "Sign in",
            credentials: {
                email: { type: "email" },
                password: { type: "password" },
            },
            async authorize(credentials: Credentials | undefined) {
                if (!credentials) {
                    throw new Error("No credentials");
                }
                const user = await prisma.user.findUnique({
                    where: {
                        email: credentials.email,
                    },
                });
                if (
                    user &&
                    bcrypt.compareSync(credentials.password, user.password) &&
                    user.enabled
                ) {
                    return Promise.resolve(user as any);
                } else {
                    return Promise.resolve(null);
                }
            },
        }),
    ],
};
