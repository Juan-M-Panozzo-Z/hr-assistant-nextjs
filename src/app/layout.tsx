import "./globals.css";
import type { Metadata } from "next";
import { NextAuthProvider } from "./providers";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
    title: "HR Assistant",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body>
                <NextAuthProvider>
                <Navbar />
                    {children}
                </NextAuthProvider>
            </body>
        </html>
    );
}
