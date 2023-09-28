import { User } from "@prisma/client";
import { Box, Container, Section } from "@radix-ui/themes";
import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";
import {
    TooltipProvider,
    Tooltip,
    TooltipTrigger,
    TooltipContent,
} from "../../../components/ui/tooltip";
import Image from "next/image";

interface UserExtended extends User {
    type: {
        name: string;
    };
    sector: {
        name: string;
    };
}

const ProfileForm = async ({ user }: { user: UserExtended }) => {
    const type = user.type.name;
    const sector = user.sector.name;

    return (
        <Section>
            <Container className="md:w-4/5 mx-auto p-4 mt-4">
                <Box className="grid md:grid-cols-2 gap-4">
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
                    <InputForm label="Telefono" value={user?.phone} />
                    <InputForm label="Legajo" value={user?.legajo} />
                    <InputForm label="Tipo de usuario" value={type} />
                    <InputForm label="Sector" value={sector} />
                    <InputForm label="Turno asignado" value={user?.shiftId} />
                    <InputForm
                        label="usuario creado"
                        value={user?.createdAt.toLocaleString()}
                    />
                </Box>
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
                            value={value !== null ? value : "Sin registrar"}
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
