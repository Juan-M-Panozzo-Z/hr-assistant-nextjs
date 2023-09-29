import { getServerSession } from "next-auth";
import { Container, Box, Section, Text } from "@radix-ui/themes";
import ProfileForm from "./components/ProfileForm";
import NoSession from "@/components/NoSession";
import { User } from "@prisma/client";
import prisma from "@/lib/prisma";
import Calendar from "./components/Calendar";

const ProfilePage = async () => {
    const session = await getServerSession();

    if (!session?.user) {
        return <NoSession />;
    }

    const user = await getUserData(session.user.email as string);

    return (
        <Section>
            <Container>
                <Box>
                    <ProfileForm
                        user={
                            user as User & {
                                type: { name: string };
                                sector: { name: string };
                            }
                        }
                    />
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
        include: {
            type: true,
            sector: true,
        },
    });

    return user;
};

export default ProfilePage;
