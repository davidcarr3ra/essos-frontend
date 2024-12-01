import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { DoctorProvider } from "@/context/doctor-context";
import { ThemeProvider } from "@/components/theme-provider";
import NavBarWrapper from "@/components/nav-bar/nav-bar-wrapper";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Essos",
  description: "World class medical treatments across the globe",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased h-screen flex flex-col`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange
        >
          <NavBarWrapper />
          <DoctorProvider>{children}</DoctorProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
