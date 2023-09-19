"use client";

import axios from "axios";
import { Button } from "../../../components/ui/button";
import { User } from "@prisma/client";
import { CheckIcon, QuestionMarkIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "../../../components/ui/alert-dialog";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";

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
            <AlertDialogTrigger>
                <TooltipProvider delayDuration={100}>
                    <Tooltip>
                        <TooltipTrigger disabled={user.enabled}>
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
                        </TooltipTrigger>
                        <TooltipContent>
                            <span>Habilitar / deshabilitar usuario</span>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        ¿Desea habilitar al usuario?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        Una vez habilitado, el usuario podrá ingresar al sistema
                    </AlertDialogDescription>
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
