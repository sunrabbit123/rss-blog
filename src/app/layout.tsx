import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import React from "react";
import * as styles from "./styles/layout.css";
import Image from "next/image";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "rlogs",
  description: "gather articles from rss",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <header className={styles.header}>
          <h1>RSS Blog</h1>
          <a
            href="https://github.com/sunrabbit123/rss-blog"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.githubLink}
          >
            <Image src="/github.svg" alt="GitHub" width={24} height={24} />
          </a>
        </header>
        {children}
        <footer className={styles.footer}>
          <p>© 2024 RSS Blog</p>
        </footer>
      </body>
    </html>
  );
}
