import { getServerSession } from "next-auth";
import prisma from "@/lib/prisma";
import NoSession from "@/components/NoSession";
import { Box, Container, Section } from "@radix-ui/themes";
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
    const getAllSectors = await prisma.sector.findMany();
    const getAllShifts = await prisma.shift.findMany();
    const getAllUserTypes = await prisma.userType.findMany();

    return (
        <Section>
            <Container className="md:p-4">
                {userType?.name === "Administrator" && (
                    <>
                        <TableUsers
                            users={getAllUsers}
                            sectors={getAllSectors}
                            shifts={getAllShifts}
                            userTypes={getAllUserTypes}
                        />
                        <TableSectors />
                        <SettingsUsers />
                    </>
                )}
            </Container>
        </Section>
    );
};

export default SettingsPage;
