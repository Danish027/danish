import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/next";
import "./globals.scss";

export const metadata: Metadata = {
  title: {
    template: "%s - Mohammed Danish",
    default: "Mohammed Danish",
  },
};

export const viewport: Viewport = {
  maximumScale: 1,
  colorScheme: "only light",
  themeColor: "#fcfcfc",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="">
      <body suppressHydrationWarning>
        <main>{children}</main>
        <Analytics />
      </body>
    </html>
  );
}
