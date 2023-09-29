import { getServerSession } from "next-auth";
import { Container, Section } from "@radix-ui/themes";
import NoSession from "@/components/NoSession";
import prisma from "@/lib/prisma";

const DevelopementPage = async () => {
    const session = await getServerSession();
    if (!session) {
        return <NoSession />;
    }

    return (
        <Section>
            <Container className="w-4/5 mx-auto">
            </Container>
        </Section>
    );
};

export default DevelopementPage;
