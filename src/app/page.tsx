import { getServerSession } from "next-auth";
import UserData from "@/components/UserData";
import { Section } from "@radix-ui/themes";
import NoSession from "@/components/NoSession";
import { CheckinoutDataTable } from "@/components/CheckinoutDataTable";

const Home = async () => {
    const session = await getServerSession();
    if (!session?.user) {
        return <NoSession />;
    }

    return (
        <Section className="md:p-4">
            <UserData session={session} />
            <CheckinoutDataTable />
        </Section>
    );
};

export default Home;
