import React, { ReactNode } from "react";
import { getServerSession } from "next-auth";
import Link from "next/link";
import {
    PersonIcon,
    HomeIcon,
    GearIcon,
    CubeIcon,
} from "@radix-ui/react-icons";
import { Box, Text } from "@radix-ui/themes";
import AvatarNavbar from "./Avatar";
import prisma from "@/lib/prima";

const Nav = ({ children }: { children: ReactNode }) => {
    return <ul className="flex gap-2">{children}</ul>;
};

const NavItem = ({
    color,
    href,
    label,
    Icon,
}: {
    color?: string;
    href: string;
    label: string;
    Icon: ReactNode;
}) => {
    return (
        <Link
            href={href}
            className={`text-xs py-1 px-2 rounded-md hover:bg-foreground hover:text-primary-foreground duration-200 ease-in-out}`}
        >
            <div className="flex gap-1">
                {Icon}
                <Text className={`hidden md:inline ${color}`}>{label}</Text>
            </div>
        </Link>
    );
};

export const Navbar = async () => {
    const session = await getServerSession();

    if (session !== null) {
        const user = await prisma.user.findUnique({
            where: {
                email: session?.user?.email as string,
            },
        });

        return (
            <Box
                position="fixed"
                top="0"
                className="grid grid-cols-3 text-center z-20 border-b py-3 px-4 max-h-20 w-full bg-background place-items-center"
            >
                <Box className="flex gap-1 items-center mr-auto">
                    <PersonIcon className="w-6 h-6 rounded-full" />
                    <h1 className="hidden md:inline md:text-xl font-semibold">
                        HR Assistant
                    </h1>
                </Box>
                <Box className="mx-auto">
                    <Nav>
                        <NavItem href="/" Icon={<HomeIcon />} label="Home" />
                        {session.user?.email === "jmpz.94@gmail.com" && (
                            <NavItem
                                href="developement"
                                Icon={
                                    <CubeIcon
                                        color="violet"
                                        className="animate-pulse"
                                    />
                                }
                                label="Desarrollo"
                            />
                        )}
                        {user?.typeId === 1 && (
                            <NavItem
                                href="/settings"
                                Icon={<GearIcon />}
                                label="Configuraciones"
                            />
                        )}
                    </Nav>
                </Box>
                <Box className="ml-auto flex gap-1 items-center">
                    <AvatarNavbar />
                </Box>
            </Box>
        );
    }
};

export default Navbar;
