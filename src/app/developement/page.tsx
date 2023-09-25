import { getServerSession } from "next-auth";
import { Container, Section } from "@radix-ui/themes";
import NoSession from "@/components/NoSession";
import prisma from "@/lib/prima";
import Calendar from "./components/Calendar";

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
            <Container className="w-4/5 mx-auto">
                <Calendar/>
            </Container>
        </Section>
    );
};

export default DevelopementPage;
