import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import Header from "./components/Header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Paimon's Sticker Stash",
  description: "Gallery of stickers from Genshin Impact",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="flex min-h-screen flex-col">
          <Header />
          <main className="relative flex-1 grid">{children}</main>
        </div>
        <Toaster
          position="bottom-right"
          gutter={8}
          containerStyle={{ margin: "8px" }}
          toastOptions={{
            success: {
              duration: 2000,
            },
            error: {
              duration: 3000,
            },
            style: {
              fontSize: "16px",
              maxWidth: "500px",
              padding: "16px 24px",
              backgroundColor: "#334155", // bg-slate-700
              color: "#cbd5e1", // text-slate-300
            },
          }}
        />
      </body>
    </html>
  );
}
