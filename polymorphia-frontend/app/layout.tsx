"use client";

import "../styles/globals.css";
import localFont from "next/font/local";
import { League_Gothic } from "next/font/google";
import { QueryClient } from "@tanstack/query-core";
import { QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { Toaster } from "react-hot-toast";
import { TitleProvider } from "@/components/navigation/TitleContext";
import { ThemeProvider } from "next-themes";
import { createTheme, ThemeProvider as ThemeProviderMui } from "@mui/material";

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
  children: React.ReactNode;
}>) {
  const [queryClient] = useState(() => new QueryClient());

  const theme = createTheme({
    components: {
      MuiTooltip: {
        styleOverrides: {
          tooltip: {
            backgroundColor: "#262626",
            color: "#d4d4d4",
            fontFamily: "var(--font-league)",
            fontSize: 20,
            borderRadius: 8,
            padding: "8px 16px",
            display: "flex",
            alignItems: "center",
          },
          arrow: {
            color: "#262626",
          },
        },
      },
    },
  });

  return (
    <html
      lang="pl"
      className="custom-scrollbar bg-neutral-200"
      suppressHydrationWarning
    >
      <head>
        <meta name="theme-color" content="#262626" />
      </head>
      <body
        className={`${leagueGothic.className} ${leagueGothic.variable} ${materialSymbols.variable} text-primary-dark dark:text-secondary-light`}
      >
        <ThemeProviderMui theme={theme}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            storageKey="theme"
          >
            <TitleProvider>
              <QueryClientProvider client={queryClient}>
                <Toaster toastOptions={{ style: { fontSize: "1.5rem" } }} />
                {children}
              </QueryClientProvider>
            </TitleProvider>
          </ThemeProvider>
        </ThemeProviderMui>
      </body>
    </html>
  );
}
