"use client";
import axios from "axios";
import { Section, Box, Container } from "@radix-ui/themes";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

const checkinoutPage = () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [legajo, setLegajo] = useState("");

    const handleSubmit = () => {
        axios
            .post("/api/checkinout/create", { legajo })
            .then((res) => {
                console.log(res);
                setLegajo("");
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <Section>
            <Container className="min-h-screen grid place-content-center">
                <Box>
                    <Input
                        placeholder="Ingresa tu Legajo"
                        className="h-16 sm:h-24 text-2xl"
                        value={legajo}
                        onChange={(e) => setLegajo(e.target.value)}
                    />
                </Box>
                <Box className="grid grid-cols-3 gap-2 mt-4">
                    {Array.from({ length: 9 }, (_, i) => i + 1).map((i) => (
                        <Button
                            value={i}
                            onClick={() => setLegajo(legajo + i)}
                            key={i}
                            className="col-span-1 w-24 md:w-36 h-16 sm:h-24 md:h-32 aspect-square mx-auto"
                        >
                            <span className="text-4xl font-bold">{i}</span>
                        </Button>
                    ))}
                </Box>
                <Box className="grid grid-cols-2 gap-4 mt-4">
                    <Button
                        onClick={() => setLegajo(legajo.slice(0, -1))}
                        variant={"secondary"}
                        className="w-full h-16 sm:h-24 md:h-32 aspect-square mx-auto"
                    >
                        <span className="text-4xl font-bold">Borrar</span>
                    </Button>
                    <Button
                        onClick={handleSubmit}
                        className="w-full h-16 sm:h-24 md:h-32 aspect-square mx-auto"
                    >
                        <span className="text-4xl font-bold">Ingresar</span>
                    </Button>
                </Box>
            </Container>
        </Section>
    );
};

export default checkinoutPage;
