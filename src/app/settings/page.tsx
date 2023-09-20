import { getServerSession } from "next-auth";
import prisma from "@/lib/prima";
import NoSession from "@/components/NoSession";
import { Box, Container, Section } from "@radix-ui/themes";
import TableUsers from "./components/TableUsers";
import SettingsUsers from "./components/SettingsUsers";
import TableSectors from "./components/TableSectors";
import TableShifts from "./components/TableShifts";
import Drawer from "../developement/components/Drawer";

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
            <Drawer>
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
                            <TableShifts />
                            <SettingsUsers />
                        </>
                    )}
                </Container>
            </Drawer>
        </Section>
    );
};

export default SettingsPage;
