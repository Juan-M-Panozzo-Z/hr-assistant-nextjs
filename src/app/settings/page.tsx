import { getServerSession } from "next-auth";
import prisma from "@/lib/prima";
import { Box, Container, Section } from "@radix-ui/themes";
import TableUsers from "@/components/TableUsers";

const SettingsPage = async () => {
    const session = await getServerSession();

    const user = await prisma.user.findUnique({
        where: {
            email: session?.user?.email as string,
        },
    });

    const userType = await prisma.userType.findUnique({
        where: {
            id: user?.typeId as number,
        },
    });

    const getAllUsers = await prisma.user.findMany();

    console.log(userType?.name);

    return (
        <Section>
            <Container className="p-4">
                <Box>
                    {userType?.name === "Administrator" && (
                        <TableUsers users={getAllUsers} />
                    )}
                </Box>
            </Container>
        </Section>
    );
};

export default SettingsPage;
