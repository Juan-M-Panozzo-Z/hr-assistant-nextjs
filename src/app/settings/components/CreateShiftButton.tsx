"use client";

import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "@radix-ui/react-icons";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
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

const FormSchema = z.object({
    name: z.string().min(1).max(255),
    startTime: z.string().optional().default("00:00"),
    endTime: z.string().optional().default("00:00"),
    startTime2: z.string().optional().default("00:00"),
    endTime2: z.string().optional().default("00:00"),
    sectorId: z.coerce.number(),
});

const CreateShiftButton = ({}) => {
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
    });

    const onSubmit = async (data: z.infer<typeof FormSchema>) => {
        console.log(data);
        await axios
            .post("/api/shift/create", {
                name: data.name,
                startTime: data.startTime,
                endTime: data.endTime,
                startTime2: data.startTime2,
                endTime2: data.endTime2,
                sectorId: data.sectorId,
            })
            .then(() => {
                window.location.reload();
            });
    };

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button variant={"ghost"} size={"sm"}>
                    <PlusIcon />
                    <span className="ml-2">Crear turno</span>
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        ¿Desea crear un nuevo turno?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        <Form {...form}>
                            <form className="space-y-4">
                                <FormField
                                    control={form.control}
                                    name="name"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                Nombre del turno (ej: Mañana)
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="Nombre del turno"
                                                    {...field}
                                                />
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
                                                Hora de inicio
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="time"
                                                    placeholder="00:00"
                                                    {...field}
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
                                            <FormLabel>Hora de fin</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="time"
                                                    placeholder="00:00"
                                                    {...field}
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
                                                Hora de incio 2
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="time"
                                                    placeholder="00:00"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormDescription>
                                                (opcional)
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="endTime2"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Hora de fin 2</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="time"
                                                    placeholder="00:00"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormDescription>
                                                (opcional)
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="sectorId"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Sector</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="number"
                                                    placeholder="ID del Sector"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <AlertDialogFooter>
                                    <AlertDialogCancel>
                                        Cancelar
                                    </AlertDialogCancel>
                                    <AlertDialogAction
                                        onClick={() =>
                                            form.handleSubmit(onSubmit)()
                                        }
                                    >
                                        Crear
                                    </AlertDialogAction>
                                </AlertDialogFooter>
                            </form>
                        </Form>
                    </AlertDialogDescription>
                </AlertDialogHeader>
            </AlertDialogContent>
        </AlertDialog>
    );
};

export default CreateShiftButton;
