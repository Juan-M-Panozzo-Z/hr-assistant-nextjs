"use client";

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
} from "@/components/ui/tooltip";
import { Sector } from "@prisma/client";
import { Pencil1Icon } from "@radix-ui/react-icons";
import { TooltipTrigger } from "@radix-ui/react-tooltip";

const EditSectorButton = ({ sector }: { sector: Sector }) => {

    console.log(sector)

    return (
        <TooltipProvider delayDuration={100}>
            <Tooltip>
                <TooltipTrigger>
                    <AlertDialog>
                        <AlertDialogTrigger>
                            <Pencil1Icon />
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>
                                    Editar sector
                                </AlertDialogTitle>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                <AlertDialogAction disabled>Guardar</AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </TooltipTrigger>
                <TooltipContent>
                    <span>{`editar ${sector.name}`}</span>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
};

export default EditSectorButton;
