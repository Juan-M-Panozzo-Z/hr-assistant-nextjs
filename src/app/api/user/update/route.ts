import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const { id, name, lastname, email, phone, typeId, shiftId, sectorId } =
        await req.json();

    try {
        await prisma.user.update({
            where: {
                id: id,
            },
            data: {
                name: name,
                lastname: lastname,
                email: email,
                phone: phone,
                typeId: typeId,
                shiftId: shiftId,
                sectorId: sectorId,
            },
        });

        return NextResponse.json({
            status: "success",
            message: "Usuario actualizado correctamente",
        });
    } catch (error) {
        return NextResponse.json({
            status: "error",
            message: "Error al actualizar el usuario",
        });
    }
}
