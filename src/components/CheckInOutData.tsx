import prisma from "@/lib/prima";
import { Box, Container } from "@radix-ui/themes";
import {
    Table,
    TableHeader,
    TableCaption,
    TableRow,
    TableHead,
    TableBody,
    TableCell,
} from "./ui/table";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { EnterIcon, ExitIcon, TableIcon } from "@radix-ui/react-icons";

const sampleData = [
    {
        name: "Juan",
        lastname: "Perez",
        checkType: "In",
        createdAt: "2021-10-10",
    },
    {
        name: "Juan",
        lastname: "Perez",
        checkType: "Out",
        createdAt: "2021-10-10",
    },
    {
        name: "Ricardo",
        lastname: "Perez",
        checkType: "In",
        createdAt: "2021-10-10",
    },
    {
        name: "Alfonzo",
        lastname: "Gonzalez",
        checkType: "In",
        createdAt: "2021-10-10",
    },
    {
        name: "Juan",
        lastname: "Perez",
        checkType: "In",
        createdAt: "2021-10-10",
    },
    {
        name: "Juan",
        lastname: "Perez",
        checkType: "Out",
        createdAt: "2021-10-10",
    },
    {
        name: "Ricardo",
        lastname: "Perez",
        checkType: "In",
        createdAt: "2021-10-10",
    },
    {
        name: "Alfonzo",
        lastname: "Gonzalez",
        checkType: "In",
        createdAt: "2021-10-10",
    },
    {
        name: "Juan",
        lastname: "Perez",
        checkType: "In",
        createdAt: "2021-10-10",
    },
    {
        name: "Juan",
        lastname: "Perez",
        checkType: "Out",
        createdAt: "2021-10-10",
    },
    {
        name: "Ricardo",
        lastname: "Perez",
        checkType: "In",
        createdAt: "2021-10-10",
    },
    {
        name: "Alfonzo",
        lastname: "Gonzalez",
        checkType: "In",
        createdAt: "2021-10-10",
    },
    {
        name: "Juan",
        lastname: "Perez",
        checkType: "In",
        createdAt: "2021-10-10",
    },
    {
        name: "Juan",
        lastname: "Perez",
        checkType: "Out",
        createdAt: "2021-10-10",
    },
    {
        name: "Ricardo",
        lastname: "Perez",
        checkType: "In",
        createdAt: "2021-10-10",
    },
    {
        name: "Alfonzo",
        lastname: "Gonzalez",
        checkType: "In",
        createdAt: "2021-10-10",
    },
];

const itemsPerPage = 10;
const currentPage = 1;

const indexOfLastItem = currentPage * itemsPerPage;
const indexOfFirstItem = indexOfLastItem - itemsPerPage;
const currentItems = sampleData.slice(indexOfFirstItem, indexOfLastItem);

const CheckInOutData = async ({ session }: any) => {
    const user = await prisma.user.findUnique({
        where: {
            email: session.user.email,
        },
    });

    const userType = await prisma.userType.findUnique({
        where: {
            id: user?.typeId,
        },
    });

    return (
        <Container className="md:w-4/5 mx-auto md:p-4">
            <Box className="flex gap-2">
                <Input placeholder="Buscar" />
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant={"ghost"}>Filtros</Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-44">
                        <DropdownMenuLabel>
                            Filtros disponibles
                        </DropdownMenuLabel>
                        <DropdownMenuGroup>
                            <DropdownMenuItem>
                                <EnterIcon className="w-4 h-4 mr-2" />
                                <span>Entradas</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <ExitIcon className="w-4 h-4 mr-2" />
                                <span>Salidas</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <TableIcon className="w-4 h-4 mr-2" />
                                <span>Todo</span>
                            </DropdownMenuItem>
                        </DropdownMenuGroup>
                    </DropdownMenuContent>
                </DropdownMenu>
                <Button>Buscar</Button>
            </Box>
            <Container className="mt-4">
                <Table>
                    <TableCaption>
                        Registros de Entrada y Salida
                        <Box className="gap-2 flex justify-end"></Box>
                    </TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Tipo de registro</TableHead>
                            <TableHead>Nombre</TableHead>
                            <TableHead>Apellido</TableHead>
                            <TableHead>Fecha y hora</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {currentItems.map((data, index) => (
                            <TableRow key={index}>
                                <TableCell>
                                    <Badge
                                        className={
                                            data.checkType === "In"
                                                ? "bg-green-500"
                                                : "bg-red-500"
                                        }
                                    >
                                        {data.checkType}
                                    </Badge>
                                </TableCell>
                                <TableCell>{data.name}</TableCell>
                                <TableCell>{data.lastname}</TableCell>
                                <TableCell>{data.createdAt}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Container>
        </Container>
    );
};

export default CheckInOutData;
