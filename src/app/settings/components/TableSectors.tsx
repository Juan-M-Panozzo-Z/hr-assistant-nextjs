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

    const getUniqueSector = async (sectorId: number) => {
        try {
          const sector = await prisma.sector.findFirst({
            where: {
              id: sectorId,
            },
          });
            return sector;
        } catch (error) {
            console.log(error);
        }
    };

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
                            <TableHead>Sector Padre</TableHead>
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
                                        {getUniqueSector(
                                            sector.parentId as number
                                        ).then((res) => {
                                            return res?.name || "No tiene";
                                        })}
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
