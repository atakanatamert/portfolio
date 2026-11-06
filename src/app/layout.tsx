import type { Metadata } from "next";
import "./globals.css";
import { orbitron } from "./fonts";
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
    metadataBase: new URL(SITE_URL),
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    openGraph: {
        type: "website",
        url: "/",
        siteName: SITE_NAME,
        title: SITE_NAME,
        description: SITE_DESCRIPTION,
    },
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className={`bg-gray-900 ${orbitron.className}`}>{children}</body>
        </html>
    );
}
