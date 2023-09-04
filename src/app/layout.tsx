import "./globals.css";
import "@radix-ui/themes/styles.css";
import type { Metadata } from "next";
import { Theme, ThemePanel } from "@radix-ui/themes";

export const metadata: Metadata = {
    title: "HR Assistant",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="es" suppressHydrationWarning>
            <body>
                    <Theme accentColor="tomato" radius="large">
                        {children}
                        {/* <ThemePanel /> */}
                    </Theme>
            </body>
        </html>
    );
}
