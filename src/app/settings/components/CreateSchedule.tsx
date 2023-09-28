"use client";
import axios from "axios";
import { es } from "date-fns/locale";
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
import { Box } from "@radix-ui/themes";
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
import { Calendar } from "@/components/ui/calendar";
import { Separator } from "@radix-ui/react-select";

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
    const [date, setDate] = useState(new Date());
    const [schedule, setSchedule] = useState({
        date: "",
        startTime: "",
        endTime: "",
    });
    const [open, setOpen] = useState(false);

    const onSubmit = async (data: z.infer<typeof FormSchema>) => {
        await axios
            .post("/api/schedule/create", {
                date: date.toISOString().split("T")[0],
                userId: user.id,
                ...data,
            })
            .then(({ data }) => {
                setSchedule(data.body);
                open3Seconds();
            });
    };

    const open3Seconds = () => {
        setOpen(true);
        setTimeout(() => {
            setOpen(false);
        }, 3000);
    };

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
    });

    return (
        <Dialog>
            <DialogTrigger>
                <ClockIcon />
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        Crear horario para {user.name + " " + user.lastname}
                    </DialogTitle>
                </DialogHeader>
                <DialogDescription>
                    <Box className="flex flex-col gap-2 md:flex-row">
                        <Box className="flex flex-col w-full gap-2">
                            <Calendar
                                fromMonth={new Date()}
                                mode="single"
                                selected={date}
                                onSelect={setDate as any}
                                className="w-full"
                                locale={es}
                            />
                            {open && (
                                <Box className="flex flex-col justify-center mx-2 p-2 bg-green-100 rounded-md h-full">
                                    <h3 className="font-medium">
                                        Horario creado correctamente
                                    </h3>
                                    <Separator className="my-2" />
                                    <Box className="mt-4">
                                        <p>{`Fecha: ${schedule?.date}`}</p>
                                        <p>
                                            {`Hora de entrada: ${schedule?.startTime}`}
                                        </p>
                                        <p>{`Hora de salida: ${schedule?.endTime}`}</p>
                                    </Box>
                                </Box>
                            )}
                        </Box>
                        <Form {...form}>
                            <form className="space-y-2 w-full">
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
                                                                (sector) => (
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
                                                <Input {...field} type="time" />
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
                                                <Input {...field} type="time" />
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
                                                <Input {...field} type="time" />
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
                                                <Input {...field} type="time" />
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
                                            form.handleSubmit(onSubmit)();
                                        }}
                                    >
                                        Guardar
                                    </Button>
                                </DialogFooter>
                            </form>
                        </Form>
                    </Box>
                </DialogDescription>
            </DialogContent>
        </Dialog>
    );
};

export default CreateSchedule;
