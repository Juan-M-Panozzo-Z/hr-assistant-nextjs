"use client";

import { useSession } from "next-auth/react";

export const User = () => {
    const { data: session } = useSession();

    return (
        <>
            {session?.user?.name}
            <pre>{JSON.stringify(session)}</pre>
        </>
    );
};
