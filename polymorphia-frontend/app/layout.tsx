import "./globals.css";
import { League_Gothic } from 'next/font/google';

const leagueGothic = League_Gothic({
  subsets: ['latin'],
  display: 'swap',
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pl">
      <body className={leagueGothic.className}>
        {children}
      </body>
    </html>
  );
}
