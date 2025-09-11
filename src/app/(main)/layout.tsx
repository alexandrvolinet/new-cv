import type { Metadata } from "next";
import '@/styles/globals.css';

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
        <main>{children}</main>
      </body>
    </html>
  )
}
