import { getServerSession } from "next-auth";
import { Container, Box, Section, Text } from "@radix-ui/themes";
import ProfileForm from "../../components/ProfileForm";
import NoSession from "@/components/NoSession";

const ProfilePage = async () => {
    const session = await getServerSession();
    return (
        <Section className="p-4">
            <Container>
                <Box>{session 
                            ? <ProfileForm />
                            :   <NoSession />
                        }</Box>
            </Container>
        </Section>
    );
};

export default ProfilePage;
