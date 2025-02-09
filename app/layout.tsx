import "./globals.css";
import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { Header } from "./header/header";
import { Footer } from "./footer/footer";
import classNames from "classnames";

const inter = Inter({ subsets: ["latin"] });

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
      <body className={classNames(inter.className, "mx-auto max-w-[1996px]")}>
        <main className="flex min-h-[100dvh] flex-col pb-4">
          <Header />

          <div className="main-layout-page-wrapper">{children}</div>
          <Footer />
        </main>
      </body>
    </html>
  );
}
