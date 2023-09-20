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
} from "@/components/ui/tooltip";
import { Sector, Shift, User } from "@prisma/client";
import { Pencil1Icon } from "@radix-ui/react-icons";
import { TooltipTrigger } from "@radix-ui/react-tooltip";
import {
    Form,
    FormControl,
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

const FormSchema = z.object({
    name: z.string().min(1).max(255),
    users: z.array(z.number().int().positive()).optional(),
});

const EditSectorButton = ({
    sector,
}: {
    sector: Sector & { users: User[] } & { shifts: Shift[] };
}) => {
    const form = useForm({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            name: sector.name,
            users: sector?.users?.map((user: User) => user.id),
        },
    });

    const onSubmit = async (data: z.infer<typeof FormSchema>) => {
        await axios
            .post("/api/sector/update", {
                id: sector.id,
                name: data.name,
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
                                    Editar sector
                                </AlertDialogTitle>
                            </AlertDialogHeader>
                            <AlertDialogDescription>
                                <Form {...form}>
                                    <form className="space-y-4">
                                        <FormField
                                            defaultValue={sector?.name}
                                            control={form.control}
                                            name="name"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>
                                                        Nombre del sector
                                                    </FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            {...field}
                                                            placeholder="Nombre del sector"
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            defaultValue={sector?.users?.map(
                                                (user: User) => user.id
                                            )}
                                            control={form.control}
                                            name="users"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>
                                                        Usuarios
                                                    </FormLabel>
                                                    <FormControl>
                                                        <Select
                                                            {...(field as any)}
                                                        >
                                                            <SelectTrigger>
                                                                <SelectValue>
                                                                    {sector
                                                                        ?.users
                                                                        ?.length
                                                                        ? `${sector?.users?.length} usuarios`
                                                                        : "No tiene usuarios asignados"}
                                                                </SelectValue>
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                <SelectGroup>
                                                                    {sector?.users?.map(
                                                                        (
                                                                            user: User
                                                                        ) => (
                                                                            <SelectItem
                                                                                key={
                                                                                    user.id
                                                                                }
                                                                                value={user.id.toString()}
                                                                            >
                                                                                {
                                                                                    user.name
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
                    <span>{`editar ${sector.name}`}</span>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
};

export default EditSectorButton;
