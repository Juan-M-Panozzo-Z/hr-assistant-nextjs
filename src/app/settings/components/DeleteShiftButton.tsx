"use client";

import axios from "axios";
import { Button } from "../../../components/ui/button";
import { TrashIcon } from "@radix-ui/react-icons";
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
import { Shift } from "@prisma/client";

const DeleteShiftButton = ({ shift }: { shift: Shift }) => {
    const Router = useRouter();

    const handleSubmit = async () => {
        await axios
            .post("/api/shifts/delete", {
                id: shift.id,
            })
            .then(() => {
                Router.refresh();
            });
    };

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button size={"sm"} variant={"ghost"}>
                    <TrashIcon color="red" />
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        ¿Desea eliminar el turno?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        Una vez eliminado, el turno no podrá ser recuperado
                    </AlertDialogDescription>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancelar</AlertDialogCancel>
                        <AlertDialogAction
                            className="bg-red-500"
                            onClick={handleSubmit}
                        >
                            Elliminar
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogHeader>
            </AlertDialogContent>
        </AlertDialog>
    );
};

export default DeleteShiftButton;
