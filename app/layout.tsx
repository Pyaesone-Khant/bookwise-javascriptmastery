import type { Metadata } from "next";
import "nprogress/nprogress.css";
import "./globals.css";

import { auth } from "@/auth";
import { NProgressBar } from "@/components/NProgressBar";
import { Toaster } from "@/components/ui/toaster";
import { SessionProvider } from "next-auth/react";
import localFont from "next/font/local";
import { ReactNode } from "react";

const ibmPlexSans = localFont({
  src: [
    { path: "/fonts/IBMPlexSans-Regular.ttf", weight: "400", style: "normal" },
    { path: "/fonts/IBMPlexSans-Medium.ttf", weight: "500", style: "normal" },
    { path: "/fonts/IBMPlexSans-SemiBold.ttf", weight: "600", style: "normal" },
    { path: "/fonts/IBMPlexSans-Bold.ttf", weight: "700", style: "normal" },
  ]
})

const babasNeue = localFont({
  src: [
    { path: "./fonts/BebasNeue-Regular.ttf", weight: "400", style: "normal" },
  ],
  variable: "--bebas-neue"
})

export const metadata: Metadata = {
  title: "BookWise",
  description: "A university library website powered by Next.js, guided by Javascript Mastery!",
  icons: {
    icon: "/icons/logo.svg",
  }
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {

  const session = await auth();

  return (
    <html lang="en">
      <SessionProvider
        session={session}
      >
        <body
          className={`${ibmPlexSans.className} ${babasNeue.variable} antialiased`}
        >
          <NProgressBar />
          {children}
          <Toaster />
        </body>
      </SessionProvider>
    </html>
  );
}
