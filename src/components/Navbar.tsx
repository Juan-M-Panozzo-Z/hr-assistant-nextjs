import React, { ReactNode } from "react";
import Link from "next/link";
import { PersonIcon } from "@radix-ui/react-icons";
import { Box } from "@radix-ui/themes";
import { signOut } from "next-auth/react";
import { Button } from "./ui/button";

const Nav = ({ children }: { children: ReactNode }) => {
    return <ul className="flex gap-2">{children}</ul>;
};

const NavItem = ({ href, label }: { href: string; label: string }) => {
    return (
        <Link
            href={href}
            className={`text-xs py-1 px-2 rounded-md ${
                window.location.pathname === href
                    ? "bg-primary text-white"
                    : "text-gray-500"
            }`}
        >
            {label}
        </Link>
    );
};

export const Navbar = () => {
    return (
        <Box
            position="fixed"
            top="0"
            className="grid grid-cols-3 text-center z-10 border-b py-3 px-4 max-h-20 w-full bg-background place-items-center"
        >
            <Box className="flex gap-1 items-center mr-auto">
                <PersonIcon className="w-6 h-6 rounded-full" />
                <h1 className="text-xl font-semibold">HR Assistant</h1>
            </Box>
            <Box className="mx-auto">
                <Nav>
                    <NavItem href="/" label="Home" />
                    <NavItem href="/about" label="About" />
                    <NavItem href="/contact" label="Contact" />
                </Nav>
            </Box>
            <Box className="ml-auto">
                <Button size={"sm"} onClick={() => signOut()}>Cerrar sesión</Button>
            </Box>
        </Box>
    );
};

export default Navbar;
