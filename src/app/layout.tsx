import type { Metadata } from "next";

import ToastProvider from "@/shared/providers/toastify-provider";
import "./globals.css";

export const metadata: Metadata = {
  title: "CRISTOCKS",
  description: "Crypto Stocks by https://github.com/cristianvarg11",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html>
      <body>
        <ToastProvider>{children}</ToastProvider>
      </body>
    </html>
  );
}
