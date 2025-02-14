import type { Metadata } from "next";
import "./globals.css";

import Header from '@/components/layout/header'

import { Kumar_One, Lora } from 'next/font/google'
const kumarOne = Kumar_One({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-kumar-one',
})

const lora = Lora({
  subsets: ['latin'],
  // Lora available weights: 400, 500, 600, 700
  weight: ['400', '500', '600', '700'],
  // Optional: include italic styles if you want
  style: ['normal', 'italic'],
  variable: '--font-lora',
})


export const metadata: Metadata = {
  title: "Pickizard",
  description: "Pickizard is a simple polling app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${kumarOne.variable} ${lora.variable} font-lora`}>
        <Header />
        {children}
      </body>
    </html>
  );
}
