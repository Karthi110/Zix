import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/providers/theme-provider";
import ModalProvider from "@/providers/modal-provider";
import { Toaster } from "@/components/ui/toaster";

const fonts = DM_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Zix",
  description: "Web Buider Saas,All in onr CMR",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={fonts.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ModalProvider>
            {children}
            <Toaster />
          </ModalProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
