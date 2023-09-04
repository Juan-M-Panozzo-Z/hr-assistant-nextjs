import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

interface Credentials {
    email: string;
    password: string;
}

export default CredentialsProvider({
    name: "credentials",
    credentials: {
        email: {
            label: "Email",
            type: "email",
            placeholder: "ejemplo@correo.com",
        },
        password: { label: "Password", type: "password" },
    },
    async authorize(credentials: Credentials) {
        const user = await prisma.user.findUnique({
            where: {
                email: credentials.email,
            },
        });
        if (user && bcrypt.compareSync(credentials.password, user.password)) {
            return user;
        } else {
            return null;
        }
    },
});
