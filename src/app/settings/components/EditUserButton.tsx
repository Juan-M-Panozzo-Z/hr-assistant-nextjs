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
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Pencil1Icon } from "@radix-ui/react-icons";
import { Sector, User, Shift, UserType } from "@prisma/client";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

const FormSchema = z.object({
    name: z.string().optional().default(""),
    lastname: z.string().optional().default(""),
    email: z.string().optional().default(""),
    phone: z.string().optional().default(""),
    typeId: z.coerce.number().optional().default(2),
    sectorId: z.coerce.number().optional().default(1),
    shiftId: z.coerce.number().optional().default(1),
});

const EditUserButton = ({
    user,
    sectors,
    shifts,
    userTypes,
}: {
    user: User;
    sectors: Sector[];
    shifts: Shift[];
    userTypes: UserType[];
}) => {
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
    });

    const onSubmit = async (data: z.infer<typeof FormSchema>) => {
        await axios
            .post("/api/user/update", {
                id: user.id,
                name: data.name,
                lastname: data.lastname,
                email: data.email,
                phone: data.phone,
                typeId: data.typeId,
                sectorId: data.sectorId,
                shiftId: data.shiftId,
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
                        <AlertDialogTrigger asChild>
                            <Button variant="ghost" size="sm">
                                <Pencil1Icon />
                            </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>
                                    Editar usuario
                                </AlertDialogTitle>
                            </AlertDialogHeader>
                            <AlertDialogDescription>
                                <Form {...form}>
                                    <form className="space-y-4">
                                        <FormField
                                            defaultValue={user.name}
                                            control={form.control}
                                            name="name"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>
                                                        Nombre
                                                    </FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            placeholder="Nombre"
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            defaultValue={user.lastname}
                                            control={form.control}
                                            name="lastname"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>
                                                        Apellido
                                                    </FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            placeholder="Apellido"
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            defaultValue={user.email}
                                            control={form.control}
                                            name="email"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Email</FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            placeholder="Email"
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            defaultValue={
                                                user.phone ? user.phone : ""
                                            }
                                            control={form.control}
                                            name="phone"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>
                                                        Telefono
                                                    </FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            placeholder="Telefono"
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            defaultValue={
                                                user.typeId.toString() as any
                                            }
                                            control={form.control}
                                            name="typeId"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>
                                                        Tipo de usuario
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
                                                                    defaultValue={user.typeId.toString()}
                                                                    className="w-full"
                                                                    placeholder="Seleccionar tipo de usuario"
                                                                    {...field}
                                                                />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                <SelectGroup>
                                                                    {userTypes.map(
                                                                        (
                                                                            userType
                                                                        ) => (
                                                                            <SelectItem
                                                                                key={
                                                                                    userType.id
                                                                                }
                                                                                value={userType.id.toString()}
                                                                            >
                                                                                {
                                                                                    userType.name
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
                                            defaultValue={
                                                user?.sectorId.toString() as any
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
                                                                    defaultValue={user?.sectorId.toString()}
                                                                    className="w-full"
                                                                    placeholder="Seleccionar sector"
                                                                    {...field}
                                                                ></SelectValue>
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
                                                            </SelectTrigger>
                                                        </Select>
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            defaultValue={
                                                user?.shiftId?.toString() as any
                                            }
                                            control={form.control}
                                            name="shiftId"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Turno</FormLabel>
                                                    <FormControl>
                                                        <Select
                                                            {...(field as any)}
                                                            onValueChange={
                                                                field.onChange
                                                            }
                                                        >
                                                            <SelectTrigger>
                                                                <SelectValue
                                                                    defaultValue={user?.shiftId?.toString()}
                                                                    className="w-full"
                                                                    placeholder="Seleccionar turno"
                                                                    {...field}
                                                                />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                <SelectGroup>
                                                                    {shifts.map(
                                                                        (
                                                                            shift
                                                                        ) => (
                                                                            <SelectItem
                                                                                key={
                                                                                    shift.id
                                                                                }
                                                                                value={shift.id.toString()}
                                                                            >
                                                                                {
                                                                                    shift.name
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
                                                onClick={
                                                    form.handleSubmit(onSubmit)
                                                }
                                            >
                                                Confirmar
                                            </AlertDialogAction>
                                        </AlertDialogFooter>
                                    </form>
                                </Form>
                            </AlertDialogDescription>
                        </AlertDialogContent>
                    </AlertDialog>
                </TooltipTrigger>
                <TooltipContent>
                    <span>editar usuario</span>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
};

export default EditUserButton;
