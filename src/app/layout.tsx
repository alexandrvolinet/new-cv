import type { Metadata } from "next";
import '@/styles/globals.css';
import { Header } from "@/components/shared/header/Header"
import { Footer } from "@/components/shared/Footer";
import LenisScroll from "@/lib/animations/LenisScroll";

export const metadata: Metadata = {
  title: "change Next tw gsap",
  description: "Created by somebody",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <LenisScroll>
          <Header />
          <main>{children}</main>
          <Footer />
        </LenisScroll>
      </body>
    </html>
  )
}
