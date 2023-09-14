
import prisma from "@/lib/prima";
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

const TableSectors = async () => {
    const getAllSectors = await prisma.sector.findMany();

    return (
        <Box className="overflow-x-auto md:w-4/5 mx-auto p-4 mt-4">
            <Box className="flex items-center justify-between">
                <h2 className="text-xl">Sectores</h2>
                <CreateSectorButton />
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
                            <TableHead>Fecha y hora de creación</TableHead>
                            <TableHead>ID Padre</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {getAllSectors.map((sector) => (
                            <TableRow key={sector.id}>
                                <TableCell className="text-left">
                                    {sector.id}
                                </TableCell>
                                <TableCell className="text-left">
                                    {sector.name}
                                </TableCell>
                                <TableCell className="text-left">
                                    {sector.createdAt.toLocaleString()}
                                </TableCell>
                                <TableCell className="text-left">
                                    <Badge variant={"secondary"}>
                                        {
                                            sector.parentId || "No tiene padre"
                                        }
                                    </Badge>
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
