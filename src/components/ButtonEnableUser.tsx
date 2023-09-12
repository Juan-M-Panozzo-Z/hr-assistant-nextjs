"use client";

import axios from "axios";
import { Button } from "./ui/button";
import { User } from "@prisma/client";
import { CheckCircledIcon } from "@radix-ui/react-icons";

const ButtonEnableUser = ({ user }: { user: User }) => {
    const handleSubmit = async () => {
        console.log(user.id)
        const response = await axios.post("/api/user/enable", {
            id: user.id,
        });
        console.log(response);
    };

    return (
        <Button
            disabled={!user.enabled}
            value={user?.id}
            variant={"secondary"}
            onClick={handleSubmit}
        >
            <CheckCircledIcon />
        </Button>
    );
};

export default ButtonEnableUser;
