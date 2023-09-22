"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Box, Container } from "@radix-ui/themes";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Sector, User } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { ClockIcon } from "@radix-ui/react-icons";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

const FormSchema = z.object({
    sectorId: z.coerce.number(),
    startTime: z.string(),
    endTime: z.string(),
    startTime2: z.string().optional(),
    endTime2: z.string().optional(),
});

const CreateSchedule = ({
    user,
    sectors,
}: {
    user: User;
    sectors: Sector[];
}) => {
    const [open, setOpen] = useState(false);
    const [date, setDate] = useState(new Date());
    const [month, setMonth] = useState(new Date().getMonth());
    const [year, setYear] = useState(new Date().getFullYear());

    const onSubmit = async (data: z.infer<typeof FormSchema>) => {
        console.log({
            date: date.toISOString().split("T")[0],
            userId: user.id,
            ...data,
        });
    };

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
    });

    const handlePreviousMonth = () => {
        setMonth(month - 1);
        setDate(new Date(year, month - 1, 1));
        if (month === 0) {
            setDate(new Date(year - 1, 11, 1));
            setYear(year - 1);
            setMonth(11);
        }
    };

    const handleNextMonth = () => {
        setMonth(month + 1);
        setDate(new Date(year, month + 1, 1));
        if (month === 11) {
            setDate(new Date(year + 1, 0, 1));
            setYear(year + 1);
            setMonth(0);
        }
    };

    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const daysArray = Array.from(new Array(daysInMonth), (v, i) => i + 1);

    return (
        <>
            <Dialog>
                <DialogTrigger>
                    <ClockIcon />
                </DialogTrigger>
                <DialogContent>
                    <Container className="p-4">
                        <Box className="flex justify-between items-center">
                            {date.toLocaleString("es-ES", { month: "long" })}{" "}
                            {date.getFullYear().toString()}
                            <Box className="flex items-center">
                                <Button
                                    variant="ghost"
                                    disabled={month <= new Date().getMonth()}
                                    onClick={handlePreviousMonth}
                                >
                                    Anterior
                                </Button>
                                <Button
                                    variant="ghost"
                                    disabled={
                                        month >= new Date().getMonth() + 2
                                    }
                                    onClick={handleNextMonth}
                                >
                                    Siguiente
                                </Button>
                            </Box>
                        </Box>
                        <Box className="grid grid-cols-7 border rounded-md bg-slate-100">
                            {daysArray.map((day) => (
                                <Box
                                    key={day}
                                    className="border-r border-b border-gray-100 text-center aspect-square bg-background"
                                    onClick={() => {
                                        setDate(new Date(year, month, day));
                                        setOpen(true);
                                    }}
                                >
                                    {day}
                                </Box>
                            ))}
                        </Box>
                    </Container>
                </DialogContent>
            </Dialog>
            <Dialog open={open} onOpenChange={(open) => setOpen(open)}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>
                            {` ${date.getDate()} de ${date.toLocaleString(
                                "es-ES",
                                {
                                    month: "long",
                                }
                            )} de ${date.getFullYear()}
                                    `}
                        </DialogTitle>
                        <DialogDescription>
                            <Form {...form}>
                                <form className="space-y-4">
                                    <FormField
                                        control={form.control}
                                        name="sectorId"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Sector</FormLabel>
                                                <FormControl>
                                                    <Select
                                                        {...(field as any)}
                                                        onValueChange={
                                                            field.onChange
                                                        }
                                                    >
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Seleccione un sector" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            <SelectGroup>
                                                                {sectors.map(
                                                                    (
                                                                        sector
                                                                    ) => (
                                                                        <SelectItem
                                                                            key={
                                                                                sector.id
                                                                            }
                                                                            value={sector.id.toString()}
                                                                        >
                                                                            {
                                                                                sector.name
                                                                            }
                                                                        </SelectItem>
                                                                    )
                                                                )}
                                                            </SelectGroup>
                                                        </SelectContent>
                                                    </Select>
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="startTime"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>
                                                    Hora de entrada
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        {...field}
                                                        type="time"
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="endTime"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>
                                                    Hora de salida
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        {...field}
                                                        type="time"
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="startTime2"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>
                                                    Hora de entrada 2
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        {...field}
                                                        type="time"
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                                <FormDescription>
                                                    Opcional
                                                </FormDescription>
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="endTime2"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>
                                                    Hora de salida 2
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        {...field}
                                                        type="time"
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                                <FormDescription>
                                                    Opcional
                                                </FormDescription>
                                            </FormItem>
                                        )}
                                    />
                                    <DialogFooter>
                                        <Button
                                            type="button"
                                            className="w-full"
                                            onClick={() => {
                                                setOpen(false);
                                                form.handleSubmit(onSubmit)();
                                            }}
                                        >
                                            Guardar
                                        </Button>
                                    </DialogFooter>
                                </form>
                            </Form>
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default CreateSchedule;
