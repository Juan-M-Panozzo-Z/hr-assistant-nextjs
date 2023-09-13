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
                    <SignOutButton />
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default AvatarNavbar;
