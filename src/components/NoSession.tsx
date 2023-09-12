"use client";

import { Box, Container, Section, Text } from "@radix-ui/themes";
import { Button } from "./ui/button";
import Link from "next/link";
import { useEffect } from "react";
import { redirect } from "next/navigation";
const NoSession = () => {
    useEffect(() => {
        redirect("/login");
    }, []);

    return null
};

export default NoSession;
