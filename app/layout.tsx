import "./globals.css";
import type { Metadata, Viewport } from "next";
import { Header } from "./header/header";
import { Footer } from "./footer/footer";
import localFont from "next/font/local";

const sfProDisplay = localFont({
  src: [
    {
      path: "../public/fonts/sf-pro-display-regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/sf-pro-display-medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/fonts/sf-pro-display-bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-sf-pro-display",
});

export const metadata: Metadata = {
  title: "Jason Savelli",
  description: "My personal portfolio",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

type Props = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: Props) {
  return (
    <html lang="en">
      <body className={`mx-auto max-w-[1996px] ${sfProDisplay.variable}`}>
        <main className="flex min-h-[100dvh] flex-col pb-4">
          <Header />

          <div className="main-layout-px">{children}</div>
          <Footer />
        </main>
      </body>
    </html>
  );
}
