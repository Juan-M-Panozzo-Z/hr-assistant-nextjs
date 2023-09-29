import prisma from "@/lib/prisma";
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
import CreateSectorButton from "./CreateSectorButton";
import { User, Sector, Shift } from "@prisma/client";
import DeleteSectorButton from "./DeleteSectorButton";
import EditSectorButton from "./EditSectorButton";

interface SectorIncludeUsers extends Sector {
    users: User[];
}
const TableSectors = async () => {
    const getAllSectors = await prisma.sector.findMany({
        orderBy: {
            createdAt: "desc",
        },
        include: {
            users: true,
        },
    });

    const getUniqueSector = async (sectorId: number) => {
        if (sectorId !== null) {
            try {
                const sector = await prisma.sector.findFirst({
                    where: {
                        id: sectorId as number,
                    },
                });
                return sector?.name as string;
            } catch (error) {
                console.log(error);
            }
        }
        return "No tiene";
    };

    return (
        <Box className="overflow-x-auto md:w-4/5 mx-auto p-4 mt-4">
            <Box className="flex items-center justify-between">
                <h2 className="text-xl">Sectores</h2>
                <CreateSectorButton getAllSectors={getAllSectors} />
            </Box>
            <Box className="rounded-md border mt-4">
                <Table>
                    <TableCaption>
                        <span>Listado de sectores habilitados</span>
                    </TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead>ID</TableHead>
                            <TableHead>Nombre</TableHead>
                            <TableHead>Sector Padre</TableHead>
                            <TableHead>Usuarios</TableHead>
                            <TableHead>Acciones</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {getAllSectors.map((sector: SectorIncludeUsers) => (
                            <TableRow key={sector.id}>
                                <TableCell className="text-left">
                                    {sector.id}
                                </TableCell>
                                <TableCell className="text-left">
                                    {sector.name}
                                </TableCell>
                                <TableCell className="text-left">
                                    <Badge variant={"secondary"}>
                                        {
                                            getUniqueSector(
                                                sector.parentId as number
                                            ) as any
                                        }
                                    </Badge>
                                </TableCell>
                                <TableCell>
                                    <Badge variant={"secondary"}>
                                        {sector?.users?.length as number}
                                    </Badge>
                                </TableCell>
                                <TableCell className="text-left">
                                    <EditSectorButton
                                        sector={
                                            sector as Sector & {
                                                users: User[];
                                            } & { shifts: Shift[] }
                                        }
                                    />
                                    <DeleteSectorButton
                                        sector={sector as Sector}
                                    />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Box>
        </Box>
    );
};

export default TableSectors;
