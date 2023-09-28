import NoSession from "@/components/NoSession";
import prisma from "@/lib/prima";
import { User } from "@prisma/client";
import { Box, Container, Section } from "@radix-ui/themes";
import { getServerSession } from "next-auth";
import Calendar from "../profile/components/Calendar";

const SchedulesPage = async () => {
    const session = await getServerSession();

    if (!session?.user) {
        return <NoSession />;
    }

    const user = await getUserData(session.user.email as string);

    return (
        <Section>
            <Container>
                <Box>
                    <Calendar userId={user?.id as number} />
                </Box>
            </Container>
        </Section>
    );
};

const getUserData = async (email: string): Promise<User | null> => {
    const user = await prisma.user.findUnique({
        where: {
            email,
        },
    });

    return user;
};

export default SchedulesPage;
