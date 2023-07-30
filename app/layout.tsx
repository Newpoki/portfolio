import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Header } from "./header/header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Jason Savelli",
  description: "My personal portfolio",
};

type IRootLayout = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: IRootLayout) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main className="px-4 lg:px-12">
          <Header />
          {children}
        </main>
      </body>
    </html>
  );
}
