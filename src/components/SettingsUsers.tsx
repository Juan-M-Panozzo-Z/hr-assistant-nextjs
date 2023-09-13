"use client";

import { Box, Container } from "@radix-ui/themes";
import { Switch } from "./ui/switch";
import { Label } from "./ui/label";
import { useState } from "react";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "./ui/tooltip";

const SwitchComponent = ({
    id,
    label,
    message,
}: {
    id: string;
    label: string;
    message: string;
}) => {
    const [checked, setChecked] = useState(false);
    const onChange = () => {
        console.log("cambio");
        setChecked(!checked);
    };

    return (
        <Box className="flex items-center space-x-4">
            <Switch id={id} onChange={onChange} />
            <TooltipProvider delayDuration={100}>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Label htmlFor={id}>{label}</Label>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>{message}</p>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
        </Box>
    );
};

const SettingsUsers = () => {
    return (
        <Container className="md:w-4/5 mx-auto md:p-4">
            <h2 className="text-xl ">Parametros del sistema</h2>
            <Box className="grid grid-cols-2 gap-4 mt-4">
                <SwitchComponent
                    id="showExtraHours"
                    label="Mostrar Horas Extras"
                    message="Muestra las horas extras en el reporte de asistencia"
                />
                <SwitchComponent
                    id="showExtraInfo"
                    label="Mostrar Informacion Extra"
                    message="Muestra la informacion extra en el reporte de asistencia"
                />
                <SwitchComponent
                    id="sendWelcomeEmail"
                    label="Enviar Email de Bienvenida"
                    message="Envia un email de bienvenida a los usuarios"
                />
                <SwitchComponent
                    id="sendWhatsappAlert"
                    label="Enviar Alerta por Whatsapp a usuarios"
                    message="Envia una alerta por whatsapp a los usuarios"
                />
                <SwitchComponent
                    id="sendEmailReports"
                    label="Enviar Reportes por Email a administradores"
                    message="Envia un reporte por email a los administradores"
                />
                <SwitchComponent
                    id="enableCoordinators"
                    label="Habilitar Coordinadores"
                    message="Habilita la opcion de coordinadores"
                />
            </Box>
        </Container>
    );
};

export default SettingsUsers;
