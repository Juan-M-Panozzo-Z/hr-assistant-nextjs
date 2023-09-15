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
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Sector } from "@prisma/client";

const FormSchema = z.object({
    name: z.string().min(1).max(255),
    parentId: z.string().optional().default("1"),
});

const CreateSectorButton = ({ getAllSectors }: { getAllSectors: Sector[] }) => {
    const sectors = getAllSectors;

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
    });

    const onSubmit = async (data: z.infer<typeof FormSchema>) => {
        await axios
            .post("/api/sectors/create", {
                name: data.name,
                parentId: Number(data.parentId),
            })
            .then(({status}) => {
                if (status === 200) {
                    window.location.reload();
                }
            });
    };

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button variant={"ghost"} size={"sm"}>
                    <PlusIcon />
                    <span className="ml-2">Crear sector</span>
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        ¿Desea crear un nuevo sector?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        <Form {...form}>
                            <form
                                onSubmit={form.handleSubmit(onSubmit)}
                                className="space-y-4"
                            >
                                <FormField
                                    control={form.control}
                                    name="name"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                Nombre del sector
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="Nombre del sector"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="parentId"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Sector padre</FormLabel>
                                            <FormControl>
                                                <Select
                                                    {...field}
                                                    onValueChange={
                                                        field.onChange
                                                    }
                                                >
                                                    <SelectTrigger>
                                                        <SelectValue
                                                            placeholder="Seleccione un sector"
                                                            {...field}
                                                        />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectGroup>
                                                            {sectors.map(
                                                                (sectors) => (
                                                                    <SelectItem
                                                                        key={
                                                                            sectors.id
                                                                        }
                                                                        value={sectors.id.toString()}
                                                                    >
                                                                        <SelectLabel>
                                                                            {
                                                                                sectors.name
                                                                            }
                                                                        </SelectLabel>
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

export default CreateSectorButton;
