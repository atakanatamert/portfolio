import "./globals.css";
import { orbitron } from "./fonts";

export const metadata = {
    title: "Atakan Atamert",
    description: "Personal site of Atakan Atamert",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <link as={"image"} rel="preload" href="/assets/images/ProfilePic.webp" />
            <body className={`bg-gray-900 ${orbitron.className}`}>{children}</body>
        </html>
    );
}
