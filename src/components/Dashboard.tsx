"use client";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";

const Dashboard = () => {
    const { data: session } = useSession();
    const router = useRouter();

    const handleSignOut = () => {
        signOut();
        router.push("/login");
        return null;
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1 className="text-6xl font-bold">Dashboard</h1>
            <p className="mt-3 text-2xl">
                Welcome {session?.user?.name ?? "Guest"}
            </p>
            <Button onClick={handleSignOut}>Sign out</Button>
        </div>
    );
};
export default Dashboard;
