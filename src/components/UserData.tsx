import prisma from "@/lib/prima";
import { Box, Container } from "@radix-ui/themes";
import { Badge } from "./ui/badge";

const UserData = async ({ session }: any) => {
    const user = await prisma.user.findUnique({
        where: {
            email: session.user.email,
        },
    });
    const userType = await prisma.userType.findUnique({
        where: {
            id: user?.typeId,
        },
    });

    return (
        <Container>
            <Box className="p-4">
                <div className="flex flex-row gap-2 text-center justify-center">
                    <h2 className="text-xl">{`¡Hola, ${user?.name}!`}</h2>
                    <Badge variant={"secondary"}>{userType?.name}</Badge>
                </div>
            </Box>
        </Container>
    );
};

export default UserData;
