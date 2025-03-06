import "./globals.css";
import type { Metadata, Viewport } from "next";
import { Header } from "./header/header";
import localFont from "next/font/local";
import { ThemeProvider } from "./theme/theme-provider";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { Locale, routing } from "./i18n/routing";
import { Toaster } from "@/components/ui/sonner";
import { SessionProvider } from "next-auth/react";

const sfProDisplay = localFont({
  src: [
    {
      path: "../../public/fonts/sf-pro-display-regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/sf-pro-display-medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/fonts/sf-pro-display-bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-sf-pro-display",
});

type LayoutProps = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("METADATA");

  return {
    title: t("title"),
    description: t("description"),
    metadataBase: new URL(process.env.BASE_URL ?? "http://localhost:3000"),
    openGraph: {
      title: t("title"),
      description: t("description"),
      images: [
        {
          url: "/about/me.png",
          alt: t("open-graph-image-alt"),
        },
      ],
    },
    twitter: {
      title: t("title"),
      description: t("description"),
      images: ["/about/me.png"],
      card: "summary_large_image",
    },
  };
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function Layout({ children, params }: LayoutProps) {
  const messages = await getMessages();

  const { locale } = await params;

  // Ensure that the incoming `locale` is valid
  if (!routing.locales.includes(locale as Locale)) {
    notFound();
  }

  return (
    <SessionProvider>
      <html lang={locale} suppressHydrationWarning>
        <body className={sfProDisplay.variable}>
          <NextIntlClientProvider messages={messages}>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <main className="flex min-h-[100dvh] flex-col">
                <Header />

                <div className="main-layout-px mx-auto flex w-full max-w-[var(--app-max-w)] flex-1 flex-col">
                  {children}
                </div>
              </main>

              <Toaster />
            </ThemeProvider>
          </NextIntlClientProvider>
        </body>
      </html>
    </SessionProvider>
  );
}
