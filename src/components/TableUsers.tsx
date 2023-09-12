import prisma from "@/lib/prima";
import { User } from "@prisma/client";
import { Box } from "@radix-ui/themes";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "./ui/table";
import { Badge } from "./ui/badge";
import ButtonEnableUser from "./ButtonEnableUser";

const TableUsers = ({ users }: { users: User[] }) => {

    const getUserType = async (user: User) => {
        const userType = await prisma.userType.findUnique({
            where: {
                id: user.typeId as number,
            },
        });
        return userType;
    };

    return (
        <Box className="md:w-4/5 mx-auto md:p-4">
            <Table>
                <TableCaption>
                    Usuarios registrados en la plataforma
                </TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Tipo de usuario</TableHead>
                        <TableHead>Legajo</TableHead>
                        <TableHead>Nombre</TableHead>
                        <TableHead>Apellido</TableHead>
                        <TableHead>Correo Electronico</TableHead>
                        <TableHead>Fecha de Registro</TableHead>
                        <TableHead>Acciones</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {users.map((user) => (
                        <TableRow key={user.id}>
                            <TableCell className="text-left">
                                <Badge variant={"secondary"}>
                                    {getUserType(user).then((res) => {
                                        return res?.name;
                                    })}
                                </Badge>
                            </TableCell>
                            <TableCell>{user.legajo}</TableCell>
                            <TableCell>{user.name}</TableCell>
                            <TableCell>{user.lastname}</TableCell>
                            <TableCell>{user.email}</TableCell>
                            <TableCell>
                                {user.createdAt.toLocaleString()}
                            </TableCell>
                            <TableCell className="flex gap-1 items-center">
                                <ButtonEnableUser user={user} />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Box>
    );
};

export default TableUsers;