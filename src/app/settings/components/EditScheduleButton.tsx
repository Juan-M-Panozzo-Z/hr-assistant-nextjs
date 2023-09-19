"use client";

import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
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
import { Button } from "@/components/ui/button";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { User, Sector, Schedule } from "@prisma/client";
import { ClockIcon } from "@radix-ui/react-icons";
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
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useState } from "react";

const basicSchema = z.object({
    startDay: z.string(),
    endDay: z.string(),
    startTime: z.string(),
    endTime: z.string(),
    startTime2: z.string().optional(),
    endTime2: z.string().optional(),
    sectorId: z.string(),
});

const EditScheduleButton = ({
    user,
    sectors,
}: {
    user: User;
    sectors: Sector[];
}) => {
    const basicForm = useForm({
        resolver: zodResolver(basicSchema),
    });

    const handleSubmit = async (data: Schedule) => {
        await axios
            .post("/api/schedule/create", {
                ...data,
                userId: user.id,
            })
            .then(({ status }) => {
                if (status === 200) {
                    window.location.reload();
                }
            });
    };

    return (
        <AlertDialog>
            <AlertDialogTrigger>
                <TooltipProvider delayDuration={100}>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button size={"sm"} variant={"ghost"}>
                                <ClockIcon />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                            <span>{`crear / editar programación de ${user.lastname}`}</span>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        Crear / editar programación de {user.lastname}
                    </AlertDialogTitle>
                </AlertDialogHeader>
                <AlertDialogDescription>
                    <Form {...basicForm}>
                        <form className="space-y-4">
                            <FormField
                                control={basicForm.control}
                                name="startDay"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Fecha de inicio</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="date"
                                                className="w-full"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={basicForm.control}
                                name="endDay"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Fecha de fin</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="date"
                                                className="w-full"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={basicForm.control}
                                name="startTime"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Hora de inicio</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="time"
                                                className="w-full"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={basicForm.control}
                                name="endTime"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Hora de fin</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="time"
                                                className="w-full"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={basicForm.control}
                                name="startTime2"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            Hora de inicio secundaria
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                type="time"
                                                className="w-full"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormDescription>
                                            Opcional
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={basicForm.control}
                                name="endTime2"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            Hora de fin secundaria
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                type="time"
                                                className="w-full"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormDescription>
                                            Opcional
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={basicForm.control}
                                name="sectorId"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Sector</FormLabel>
                                        <FormControl>
                                            <Select
                                                {...field}
                                                onValueChange={field.onChange}
                                            >
                                                <SelectTrigger>
                                                    <SelectValue
                                                        className="w-full"
                                                        placeholder="Seleccionar sector"
                                                        {...field}
                                                    ></SelectValue>
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
                            <AlertDialogFooter>
                                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                <AlertDialogAction
                                    disabled
                                    onClick={basicForm.handleSubmit(
                                        handleSubmit as any
                                    )}
                                >
                                    Confirmar
                                </AlertDialogAction>
                            </AlertDialogFooter>
                        </form>
                    </Form>
                </AlertDialogDescription>
            </AlertDialogContent>
        </AlertDialog>
    );
};

export default EditScheduleButton;
