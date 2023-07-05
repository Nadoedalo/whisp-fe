"use client";
import './globals.scss';
import { ReactNode } from "react";
import { Inter } from 'next/font/google';
import { AlertContainer } from "@/components";
import { useEffect } from "react";
import { countriesStore } from "@/store/";

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'WHISP Test Task',
  description: 'Countries Selector & Continent description done for WHISP',
}

export default function RootLayout({
  children,
}: {
  children: ReactNode
}) {
    useEffect(() => {
        // FIXME: see CountriesStore constructor for more info
        countriesStore.getCountries();
    });
  return (
    <html lang="en">
      <head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <meta name="author" content="Ihor Shamrai" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body className={inter.className}>
        {children}
        <AlertContainer />
      </body>
    </html>
  )
}
