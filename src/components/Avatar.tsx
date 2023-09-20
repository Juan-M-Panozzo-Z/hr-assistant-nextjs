import { getServerSession } from "next-auth";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Box } from "@radix-ui/themes";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import SignOutButton from "./SignOutButton";
import Link from "next/link";
import { Button } from "./ui/button";
import { PersonIcon } from "@radix-ui/react-icons";
const AvatarNavbar = async () => {
    const session = await getServerSession();

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Avatar className="w-8 h-8">
                    <AvatarImage src="/avatar/sample.jpg" alt="user image" />
                    <AvatarFallback>
                        {session?.user?.name?.charAt(0).toUpperCase()}
                    </AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="max-w-md mr-2">
                <DropdownMenuLabel>{session?.user?.name}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                    <Link href="/profile">
                        <Button variant={"ghost"}  className="gap-1 w-full">
                            <PersonIcon className="w-4 h-4" />
                            <span>Perfil</span>
                        </Button>
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <SignOutButton />
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default AvatarNavbar;
