import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "IT Assist",
  description: "AI-powered IT support, simplified.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
