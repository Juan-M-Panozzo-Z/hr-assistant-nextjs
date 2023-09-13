"use client";

import axios from "axios";
import { Button } from "./ui/button";
import { User } from "@prisma/client";
import { CheckIcon, QuestionMarkIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTrigger,
} from "./ui/alert-dialog";

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
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button
                    disabled={user.enabled}
                    value={user?.id}
                    size={"sm"}
                    variant={"ghost"}
                >
                    {user.enabled ? (
                        <CheckIcon color="green" />
                    ) : (
                        <QuestionMarkIcon color="red" />
                    )}
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogHeader>
                        ¿Desea habilitar al usuario?
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancelar</AlertDialogCancel>
                        <AlertDialogAction onClick={handleSubmit}>
                            Habilitar
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogHeader>
            </AlertDialogContent>
        </AlertDialog>
    );
};

export default EnableUserButton;

// <TooltipProvider delayDuration={100}>
// <Tooltip>
//     <TooltipTrigger>
//         <Button
//             disabled={user.enabled}
//             value={user?.id}
//             size={"sm"}
//             variant={"secondary"}
//             onClick={handleSubmit}
//         >
//             {user.enabled ? (
//                 <CheckIcon color="green" />
//             ) : (
//                 <QuestionMarkIcon color="red" />
//             )}
//         </Button>
//     </TooltipTrigger>
//     <TooltipContent>
//         <p>Habilitar usuario</p>
//     </TooltipContent>
// </Tooltip>
// </TooltipProvider>
