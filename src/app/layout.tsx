import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/next";
import "./globals.scss";

export const metadata: Metadata = {
  metadataBase: new URL("https://mohammeddanish.vercel.app"),
  title: {
    template: "%s - Mohammed Danish",
    default: "Mohammed Danish",
  },
  description: "Portfolio of Mohammed Danish.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: "/",
    title: "Mohammed Danish",
    description: "Portfolio of Mohammed Danish.",
    siteName: "Mohammed Danish",
    images: [
      {
        url: "/og-image.png",
        alt: "Mohammed Danish portfolio preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mohammed Danish",
    description: "Portfolio of Mohammed Danish.",
    images: ["/og-image.png"],
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
