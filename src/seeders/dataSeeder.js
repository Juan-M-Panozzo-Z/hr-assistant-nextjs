import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
    await prisma.userType.create({
        data: {
            name: "Administrator",
        },
    });

    await prisma.userType.create({
        data: {
            name: "User",
        },
    });

    await prisma.sector.create({
        data: {
            name: "Sin Sector",
            isChildren: false,
        },
    });

    await prisma.user.create({
        data: {
            name: "Juan Manuel",
            lastname: "Panozzo Zenere",
            sectorId: 1,
            email: "jmpz.94@gmail.com",
            password: await bcrypt.hash("34584024", 10),
            enabled: true,
            legajo: 1,
            typeId: 1,
        },
    });
}

main()
    .catch((error) => {
        console.error(error);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
