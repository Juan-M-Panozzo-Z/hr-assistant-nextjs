import prisma from "@/lib/prima";
import { Box, Container, Section } from "@radix-ui/themes";
import { getServerSession } from "next-auth";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

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

    return (
        <Section>
            <Container>
                <div className="grid md:grid-cols-2 gap-4">
                    <InputForm label="Nombre" value={user?.name} />
                    <InputForm label="Apellido" value={user?.lastname} />
                    <InputForm label="Email" value={user?.email} />
                    <InputForm label="Legajo" value={user?.legajo} />
                    <InputForm label="Tipo de usuario" value={type?.name} />
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
        <Box className="grid w-full items-center gap-2">
            <Label htmlFor={value}>{label}</Label>
            <Input disabled id={value} name={value} value={value} type={type} />
        </Box>
    );
};

export default ProfileForm;
