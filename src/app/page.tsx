import { getServerSession } from "next-auth";
import UserData from "@/components/UserData";
import CheckInOutData from "@/components/CheckInOutData";
import { Section } from "@radix-ui/themes";

const Home = async () => {
    const session = await getServerSession();

    return (
        <Section className="p-4">
            <UserData session={session} />
            <CheckInOutData session={session} />
        </Section>
    );
};

export default Home;
