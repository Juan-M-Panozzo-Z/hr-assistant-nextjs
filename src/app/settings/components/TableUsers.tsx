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
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import EnableUserButton from "./EnableUserButton";
import { QuestionMarkIcon } from "@radix-ui/react-icons";
import EditUserButton from "./EditUserButton";

const TableUsers = ({ users }: { users: User[] }) => {
    const getUserType = async (user: User) => {
        const userType = await prisma.userType.findUnique({
            where: {
                id: user.typeId as number,
            },
        });
        return userType;
    };

    const getSector = async (user: User) => {
        const sector = await prisma.sector.findUnique({
            where: {
                id: user.sectorId as number,
            },
        });
        return sector;
    };

    return (
        <Box className="overflow-x-auto md:w-4/5 mx-auto p-4 mt-4">
            <h2 className="text-xl ">Usuarios</h2>
            <Box className="rounded-md border mt-4">
                <Table>
                    <TableCaption>
                        <span>
                            Los usuarios que se encuentran marcados con{" "}
                            <QuestionMarkIcon
                                color="red"
                                className="inline w-3 h-3"
                            />{" "}
                            estan sin habilitar
                        </span>
                    </TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Tipo de usuario</TableHead>
                            <TableHead>Legajo</TableHead>
                            <TableHead>Nombre</TableHead>
                            <TableHead>Apellido</TableHead>
                            <TableHead>Correo Electronico</TableHead>
                            <TableHead>Telefono</TableHead>
                            <TableHead>Fecha de Registro</TableHead>
                            <TableHead>Sector</TableHead>
                            <TableHead>Turno asignado</TableHead>
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
                                    {user?.phone ? (
                                        user?.phone
                                    ) : (
                                        <Badge variant={"secondary"}>
                                            Sin registrar
                                        </Badge>
                                    )}
                                </TableCell>
                                <TableCell>
                                    {user.createdAt.toLocaleString()}
                                </TableCell>
                                <TableCell>
                                    {getSector(user).then((res) => {
                                        return res?.name;
                                    })}
                                </TableCell>
                                <TableCell>
                                    {user.shiftId ? (
                                        user.shiftId
                                    ) : (
                                        <Badge variant={"secondary"}>
                                            Sin registrar
                                        </Badge>
                                    )}
                                </TableCell>
                                <TableCell className="flex gap-1 items-center">
                                    <EditUserButton user={user} />
                                    <EnableUserButton user={user} />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Box>
        </Box>
    );
};

export default TableUsers;
