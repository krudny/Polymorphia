"use client"

import "./globals.css";
import { League_Gothic } from 'next/font/google';
import {QueryClient} from "@tanstack/query-core";
import {QueryClientProvider} from "@tanstack/react-query";
import {useState} from "react";

const leagueGothic = League_Gothic({
  subsets: ['latin'],
  display: 'swap',
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const [queryClient] = useState(() => new QueryClient());

  return (
    <html lang="pl">
      <body className={`${leagueGothic.className} text-[#262626]`}>
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </body>
    </html>
  );
}
