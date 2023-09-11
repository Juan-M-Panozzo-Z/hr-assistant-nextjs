import { Box, Container, Flex } from "@radix-ui/themes";
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

const sampleData = [
    {
        name: "Juan",
        lastname: "Perez",
        CheckType: "In",
        CheckDate: "2021-10-10",
        CheckTime: "10:00:00",
    },
    {
        name: "Juan",
        lastname: "Perez",
        CheckType: "Out",
        CheckDate: "2021-10-10",
        CheckTime: "18:00:00",
    },
    {
        name: "Ricardo",
        lastname: "Perez",
        CheckType: "In",
        CheckDate: "2021-10-10",
        CheckTime: "10:00:00",
    },
    {
        name: "Alfonzo",
        lastname: "Gonzalez",
        CheckType: "In",
        CheckDate: "2021-10-10",
        CheckTime: "10:00:00",
    },
    {
        name: "Juan",
        lastname: "Perez",
        CheckType: "In",
        CheckDate: "2021-10-10",
        CheckTime: "10:00:00",
    },
    {
        name: "Juan",
        lastname: "Perez",
        CheckType: "Out",
        CheckDate: "2021-10-10",
        CheckTime: "18:00:00",
    },
    {
        name: "Ricardo",
        lastname: "Perez",
        CheckType: "In",
        CheckDate: "2021-10-10",
        CheckTime: "10:00:00",
    },
    {
        name: "Alfonzo",
        lastname: "Gonzalez",
        CheckType: "In",
        CheckDate: "2021-10-10",
        CheckTime: "10:00:00",
    },
    {
        name: "Juan",
        lastname: "Perez",
        CheckType: "In",
        CheckDate: "2021-10-10",
        CheckTime: "10:00:00",
    },
    {
        name: "Juan",
        lastname: "Perez",
        CheckType: "Out",
        CheckDate: "2021-10-10",
        CheckTime: "18:00:00",
    },
    {
        name: "Ricardo",
        lastname: "Perez",
        CheckType: "In",
        CheckDate: "2021-10-10",
        CheckTime: "10:00:00",
    },
    {
        name: "Alfonzo",
        lastname: "Gonzalez",
        CheckType: "In",
        CheckDate: "2021-10-10",
        CheckTime: "10:00:00",
    },
    {
        name: "Juan",
        lastname: "Perez",
        CheckType: "In",
        CheckDate: "2021-10-10",
        CheckTime: "10:00:00",
    },
    {
        name: "Juan",
        lastname: "Perez",
        CheckType: "Out",
        CheckDate: "2021-10-10",
        CheckTime: "18:00:00",
    },
    {
        name: "Ricardo",
        lastname: "Perez",
        CheckType: "In",
        CheckDate: "2021-10-10",
        CheckTime: "10:00:00",
    },
    {
        name: "Alfonzo",
        lastname: "Gonzalez",
        CheckType: "In",
        CheckDate: "2021-10-10",
        CheckTime: "10:00:00",
    },
];

const CheckInOutData = () => {
    return (
        <Container className="w-4/5 mx-auto p-4">
            <Box className="flex gap-2">
                <Input placeholder="Buscar" />
                <Button>Buscar</Button>
            </Box>
            <Container className="mt-4">
                <Table>
                    <TableCaption>Check In/Out Data</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Tipo de registro</TableHead>
                            <TableHead>Nombre</TableHead>
                            <TableHead>Apellido</TableHead>
                            <TableHead>Fecha</TableHead>
                            <TableHead>Hora</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {sampleData.map((data, index) => (
                            <TableRow key={index}>
                                <TableCell>
                                    <Badge
                                        className={
                                            data.CheckType === "In"
                                                ? "bg-green-500"
                                                : "bg-red-500"
                                        }
                                    >
                                        {data.CheckType}
                                    </Badge>
                                </TableCell>
                                <TableCell>{data.name}</TableCell>
                                <TableCell>{data.lastname}</TableCell>
                                <TableCell>{data.CheckDate}</TableCell>
                                <TableCell>{data.CheckTime}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Container>
        </Container>
    );
};

export default CheckInOutData;
