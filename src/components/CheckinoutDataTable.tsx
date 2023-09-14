"use client";

import { useState } from "react";

import {
    ColumnDef,
    ColumnFiltersState,
    SortingState,
    VisibilityState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table";
import { Checkbox } from "./ui/checkbox";
import { Button } from "./ui/button";
import { CaretSortIcon, ChevronDownIcon } from "@radix-ui/react-icons";
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Box } from "@radix-ui/themes";
import { Input } from "./ui/input";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "./ui/table";
import { Badge } from "./ui/badge";
import { getRandomDate } from "@/lib/generateRandomDate";

export type Checkinout = {
    id: number;
    userId: number;
    nombre: string;
    apellido: string;
    legajo: number;
    sector: number;
    email: string;
    date: string;
    registro: number;
};

const data: Checkinout[] = [
    {
        id: 1,
        userId: 1,
        nombre: "Juan",
        apellido: "Perez",
        legajo: 1234,
        sector: 1,
        email: "ejemplo@ejemplo.com",
        date: getRandomDate(),
        registro: 1,
    },
    {
        id: 2,
        userId: 2,
        nombre: "Rafael",
        apellido: "Nadal",
        legajo: 1235,
        sector: 1,
        email: "rafael@nadal.com",
        date: getRandomDate(),
        registro: 1,
    },
    {
        id: 3,
        userId: 3,
        nombre: "Roger",
        apellido: "Federer",
        legajo: 1236,
        sector: 1,
        email: "roger@federer.com",
        date: getRandomDate(),
        registro: 1,
    },
    {
        id: 4,
        userId: 1,
        nombre: "Juan",
        apellido: "Perez",
        legajo: 1234,
        sector: 1,
        email: "ejemplo@ejemplo.com",
        date: getRandomDate(),
        registro: 2,
    },
    {
        id: 5,
        userId: 2,
        nombre: "Rafael",
        apellido: "Nadal",
        legajo: 1235,
        sector: 1,
        email: "rafael@nadal.com",
        date: getRandomDate(),
        registro: 2,
    },
    {
        id: 6,
        userId: 3,
        nombre: "Roger",
        apellido: "Federer",
        legajo: 1236,
        sector: 1,
        email: "roger@federer.com",
        date: getRandomDate(),
        registro: 2,
    },
    {
        id: 1,
        userId: 1,
        nombre: "Juan",
        apellido: "Perez",
        legajo: 1234,
        sector: 1,
        email: "ejemplo@ejemplo.com",
        date: getRandomDate(),
        registro: 1,
    },
    {
        id: 2,
        userId: 2,
        nombre: "Rafael",
        apellido: "Nadal",
        legajo: 1235,
        sector: 1,
        email: "rafael@nadal.com",
        date: getRandomDate(),
        registro: 1,
    },
    {
        id: 3,
        userId: 3,
        nombre: "Roger",
        apellido: "Federer",
        legajo: 1236,
        sector: 1,
        email: "roger@federer.com",
        date: getRandomDate(),
        registro: 1,
    },
    {
        id: 4,
        userId: 1,
        nombre: "Juan",
        apellido: "Perez",
        legajo: 1234,
        sector: 1,
        email: "ejemplo@ejemplo.com",
        date: getRandomDate(),
        registro: 2,
    },
    {
        id: 5,
        userId: 2,
        nombre: "Rafael",
        apellido: "Nadal",
        legajo: 1235,
        sector: 1,
        email: "rafael@nadal.com",
        date: getRandomDate(),
        registro: 2,
    },
    {
        id: 6,
        userId: 3,
        nombre: "Roger",
        apellido: "Federer",
        legajo: 1236,
        sector: 1,
        email: "roger@federer.com",
        date: getRandomDate(),
        registro: 2,
    },
    {
        id: 1,
        userId: 1,
        nombre: "Juan",
        apellido: "Perez",
        legajo: 1234,
        sector: 1,
        email: "ejemplo@ejemplo.com",
        date: getRandomDate(),
        registro: 1,
    },
    {
        id: 2,
        userId: 2,
        nombre: "Rafael",
        apellido: "Nadal",
        legajo: 1235,
        sector: 1,
        email: "rafael@nadal.com",
        date: getRandomDate(),
        registro: 1,
    },
    {
        id: 3,
        userId: 3,
        nombre: "Roger",
        apellido: "Federer",
        legajo: 1236,
        sector: 1,
        email: "roger@federer.com",
        date: getRandomDate(),
        registro: 1,
    },
    {
        id: 4,
        userId: 1,
        nombre: "Juan",
        apellido: "Perez",
        legajo: 1234,
        sector: 1,
        email: "ejemplo@ejemplo.com",
        date: getRandomDate(),
        registro: 2,
    },
    {
        id: 5,
        userId: 2,
        nombre: "Rafael",
        apellido: "Nadal",
        legajo: 1235,
        sector: 1,
        email: "rafael@nadal.com",
        date: getRandomDate(),
        registro: 2,
    },
    {
        id: 6,
        userId: 3,
        nombre: "Roger",
        apellido: "Federer",
        legajo: 1236,
        sector: 1,
        email: "roger@federer.com",
        date: getRandomDate(),
        registro: 2,
    },
    {
        id: 1,
        userId: 1,
        nombre: "Juan",
        apellido: "Perez",
        legajo: 1234,
        sector: 1,
        email: "ejemplo@ejemplo.com",
        date: getRandomDate(),
        registro: 1,
    },
    {
        id: 2,
        userId: 2,
        nombre: "Rafael",
        apellido: "Nadal",
        legajo: 1235,
        sector: 1,
        email: "rafael@nadal.com",
        date: getRandomDate(),
        registro: 1,
    },
    {
        id: 3,
        userId: 3,
        nombre: "Roger",
        apellido: "Federer",
        legajo: 1236,
        sector: 1,
        email: "roger@federer.com",
        date: getRandomDate(),
        registro: 1,
    },
    {
        id: 4,
        userId: 1,
        nombre: "Juan",
        apellido: "Perez",
        legajo: 1234,
        sector: 1,
        email: "ejemplo@ejemplo.com",
        date: getRandomDate(),
        registro: 2,
    },
    {
        id: 5,
        userId: 2,
        nombre: "Rafael",
        apellido: "Nadal",
        legajo: 1235,
        sector: 1,
        email: "rafael@nadal.com",
        date: getRandomDate(),
        registro: 2,
    },
    {
        id: 6,
        userId: 3,
        nombre: "Roger",
        apellido: "Federer",
        legajo: 1236,
        sector: 1,
        email: "roger@federer.com",
        date: getRandomDate(),
        registro: 2,
    },
    {
        id: 1,
        userId: 1,
        nombre: "Juan",
        apellido: "Perez",
        legajo: 1234,
        sector: 1,
        email: "ejemplo@ejemplo.com",
        date: getRandomDate(),
        registro: 1,
    },
    {
        id: 2,
        userId: 2,
        nombre: "Rafael",
        apellido: "Nadal",
        legajo: 1235,
        sector: 1,
        email: "rafael@nadal.com",
        date: getRandomDate(),
        registro: 1,
    },
    {
        id: 3,
        userId: 3,
        nombre: "Roger",
        apellido: "Federer",
        legajo: 1236,
        sector: 1,
        email: "roger@federer.com",
        date: getRandomDate(),
        registro: 1,
    },
    {
        id: 4,
        userId: 1,
        nombre: "Juan",
        apellido: "Perez",
        legajo: 1234,
        sector: 1,
        email: "ejemplo@ejemplo.com",
        date: getRandomDate(),
        registro: 2,
    },
    {
        id: 5,
        userId: 2,
        nombre: "Rafael",
        apellido: "Nadal",
        legajo: 1235,
        sector: 1,
        email: "rafael@nadal.com",
        date: getRandomDate(),
        registro: 2,
    },
    {
        id: 6,
        userId: 3,
        nombre: "Roger",
        apellido: "Federer",
        legajo: 1236,
        sector: 1,
        email: "roger@federer.com",
        date: getRandomDate(),
        registro: 2,
    },
];

export const columns: ColumnDef<Checkinout>[] = [
    {
        id: "select",
        header: ({ table }) => (
            <Checkbox
                checked={table.getIsAllPageRowsSelected()}
                onCheckedChange={(value) =>
                    table.toggleAllPageRowsSelected(!!value)
                }
                aria-label="Select All"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select Row"
            />
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "legajo",
        header: ({ column }) => {
            return (
                <Button
                    variant={"ghost"}
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === "asc")
                    }
                >
                    Legajo
                    <CaretSortIcon className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        cell: ({ row }) => <div>{row.getValue("legajo")}</div>,
    },
    {
        accessorKey: "sector",
        header: ({ column }) => {
            return (
                <Button
                    variant={"ghost"}
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === "asc")
                    }
                >
                    Sector
                    <CaretSortIcon className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        cell: ({ row }) => <div>{row.getValue("sector")}</div>,
    },
    {
        accessorKey: "nombre",
        header: ({ column }) => {
            return (
                <Button
                    variant={"ghost"}
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === "asc")
                    }
                >
                    Nombre
                    <CaretSortIcon className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        cell: ({ row }) => (
            <div className="capitalize">{row.getValue("nombre")}</div>
        ),
    },
    {
        accessorKey: "apellido",
        header: ({ column }) => {
            return (
                <Button
                    variant={"ghost"}
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === "asc")
                    }
                >
                    Apellido
                    <CaretSortIcon className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        cell: ({ row }) => (
            <div className="capitalize">{row.getValue("apellido")}</div>
        ),
    },
    {
        accessorKey: "date",
        header: ({ column }) => {
            return (
                <Button
                    variant={"ghost"}
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === "asc")
                    }
                >
                    Fecha
                    <CaretSortIcon className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        cell: ({ row }) => (
            <div className="capitalize">{row.getValue("date")}</div>
        ),
    },
    {
        accessorKey: "registro",
        header: "Tipo de registro",
        cell: ({ row }) => (
            <div className="capitalize">
                <Badge
                    className={
                        row.getValue("registro") === 1
                            ? "bg-green-500"
                            : "bg-red-500"
                    }
                >
                    {row.getValue("registro") === 1 ? "Entrada" : "Salida"}
                </Badge>
            </div>
        ),
    },
];

export const CheckinoutDataTable = () => {
    const [sorting, setSorting] = useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>(
        {}
    );
    const [rowSelection, setRowSelection] = useState({});

    const table = useReactTable({
        data,
        columns,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
        },
    });

    return (
        <Box className="overflow-x-auto md:w-4/5 mx-auto p-4 mt-4">
            <h2 className="text-xl ">Registro de ingreso y egreso</h2>
            <Box className="flex items-center gap-2 my-4 mt-4">
                <Box className="flex w-full gap-2">
                    <Input
                        placeholder="Ingresar apellido"
                        value={
                            (table
                                .getColumn("apellido")
                                ?.getFilterValue() as string) || ""
                        }
                        onChange={(e) =>
                            table
                                .getColumn("apellido")
                                ?.setFilterValue(e.target.value)
                        }
                    />
                    <Input
                        placeholder="Ingresar sector"
                        value={
                            (table
                                .getColumn("sector")
                                ?.getFilterValue() as string) || ""
                        }
                        onChange={(e) =>
                            table
                                .getColumn("sector")
                                ?.setFilterValue(e.target.value)
                        }
                    />
                </Box>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant={"outline"} className="ml-auto">
                            Columnas
                            <ChevronDownIcon className="ml-2 h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        {table
                            .getAllColumns()
                            .filter((column) => column.getCanHide())
                            .map((column) => {
                                return (
                                    <DropdownMenuCheckboxItem
                                        key={column.id}
                                        className="capitalize"
                                        checked={column.getIsVisible()}
                                        onCheckedChange={(value) =>
                                            column.toggleVisibility(!!value)
                                        }
                                    >
                                        {column.id}
                                    </DropdownMenuCheckboxItem>
                                );
                            })}
                    </DropdownMenuContent>
                </DropdownMenu>
            </Box>
            <Box className="rounded-md border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                      header.column.columnDef
                                                          .header,
                                                      header.getContext()
                                                  )}
                                        </TableHead>
                                    );
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={
                                        row.getIsSelected() && "selected"
                                    }
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length}
                                    className="h-24 text-center"
                                >
                                    No hay datos para mostrar
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </Box>
            <Box className="flex items-center justify-end space-x-2 py4">
                <Box className="flex-1 text-sm text-muted-foreground">
                    {table.getFilteredSelectedRowModel().rows.length} de{" "}
                    {table.getFilteredRowModel().rows.length} registros
                    seleccionados.
                </Box>
                <Box className="space-x-2">
                    <Button
                        variant={"outline"}
                        size={"sm"}
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                    >
                        Anterior
                    </Button>
                    <Button
                        variant={"outline"}
                        size={"sm"}
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                    >
                        Siguiente
                    </Button>
                </Box>
            </Box>
        </Box>
    );
};
