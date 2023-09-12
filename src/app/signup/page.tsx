"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Container, Section, Box } from "@radix-ui/themes";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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
import Link from "next/link";

const formSchema = z.object({
    name: z
        .string()
        .min(3, { message: "El nombre debe tener al menos 3 caracteres" }),
    lastname: z
        .string()
        .min(3, { message: "El apellido debe tener al menos 3 caracteres" }),
    email: z.string().email({
        message: "Por favor, ingrese un correo válido",
    }),
    password: z
        .string()
        .min(8, { message: "La contraseña debe tener al menos 8 caracteres" }),
    legajo: z.coerce
        .number()
        .int()
        .positive()
        .min(1, { message: "El legajo debe ser un número positivo" }),
});

const Register = () => {
    const router = useRouter();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
    });

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        console.log(values);
        await axios
            .post("/api/signup", values)
            .then(() => {
                router.push("/login");
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <Section className="min-h-screen grid place-items-center">
            <Container className="rounded-xl border p-6 shadow-md w-80">
                <h1 className="text-2xl font-bold">Registrarse</h1>
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
                                    <FormLabel>Nombre</FormLabel>
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
                            control={form.control}
                            name="lastname"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Apellido</FormLabel>
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
                            control={form.control}
                            name="legajo"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Legajo</FormLabel>
                                    <FormControl>
                                        {/* number */}
                                        <Input
                                            placeholder="Legajo"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Correo electrónico</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="ejemplo@correo.com"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Contraseña</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="password"
                                            placeholder="********"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Box className="flex justify-between gap-2">
                            <Button type="submit">Registrarse</Button>
                            <Link href={"/login"}>
                                <Button variant="outline">
                                    Iniciar sesión
                                </Button>
                            </Link>
                        </Box>
                    </form>
                </Form>
            </Container>
        </Section>
    );
};

export default Register;
