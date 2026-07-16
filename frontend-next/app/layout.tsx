"use client";

import type { Metadata } from "next";
import {
  Geist,
  Geist_Mono,
  Roboto,
  Montserrat,
  Black_Ops_One,
  Abril_Fatface,
} from "next/font/google";

import "./globals.css";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import AuthProvider from "./AuthProvider";
import WishlistProvider from "./WishlistContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});
export const roboto = Roboto({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-roboto",
});
const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  weight: ["400", "500", "600", "700"],
});
const blackOps = Black_Ops_One({
  subsets: ["latin"],
  variable: "--font-blackops",
  weight: "400",
});

const abril = Abril_Fatface({
  subsets: ["latin"],
  variable: "--font-abril",
  weight: "400",
});

export const metadata: Metadata = {
  title: "Bere har",
  description: "Build by Gpspace_Tech",
};
import { useEffect, useState } from "react";
import SplashScreen from "@/components/SplashScreen/SplashScreen";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <SplashScreen />;
  }
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${roboto.variable} ${montserrat.variable} ${blackOps.variable} ${abril.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <AuthProvider>
          <WishlistProvider>
            <Header />
            {children}
            <Footer />
          </WishlistProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
