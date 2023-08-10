import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Header } from "./header/header";
import { Footer } from "./footer/footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Jason Savelli",
  description: "My personal portfolio",
  viewport: {
    width: "device-width",
    initialScale: 1,
  },
};

type Props = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: Props) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main className="flex h-[100dvh] flex-col px-4 pb-4 lg:px-12 xl:px-24">
          <Header />

          {children}

          <Footer />
        </main>
      </body>
    </html>
  );
}
