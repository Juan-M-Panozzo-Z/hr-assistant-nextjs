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
import { Sector, Shift } from "@prisma/client";
import CreateShiftButton from "./CreateShiftButton";
import DeleteShiftButton from "./DeleteShiftButton";
import EditShiftButton from "./EditShiftButton";
import { Badge } from "@/components/ui/badge";

const TableShifts = async () => {
    const getAllShifts = await prisma.shift.findMany();
    const getAllSectors = await prisma.sector.findMany();

    return (
        <Box className="overflow-x-auto mx-auto p-4 mt-4">
            <Box className="flex items-center justify-between">
                <h2 className="text-xl">Turnos</h2>
                <CreateShiftButton />
            </Box>
            <Box className="rounded-md border mt-4">
                <Table>
                    <TableCaption>
                        <span>Listado de turnos habilitados</span>
                    </TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Nombre</TableCell>
                            <TableCell>Inicio</TableCell>
                            <TableCell>Fin</TableCell>
                            <TableCell>Inicio 2</TableCell>
                            <TableCell>Fin 2</TableCell>
                            <TableCell>Sector asignado</TableCell>
                            <TableCell>Acciones</TableCell>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {getAllShifts.map((shift) => (
                            <TableRow key={shift.id}>
                                <TableCell>{shift.id}</TableCell>
                                <TableCell>{shift.name}</TableCell>
                                <TableCell>{shift.startTime}</TableCell>
                                <TableCell>{shift.endTime}</TableCell>
                                <TableCell>
                                    {shift.startTime2 || "Sin Registrar"}
                                </TableCell>
                                <TableCell>
                                    {shift.endTime2 || "Sin Registrar"}
                                </TableCell>
                                <TableCell>
                                    <Badge variant={"secondary"}>
                                        {shift.sectorId
                                            ? getAllSectors
                                                  .filter(
                                                      (sector) =>
                                                          sector.id ===
                                                          shift.sectorId
                                                  )
                                                  .map((sector) => sector.name)
                                            : "Sin Sector"}
                                    </Badge>
                                </TableCell>
                                <TableCell>
                                    <EditShiftButton
                                        sectors={getAllSectors as Sector[]}
                                        shift={shift as Shift}
                                    />
                                    <DeleteShiftButton shift={shift as Shift} />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Box>
        </Box>
    );
};

export default TableShifts;
