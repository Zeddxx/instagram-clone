import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { QueryProvider } from "@/lib/react-query/query-client-provider";
import { ThemeProvider } from "@/context/theme-provider";
import { ModalProvider } from "@/components/shared/modal/modal-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Instagram | Clone",
  description: "Create by NextJs 14 using SSR and MongoDB.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} wrapper antialiased`}>
        <QueryProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            themes={["dark", "light", "system"]}
            disableTransitionOnChange
            storageKey="instagram-clone"
          >
            <ModalProvider />
            {children}
          </ThemeProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
