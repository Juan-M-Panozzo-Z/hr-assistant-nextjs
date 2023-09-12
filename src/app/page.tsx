import { getServerSession } from "next-auth";
import UserData from "@/components/UserData";
import CheckInOutData from "@/components/CheckInOutData";
import { Section } from "@radix-ui/themes";
import NoSession from "@/components/NoSession";

const Home = async () => {
    const session = await getServerSession();
    if (!session?.user) {
        return <NoSession />;
    }

    return (
        <Section className="md:p-4">
            <UserData session={session} />
            <CheckInOutData session={session} />
        </Section>
    );
};

export default Home;
