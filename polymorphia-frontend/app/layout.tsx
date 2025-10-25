"use client";

import "../styles/globals.css";
import localFont from "next/font/local";
import { League_Gothic } from "next/font/google";
import { QueryClient } from "@tanstack/query-core";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactNode, useState } from "react";
import { Toaster } from "react-hot-toast";
import { TitleProvider } from "@/components/navigation/TitleContext";
import { ThemeProvider } from "next-themes";
import { ThemeProvider as ThemeProviderMui } from "@mui/material";
import { themeConfig } from "@/components/speed-dial/config";
import BackgroundWrapper from "@/components/background-wrapper/BackgroundWrapper";

const leagueGothic = League_Gothic({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-league",
});

const materialSymbols = localFont({
  variable: "--font-family-symbols",
  style: "normal",
  src: "../node_modules/material-symbols/material-symbols-rounded.woff2",
  display: "block",
  weight: "100 700",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <html lang="pl" className="overflow-hidden" suppressHydrationWarning>
      <head>
        <meta name="theme-color" content="#262626" />
        <link rel="icon" type="image/x-icon" href="/favicon.png" />
      </head>
      <body
        className={`${leagueGothic.className} ${leagueGothic.variable} ${materialSymbols.variable} text-primary-dark dark:text-secondary-gray overflow-hidden`}
      >
        <ThemeProviderMui theme={themeConfig}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            storageKey="theme"
          >
            <TitleProvider>
              <QueryClientProvider client={queryClient}>
                <Toaster toastOptions={{ style: { fontSize: "1.5rem" } }} />
                <BackgroundWrapper className="hero-background-wrapper">
                  {children}
                </BackgroundWrapper>
              </QueryClientProvider>
            </TitleProvider>
          </ThemeProvider>
        </ThemeProviderMui>
      </body>
    </html>
  );
}
