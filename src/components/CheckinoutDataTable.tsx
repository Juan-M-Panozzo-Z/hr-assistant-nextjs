"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { format } from "date-fns-tz";
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
import { useSession } from "next-auth/react";
import { Session } from "next-auth";

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
                    Fecha y hora
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
    const { data: session } = useSession();
    const [checkinouts, setCheckinouts] = useState<Checkinout[]>([]);
    const [sorting, setSorting] = useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>(
        {}
    );
    const [rowSelection, setRowSelection] = useState({});

    useEffect(() => {
        if (session) {
            getChecks(session).then((data) => {
                setCheckinouts(data);
            });
        }
    }, [session]);

    const data = checkinouts;

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

const getChecks = async (session: Session) => {
    const res = await axios.get(`api/checkinout/${session?.user?.email}`);
    const { data } = res;
    const { body } = data;
    let formattedData = [] as any;

    if (Array.isArray(body)) {
        formattedData = body.map((check) => {
            return {
                id: check.id,
                userId: check.user.id,
                nombre: check.user.name,
                apellido: check.user.lastname,
                legajo: check.user.legajo,
                sector: check.user.sector.name,
                email: check.user.email,
                date: format(new Date(check.createdAt), "dd/MM/yyyy HH:mm:ss"),
                registro: check.checkType,
            };
        });
    }

    return formattedData;
};
