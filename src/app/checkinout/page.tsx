"use client";
import axios from "axios";
import { Section, Box, Container } from "@radix-ui/themes";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import { CheckInOut } from "@prisma/client";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const checkinoutPage = () => {
    const [legajo, setLegajo] = useState(0);
    const [response, setResponse] = useState() as [CheckInOut] | any;

    const handleSubmit = () => {
        axios.post("/api/checkinout/create", { legajo }).then((res) => {
            if (res.data.status !== "error") {
                setLegajo(0);
                setResponse(res.data.checkinout);
            } else {
                console.log(res.data);
            }
        });
    };

    return (
        <Section>
            <Container className="min-h-screen grid place-content-center">
                <Box>
                    <Input
                        type="number"
                        placeholder="Ingresa tu Legajo"
                        className="h-16 sm:h-24 text-2xl"
                        value={legajo}
                        onChange={(e) => setLegajo(parseInt(e.target.value))}
                    />
                </Box>
                <Box className="grid grid-cols-3 gap-2 mt-4">
                    {Array.from({ length: 9 }, (_, i) => i + 1).map((i) => (
                        <Button
                            value={i}
                            onClick={() => setLegajo(legajo * 10 + i)}
                            key={i}
                            className="col-span-1 w-24 md:w-36 h-16 sm:h-24 md:h-32 aspect-square mx-auto"
                        >
                            <span className="text-4xl font-bold">{i}</span>
                        </Button>
                    ))}
                </Box>
                <Box className="grid grid-cols-2 gap-4 mt-4">
                    <Button
                        onClick={() => setLegajo(0)}
                        variant={"secondary"}
                        className="w-full h-16 sm:h-24 md:h-32 aspect-square mx-auto"
                    >
                        <span className="text-4xl font-bold">Borrar</span>
                    </Button>
                    <AlertDialog>
                        <AlertDialogTrigger>
                            <Button
                                onClick={handleSubmit}
                                className="w-full h-16 sm:h-24 md:h-32 aspect-square mx-auto"
                            >
                                <span className="text-4xl font-bold">
                                    Ingresar
                                </span>
                            </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>
                                    {response
                                        ? `Legajo ${response?.user?.legajo}`
                                        : "Error"}
                                </AlertDialogTitle>
                                <AlertDialogDescription>
                                    {response
                                        ? `
                                           El usuario {response?.user?.name}{" "}
                                           {response?.user?.lastname} marco un registro
                                           a las{" "}
                                           {response?.createdAt?.toLocaleString(
                                               "es-AR",
                                               {
                                                   hour: "numeric",
                                                   minute: "numeric",
                                                   second: "numeric",
                                               }
                                           )}`
                                        : "El usuario no existe"}
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogAction
                                    onClick={() => setResponse(null)}
                                >
                                    Cerrar
                                </AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </Box>
            </Container>
        </Section>
    );
};

export default checkinoutPage;
