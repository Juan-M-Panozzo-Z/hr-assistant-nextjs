import { getServerSession } from "next-auth";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
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
import { ClockIcon, PersonIcon } from "@radix-ui/react-icons";
import { Separator } from "./ui/separator";
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
            <DropdownMenuContent className="w-56 mr-2">
                <DropdownMenuLabel>{session?.user?.name}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                    <Link href="/profile">
                        <Button
                        size={"sm"}
                        variant={"ghost"}
                        className="justify-start gap-1 w-48"
                        >
                            <PersonIcon className="w-4 h-4" />
                            <span>Perfil</span>
                        </Button>
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <Link href="/schedules">
                        <Button
                        size={"sm"}
                        variant={"ghost"}
                        className="justify-start gap-1 w-48"
                        >
                            <ClockIcon className="w-4 h-4" />
                            <span>Horarios</span>
                        </Button>
                    </Link>
                </DropdownMenuItem>
                <Separator />
                <DropdownMenuItem>
                    <SignOutButton />
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default AvatarNavbar;
