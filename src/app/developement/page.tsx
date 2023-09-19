import prisma from "@/lib/prima";
import { getServerSession } from "next-auth";
import { Container, Section } from "@radix-ui/themes";
import NoSession from "@/components/NoSession";

const DevelopementPage = async () => {
    const session = await getServerSession();
    if (!session) {
        return <NoSession />;
    }

    return (
        <Section>
            <Container className="md:p-4">
                <h2 className="text-2xl font-bold">Developement</h2>
            </Container>
        </Section>
    );
};

export default DevelopementPage;
