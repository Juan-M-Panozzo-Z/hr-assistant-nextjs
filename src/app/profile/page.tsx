import { getServerSession } from "next-auth";
import { Container, Box, Section, Text } from "@radix-ui/themes";
import ProfileForm from "./components/ProfileForm";
import NoSession from "@/components/NoSession";

const ProfilePage = async () => {
    const session = await getServerSession();
    if (!session?.user) {
        return <NoSession />;
    }

    return (
        <Section>
            <Container>
                <Box>
                    <ProfileForm />
                </Box>
            </Container>
        </Section>
    );
};

export default ProfilePage;
