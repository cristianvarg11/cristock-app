import type { Metadata } from "next";

import ToastProvider from "@/shared/providers/toastify-provider";
import { Header } from "@/components/ui/header";
import "./globals.css";

export const metadata: Metadata = {
  title: "CRISTOCKS",
  description: "Crypto Stocks by https://github.com/cristianvarg11",
   manifest: '/manifest.json',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html>
      <body>
        <Header/>

        <ToastProvider>{children}</ToastProvider>
      </body>
    </html>
  );
}
