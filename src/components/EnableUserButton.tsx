"use client";

import axios from "axios";
import { Button } from "./ui/button";
import { User } from "@prisma/client";
import { CheckIcon, QuestionMarkIcon } from "@radix-ui/react-icons";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "./ui/tooltip";
import { useRouter } from "next/navigation";

const EnableUserButton = ({ user }: { user: User }) => {
    const Router = useRouter();

    const handleSubmit = async () => {
        await axios
            .post("/api/users/enable", {
                id: user.id,
            })
            .then(() => {
                Router.refresh();
            });
    };

    return (
        <TooltipProvider delayDuration={100}>
            <Tooltip>
                <TooltipTrigger>
                    <Button
                        disabled={user.enabled}
                        value={user?.id}
                        size={"sm"}
                        variant={"secondary"}
                        onClick={handleSubmit}
                    >
                        {user.enabled ? (
                            <CheckIcon color="green" />
                        ) : (
                            <QuestionMarkIcon color="red" />
                        )}
                    </Button>
                </TooltipTrigger>
                <TooltipContent>
                    <p>Habilitar usuario</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
};

export default EnableUserButton;
