"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Navbar from "../components/Navbar";
import UserData from "@/components/UserData";

export default function Home() {
    const { status } = useSession();
    const router = useRouter();

    if (status === "unauthenticated") {
        router.push("/login");
    }

    if (status === "authenticated") {
        return (
            <div className="">
                <Navbar />
                <UserData />
            </div>
        );
    }
}
