import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import Header from "./components/Header";
import Footer from "./components/Footer";

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
          <main className="relative grid flex-1">{children}</main>
          <Footer />
        </div>
        <Toaster
          position="bottom-left"
          gutter={8}
          containerStyle={{ margin: "8px" }}
          toastOptions={{
            className: "!bg-background !text-foreground !border !py-2 !px-4 !rounded-lg !shadow-lg !max-w-lg",
            success: {
              duration: 2000,
            },
            error: {
              duration: 3000,
            },
          }}
        />
      </body>
    </html>
  );
}
