"use client";

import { SessionProvider } from "next-auth/react";

type Props = {
    children?: React.ReactNode;
};

export const NextAuthProvider = ({ children }: Props) => {
    if (SessionProvider === undefined) {
        console.log("SessionProvider is undefined");
        return <div> SessionProvider is undefined</div>;
    }

    return <SessionProvider>{children}</SessionProvider>;
};
