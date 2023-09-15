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
import { Sector } from "@prisma/client";

const DeleteSectorButton = ({ sector }: { sector: Sector }) => {
    const Router = useRouter();

    const handleSubmit = async () => {
        await axios
            .post("/api/sectors/delete", {
                id: sector.id,
            })
            .then((res) => {
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
                        ¿Desea eliminar el sector?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        Una vez eliminado, el sector no podrá ser recuperado
                        pero sus usuarios serán reasignados al sector padre
                    </AlertDialogDescription>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancelar</AlertDialogCancel>
                        <AlertDialogAction
                            disabled={sector.id === 1}
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

export default DeleteSectorButton;
