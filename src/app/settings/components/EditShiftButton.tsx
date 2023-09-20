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
import { Sector, Shift } from "@prisma/client";
import { Pencil1Icon } from "@radix-ui/react-icons";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
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

const FormSchema = z.object({
    endTime: z.string(),
    startTime: z.string(),
    startTime2: z.string().optional(),
    endTime2: z.string().optional(),
    sectorId: z.coerce.number().optional(),
});

const EditShiftButton = ({
    sectors,
    shift,
}: {
    sectors: Sector[];
    shift: Shift;
}) => {
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
    });

    const onSubmit = async (data: z.infer<typeof FormSchema>) => {
        await axios
            .post("/api/shift/update", {
                id: shift.id,
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
                                        <FormField
                                            defaultValue={
                                                shift.sectorId?.toString() as any
                                            }
                                            control={form.control}
                                            name="sectorId"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>
                                                        Sector
                                                    </FormLabel>
                                                    <FormControl>
                                                        <Select
                                                            {...(field as any)}
                                                            onValueChange={
                                                                field.onChange
                                                            }
                                                        >
                                                            <SelectTrigger>
                                                                <SelectValue
                                                                    defaultValue={shift.sectorId?.toString()}
                                                                    placeholder="Seleccionar sector"
                                                                    {...field}
                                                                />
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
                                                </FormItem>
                                            )}
                                        />
                                        <AlertDialogFooter>
                                            <AlertDialogCancel>
                                                Cancelar
                                            </AlertDialogCancel>
                                            <AlertDialogAction
                                                onClick={form.handleSubmit(
                                                    onSubmit
                                                )}
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
