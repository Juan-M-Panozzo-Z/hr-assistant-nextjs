import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { User } from "@/components/user.component";

export default async function Home() {
    const session = await getServerSession(authOptions);
    console.log(session);
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1 className="text-6xl font-bold">¡Bienvenid@ {<User />}</h1>
        </div>
    );
}
