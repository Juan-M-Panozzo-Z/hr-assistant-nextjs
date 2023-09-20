import prisma from "@/lib/prima";
import { getServerSession } from "next-auth";
import { Container, Section } from "@radix-ui/themes";
import NoSession from "@/components/NoSession";
import Drawer from "./components/Drawer";

const DevelopementPage = async () => {
    const session = await getServerSession();
    if (!session) {
        return <NoSession />;
    }

    return (
        <Section>
            <Drawer>
                <Container size="3">
                    <h1 className="text-2xl font-bold">Desarrollo</h1>
                </Container>
            </Drawer>
        </Section>
    );
};

export default DevelopementPage;
