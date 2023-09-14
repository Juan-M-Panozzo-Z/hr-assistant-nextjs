import prisma from "@/lib/prima";
import { Box, Container, Section } from "@radix-ui/themes";
import { getServerSession } from "next-auth";
import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";
import {
    TooltipProvider,
    Tooltip,
    TooltipTrigger,
    TooltipContent,
} from "../../../components/ui/tooltip";
import Image from "next/image";

const ProfileForm = async () => {
    const session = await getServerSession();
    const user = await prisma.user.findUnique({
        where: {
            email: session?.user?.email as string,
        },
    });
    const type = await prisma.userType.findUnique({
        where: {
            id: user?.typeId as number,
        },
    });

    const sector = await prisma.sector.findUnique({
        where: {
            id: user?.sectorId as number,
        },
    });

    return (
        <Section>
            <Container className="md:w-4/5 mx-auto p-4 mt-4">
                <div className="grid md:grid-cols-2 gap-4">
                    <Box className="md:col-span-2 mx-auto">
                        <Image
                            src={"/avatar/sample.jpg"}
                            alt="user image"
                            width={200}
                            height={200}
                            className="rounded-full"
                        />
                    </Box>
                    <InputForm label="Nombre" value={user?.name} />
                    <InputForm label="Apellido" value={user?.lastname} />
                    <InputForm label="Email" value={user?.email} />
                    <InputForm label="Legajo" value={user?.legajo} />
                    <InputForm label="Tipo de usuario" value={type?.name} />
                    <InputForm label="Sector" value={sector?.name} />
                    <InputForm
                        label="usuario creado"
                        value={user?.createdAt.toLocaleString()}
                    />
                </div>
            </Container>
        </Section>
    );
};

const InputForm = ({ label, value, type = "text" }: any) => {
    return (
        <TooltipProvider delayDuration={100}>
            <Tooltip>
                <TooltipTrigger>
                    <Box className="grid w-full items-center gap-4 text-left">
                        <Label htmlFor={value}>{label}</Label>
                        <Input
                            disabled
                            id={value}
                            name={value}
                            value={value}
                            type={type}
                        />
                    </Box>
                </TooltipTrigger>
                <TooltipContent>
                    <p>Actualmente no puede modificarse</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
};

export default ProfileForm;
