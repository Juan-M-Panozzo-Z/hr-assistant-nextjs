"use client";

import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import axios from "axios";
import { Box, Container, Flex } from "@radix-ui/themes";
import { Badge } from "./ui/badge";
import { Skeleton } from "./ui/skeleton";

const UserData = () => {
    const { data: session } = useSession();
    const [user, setUser] = useState({
        name: "",
        lastname: "",
        email: "",
        type: { name: "" },
    });

    useEffect(() => {
        if (session) {
            axios
                .get(`/api/user?email=${session.user?.email}`)
                .then(({ data }) => {
                    setUser(data.body);
                });
        }
    }, [session]);

    return (
        <Container>
            <Flex className="p-4">
                <div className="flex flex-row gap-2 text-center justify-center">
                    {user.name.length > 0 ? (
                        <>
                            <h2 className="text-xl">
                                ¡Hola, {user?.name} {user?.lastname}!
                            </h2>
                            <Badge variant={"secondary"}>
                                {user?.type?.name}
                            </Badge>
                        </>
                    ) : (
                        <>
                            <Skeleton className="w-72 h-8"></Skeleton>
                            <Skeleton className="w-24 h-8"></Skeleton>
                        </>
                    )}
                </div>
            </Flex>
        </Container>
    );
};

export default UserData;
