import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const pretendard = localFont({
  src: "../fonts/PretendardVariable.ttf",
  display: "swap",
  weight: "45 920",
});

export const metadata: Metadata = {
  title: "AI-Powered Wind Power ENG",
  description: "AI-Powered Wind Power ENG",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        <link rel="shortcut icon" href="/favicon.ico" sizes="any" />
        <link href="https://api.mapbox.com/mapbox-gl-js/v3.15.0/mapbox-gl.css" rel="stylesheet" />
      </head>
      <body className={`${pretendard.className}`}>{children}</body>
    </html>
  );
}
