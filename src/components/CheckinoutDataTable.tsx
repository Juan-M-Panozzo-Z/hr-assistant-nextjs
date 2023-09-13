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
    userName: string;
    userLastname: string;
    userLegajo: number;
    userEmail: string;
    registroFecha: string;
    registro: number;
};

const data: Checkinout[] = [
    {
        id: 1,
        userId: 1,
        userName: "Juan",
        userLastname: "Perez",
        userLegajo: 1234,
        userEmail: "ejemplo@ejemplo.com",
        registroFecha: getRandomDate(),
        registro: 1,
    },
    {
        id: 2,
        userId: 2,
        userName: "Rafael",
        userLastname: "Nadal",
        userLegajo: 1235,
        userEmail: "rafael@nadal.com",
        registroFecha: getRandomDate(),
        registro: 1,
    },
    {
        id: 3,
        userId: 3,
        userName: "Roger",
        userLastname: "Federer",
        userLegajo: 1236,
        userEmail: "roger@federer.com",
        registroFecha: getRandomDate(),
        registro: 1,
    },
    {
        id: 4,
        userId: 1,
        userName: "Juan",
        userLastname: "Perez",
        userLegajo: 1234,
        userEmail: "ejemplo@ejemplo.com",
        registroFecha: getRandomDate(),
        registro: 2,
    },
    {
        id: 5,
        userId: 2,
        userName: "Rafael",
        userLastname: "Nadal",
        userLegajo: 1235,
        userEmail: "rafael@nadal.com",
        registroFecha: getRandomDate(),
        registro: 2,
    },
    {
        id: 6,
        userId: 3,
        userName: "Roger",
        userLastname: "Federer",
        userLegajo: 1236,
        userEmail: "roger@federer.com",
        registroFecha: getRandomDate(),
        registro: 2,
    },
    {
        id: 1,
        userId: 1,
        userName: "Juan",
        userLastname: "Perez",
        userLegajo: 1234,
        userEmail: "ejemplo@ejemplo.com",
        registroFecha: getRandomDate(),
        registro: 1,
    },
    {
        id: 2,
        userId: 2,
        userName: "Rafael",
        userLastname: "Nadal",
        userLegajo: 1235,
        userEmail: "rafael@nadal.com",
        registroFecha: getRandomDate(),
        registro: 1,
    },
    {
        id: 3,
        userId: 3,
        userName: "Roger",
        userLastname: "Federer",
        userLegajo: 1236,
        userEmail: "roger@federer.com",
        registroFecha: getRandomDate(),
        registro: 1,
    },
    {
        id: 4,
        userId: 1,
        userName: "Juan",
        userLastname: "Perez",
        userLegajo: 1234,
        userEmail: "ejemplo@ejemplo.com",
        registroFecha: getRandomDate(),
        registro: 2,
    },
    {
        id: 5,
        userId: 2,
        userName: "Rafael",
        userLastname: "Nadal",
        userLegajo: 1235,
        userEmail: "rafael@nadal.com",
        registroFecha: getRandomDate(),
        registro: 2,
    },
    {
        id: 6,
        userId: 3,
        userName: "Roger",
        userLastname: "Federer",
        userLegajo: 1236,
        userEmail: "roger@federer.com",
        registroFecha: getRandomDate(),
        registro: 2,
    },
    {
        id: 1,
        userId: 1,
        userName: "Juan",
        userLastname: "Perez",
        userLegajo: 1234,
        userEmail: "ejemplo@ejemplo.com",
        registroFecha: getRandomDate(),
        registro: 1,
    },
    {
        id: 2,
        userId: 2,
        userName: "Rafael",
        userLastname: "Nadal",
        userLegajo: 1235,
        userEmail: "rafael@nadal.com",
        registroFecha: getRandomDate(),
        registro: 1,
    },
    {
        id: 3,
        userId: 3,
        userName: "Roger",
        userLastname: "Federer",
        userLegajo: 1236,
        userEmail: "roger@federer.com",
        registroFecha: getRandomDate(),
        registro: 1,
    },
    {
        id: 4,
        userId: 1,
        userName: "Juan",
        userLastname: "Perez",
        userLegajo: 1234,
        userEmail: "ejemplo@ejemplo.com",
        registroFecha: getRandomDate(),
        registro: 2,
    },
    {
        id: 5,
        userId: 2,
        userName: "Rafael",
        userLastname: "Nadal",
        userLegajo: 1235,
        userEmail: "rafael@nadal.com",
        registroFecha: getRandomDate(),
        registro: 2,
    },
    {
        id: 6,
        userId: 3,
        userName: "Roger",
        userLastname: "Federer",
        userLegajo: 1236,
        userEmail: "roger@federer.com",
        registroFecha: getRandomDate(),
        registro: 2,
    },
    {
        id: 1,
        userId: 1,
        userName: "Juan",
        userLastname: "Perez",
        userLegajo: 1234,
        userEmail: "ejemplo@ejemplo.com",
        registroFecha: getRandomDate(),
        registro: 1,
    },
    {
        id: 2,
        userId: 2,
        userName: "Rafael",
        userLastname: "Nadal",
        userLegajo: 1235,
        userEmail: "rafael@nadal.com",
        registroFecha: getRandomDate(),
        registro: 1,
    },
    {
        id: 3,
        userId: 3,
        userName: "Roger",
        userLastname: "Federer",
        userLegajo: 1236,
        userEmail: "roger@federer.com",
        registroFecha: getRandomDate(),
        registro: 1,
    },
    {
        id: 4,
        userId: 1,
        userName: "Juan",
        userLastname: "Perez",
        userLegajo: 1234,
        userEmail: "ejemplo@ejemplo.com",
        registroFecha: getRandomDate(),
        registro: 2,
    },
    {
        id: 5,
        userId: 2,
        userName: "Rafael",
        userLastname: "Nadal",
        userLegajo: 1235,
        userEmail: "rafael@nadal.com",
        registroFecha: getRandomDate(),
        registro: 2,
    },
    {
        id: 6,
        userId: 3,
        userName: "Roger",
        userLastname: "Federer",
        userLegajo: 1236,
        userEmail: "roger@federer.com",
        registroFecha: getRandomDate(),
        registro: 2,
    },
    {
        id: 1,
        userId: 1,
        userName: "Juan",
        userLastname: "Perez",
        userLegajo: 1234,
        userEmail: "ejemplo@ejemplo.com",
        registroFecha: getRandomDate(),
        registro: 1,
    },
    {
        id: 2,
        userId: 2,
        userName: "Rafael",
        userLastname: "Nadal",
        userLegajo: 1235,
        userEmail: "rafael@nadal.com",
        registroFecha: getRandomDate(),
        registro: 1,
    },
    {
        id: 3,
        userId: 3,
        userName: "Roger",
        userLastname: "Federer",
        userLegajo: 1236,
        userEmail: "roger@federer.com",
        registroFecha: getRandomDate(),
        registro: 1,
    },
    {
        id: 4,
        userId: 1,
        userName: "Juan",
        userLastname: "Perez",
        userLegajo: 1234,
        userEmail: "ejemplo@ejemplo.com",
        registroFecha: getRandomDate(),
        registro: 2,
    },
    {
        id: 5,
        userId: 2,
        userName: "Rafael",
        userLastname: "Nadal",
        userLegajo: 1235,
        userEmail: "rafael@nadal.com",
        registroFecha: getRandomDate(),
        registro: 2,
    },
    {
        id: 6,
        userId: 3,
        userName: "Roger",
        userLastname: "Federer",
        userLegajo: 1236,
        userEmail: "roger@federer.com",
        registroFecha: getRandomDate(),
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
        accessorKey: "userLegajo",
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
        cell: ({ row }) => <div>{row.getValue("userLegajo")}</div>,
    },
    {
        accessorKey: "userName",
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
            <div className="capitalize">{row.getValue("userName")}</div>
        ),
    },
    {
        accessorKey: "userLastname",
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
            <div className="capitalize">{row.getValue("userLastname")}</div>
        ),
    },
    {
        accessorKey: "registroFecha",
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
            <div className="capitalize">{row.getValue("registroFecha")}</div>
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
        <Box className="overflow-x-auto md:w-4/5 mx-auto">
            <Box className="flex items-center py-4 gap-2">
                <Input
                    className="w-full"
                    placeholder="Ingresar apellido"
                    value={
                        (table
                            .getColumn("userLastname")
                            ?.getFilterValue() as string) || ""
                    }
                    onChange={(e) =>
                        table
                            .getColumn("userLastname")
                            ?.setFilterValue(e.target.value)
                    }
                />
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
