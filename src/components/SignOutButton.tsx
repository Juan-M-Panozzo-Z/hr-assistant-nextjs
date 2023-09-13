"use client";

import { signOut } from "next-auth/react";
import { Button } from "./ui/button";
import { LockClosedIcon } from "@radix-ui/react-icons";

const SignOutButton = () => {
    return (
        <Button size={"sm"} onClick={() => signOut()} className="gap-1">
            <LockClosedIcon className="w-4 h-4" />
            <span className="hidden md:inline">Cerrar sesión</span>
        </Button>
    );
};

export default SignOutButton;