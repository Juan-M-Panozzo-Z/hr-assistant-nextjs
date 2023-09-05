"use client";

import { useSession } from "next-auth/react";

export const User = () => {
    const { data: session } = useSession();

    return <span className="bg-slate-200 p-4 rounded-full">{session?.user?.name}</span>;
};
