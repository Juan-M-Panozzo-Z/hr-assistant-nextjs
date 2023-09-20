import { Box, Section } from "@radix-ui/themes";
import { Button } from "./ui/button";
import Link from "next/link";

const tags = [
    { id: 1, name: "Usuarios" },
    { id: 2, name: "Sectores" },
    { id: 3, name: "Turnos" },
];
const Drawer = ({ children }: React.PropsWithChildren<{}>) => {
    return (
        <>
            <Section className="hidden md:block w-48 min-h-screen fixed top-0 left-0">
                <Box className="p-4 mt-14 space-y-4">
                    {tags.map((tag) => (
                        <Button
                            key={tag.id}
                            variant="secondary"
                            size={"lg"}
                            className="w-full justify-start"
                        >
                            <Link
                                href={`/settings#${tag.name.toLowerCase()}`}
                                passHref
                            >
                                {tag.name}
                            </Link>
                        </Button>
                    ))}
                </Box>
            </Section>
            <Box className="md:ml-48">{children}</Box>
        </>
    );
};

export default Drawer;
