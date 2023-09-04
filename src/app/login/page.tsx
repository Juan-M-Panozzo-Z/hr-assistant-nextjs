"use client";

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
import { Box, Container, Section } from "@radix-ui/themes";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const formSchema = z.object({
    email: z.string().email({
        message: "Por favor, ingrese un correo válido",
    }),
    password: z
        .string() 
        .min(8, { message: "La contraseña debe tener al menos 8 caracteres" }),
});

const Login = () => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const onSubmit = (values: z.infer<typeof formSchema>) => {
        console.log(values);
    };

    return (
        <Section className="min-h-screen grid place-items-center">
            <Container className="rounded-xl border p-6 shadow-md">
                <h1 className="text-2xl font-bold">Login</h1>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-4"
                    >
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
                        <Box className="flex justify-between">
                            <Button type="submit">Ingresar</Button>
                            <Link href={"/signup"}>
                                <Button variant="outline">Registrarse</Button>
                            </Link>
                        </Box>
                    </form>
                </Form>
            </Container>
        </Section>
    );
};

export default Login;
