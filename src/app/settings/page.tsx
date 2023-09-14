import { getServerSession } from "next-auth";
import prisma from "@/lib/prima";
import NoSession from "@/components/NoSession";
import { Container, Section } from "@radix-ui/themes";
import TableUsers from "./components/TableUsers";
import SettingsUsers from "./components/SettingsUsers";
import TableSectors from "./components/TableSectors";

const SettingsPage = async () => {
    const session = await getServerSession();
    if (!session?.user) {
        return <NoSession />;
    }

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

    return (
        <Section>
            <Container className="md:p-4">
                {userType?.name === "Administrator" && (
                    <TableUsers users={getAllUsers} />
                )}
                <TableSectors />
                <SettingsUsers />
            </Container>
        </Section>
    );
};

export default SettingsPage;
