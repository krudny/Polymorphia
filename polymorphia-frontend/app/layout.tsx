"use client"

import "../styles/globals.css";
import localFont from "next/font/local";
import { League_Gothic } from 'next/font/google';
import {QueryClient} from "@tanstack/query-core";
import {QueryClientProvider} from "@tanstack/react-query";
import {useState} from "react";
import {Toaster} from "react-hot-toast";
import { TitleProvider } from "@/components/navigation/TitleContext";

const leagueGothic = League_Gothic({
  subsets: ['latin'],
  display: 'swap',
})

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

  return (
    <html lang="pl" className="custom-scrollbar">
      <head>
        <meta name="theme-color" content="#262626" />
      </head>
      <body className={`${leagueGothic.className} ${materialSymbols.variable} text-[#262626]`}>
        <TitleProvider>
          <QueryClientProvider client={queryClient}>
            <Toaster toastOptions={{ style: { fontSize: "1.5rem" }}} />
            {children}
          </QueryClientProvider>
        </TitleProvider>
      </body>
    </html>
  );
}
