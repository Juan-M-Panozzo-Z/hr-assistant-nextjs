import { Box, Container, Section, Text } from "@radix-ui/themes";
import { Button } from "./ui/button";
import Link from "next/link";

const NoSession = () => {
    return (
        <Section>
            <Container>
                <Box display={"block"} className="flex flex-col gap-4 justify-center items-center min-h-screen">
                    <h3 className="text-xl">
                        Debe iniciar sesión para ver esta página
                    </h3>
                    <Link href="/login">
                        <Button>Ir allí</Button>
                    </Link>
                </Box>
            </Container>
        </Section>
    );
};

export default NoSession;
