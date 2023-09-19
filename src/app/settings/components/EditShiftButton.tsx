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
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { Shift } from "@prisma/client";
import { Pencil1Icon } from "@radix-ui/react-icons";
import {
    Form,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const FormSchema = z.object({
    endTime: z.string().optional(),
    startTime: z.string().optional(),
    startTime2: z.string().optional(),
    endTime2: z.string().optional(),
});

const EditShiftButton = ({ shift }: { shift: Shift }) => {
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
    });

    return (
        <TooltipProvider delayDuration={100}>
            <Tooltip>
                <TooltipTrigger>
                    <AlertDialog>
                        <AlertDialogTrigger>
                            <Pencil1Icon />
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>
                                    Editar turno
                                </AlertDialogTitle>
                            </AlertDialogHeader>
                            <AlertDialogDescription>
                                <Form {...form}>
                                    <form className="space-y-4">
                                        <FormField
                                            control={form.control}
                                            defaultValue={shift.startTime}
                                            name="startTime"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>
                                                        Hora de inicio
                                                    </FormLabel>
                                                    <Input
                                                        {...field}
                                                        type="time"
                                                    />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            defaultValue={shift.endTime}
                                            name="endTime"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>
                                                        Hora de fin
                                                    </FormLabel>
                                                    <Input
                                                        {...field}
                                                        type="time"
                                                    />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            defaultValue={
                                                shift?.startTime2 || ""
                                            }
                                            name="startTime2"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>
                                                        Hora de inicio
                                                        secundaria
                                                    </FormLabel>
                                                    <Input
                                                        {...field}
                                                        type="time"
                                                    />
                                                    <FormDescription>
                                                        Opcional
                                                    </FormDescription>
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            defaultValue={shift?.endTime2 || ""}
                                            name="endTime2"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>
                                                        Hora de fin secundaria
                                                    </FormLabel>
                                                    <Input
                                                        {...field}
                                                        type="time"
                                                    />
                                                    <FormDescription>
                                                        Opcional
                                                    </FormDescription>
                                                </FormItem>
                                            )}
                                        />

                                        <AlertDialogFooter>
                                            <AlertDialogCancel>
                                                Cancelar
                                            </AlertDialogCancel>
                                            <AlertDialogAction
                                                type="button"
                                                onClick={() => {
                                                    console.log(
                                                        form.getValues()
                                                    );
                                                }}
                                            >
                                                Guardar
                                            </AlertDialogAction>
                                        </AlertDialogFooter>
                                    </form>
                                </Form>
                            </AlertDialogDescription>
                        </AlertDialogContent>
                    </AlertDialog>
                </TooltipTrigger>
                <TooltipContent>
                    <span>{`Editar ${shift.name}`}</span>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
};

export default EditShiftButton;
