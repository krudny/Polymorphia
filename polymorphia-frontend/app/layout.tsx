"use client";

import "../styles/globals.css";
import localFont from "next/font/local";
import { League_Gothic } from "next/font/google";
import { QueryClient, QueryCache, MutationCache } from "@tanstack/query-core";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactNode, useState } from "react";
import { Toaster } from "react-hot-toast";
import toast from "react-hot-toast";
import { ThemeProvider } from "next-themes";
import { ThemeProvider as ThemeProviderMui } from "@mui/material";
import { useRouter } from "next/navigation";
import { themeConfig } from "@/components/speed-dial/config";
import BackgroundWrapper from "@/components/background-wrapper/BackgroundWrapper";
import { TitleProvider } from "@/providers/title/TitleContext";
import { GENERAL_APPLICATION_ROUTES } from "@/providers/title/routes";
import { ApiError } from "@/services/api/error";
import handleUnauthorized from "@/services/api/handle-unauthorized";
import handleForbidden from "@/services/api/handle-forbidden";

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
  const router = useRouter();

  const handleApiError = (error: Error) => {
    if (!(error instanceof ApiError)) {
      return;
    }

    if (error.status === 401) {
      error.message = "Sesja wygasła. Zaloguj się ponownie.";
      void handleUnauthorized();
    }

    if (error.status === 403) {
      void handleForbidden({
        queryClient,
        router,
      });
    }

    if (error.status === 404) {
      router.push("/not-found");
      if (error.message.startsWith("No static resource")) {
        return;
      }
    }

    if (error.status === 503) {
      router.push("/");
    }

    const message =
      error.message.trim().length > 0
        ? error.message
        : "Wystąpił nieoczekiwany błąd. Spróbuj ponownie.";

    toast.error(message, {
      id: "api-error-toast",
    });
  };

  const [queryClient] = useState(
    () =>
      new QueryClient({
        queryCache: new QueryCache({
          onError: (error) => {
            handleApiError(error);
          },
        }),
        mutationCache: new MutationCache({
          onError: (error) => {
            handleApiError(error);
          },
        }),
      })
  );

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
            <TitleProvider routes={GENERAL_APPLICATION_ROUTES}>
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
