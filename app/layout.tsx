import "./globals.css";
import type { Metadata, Viewport } from "next";
import { Header } from "./header/header";
import localFont from "next/font/local";
import { ThemeProvider } from "./theme/theme-provider";

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
    <html lang="en" suppressHydrationWarning>
      <body className={sfProDisplay.variable}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <main className="flex min-h-[100dvh] flex-col">
            <Header />

            <div className="main-layout-px mx-auto flex w-full max-w-[1996px] flex-1 flex-col">
              {children}
            </div>
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
