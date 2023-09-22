import { getServerSession } from "next-auth";
import { Container, Section } from "@radix-ui/themes";
import NoSession from "@/components/NoSession";
import prisma from "@/lib/prima";

const DevelopementPage = async () => {
    const session = await getServerSession();
    if (!session) {
        return <NoSession />;
    }

    const getAllUsers = await prisma.user.findMany({
        select: {
            id: true,
            name: true,
        },
    });

    return (
        <Section>
            <Container size="3">
                <h1 className="text-2xl font-bold">Desarrollo</h1>
            </Container>
        </Section>
    );
};

export default DevelopementPage;
