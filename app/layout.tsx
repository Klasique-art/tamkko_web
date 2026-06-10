import { Nunito, Rhodium_Libre, Metrophobic } from "next/font/google";
import "./globals.css";

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  display: 'swap',
  preload: true,
});

const rhodiumLibre = Rhodium_Libre({
  variable: "--font-rhodium-libre",
  subsets: ["latin"],
  weight: ["400"],
  display: 'swap',
  preload: true,
});

const metrophobic = Metrophobic({
  variable: "--font-metrophobic",
  subsets: ["latin"],
  weight: ["400"],
  display: 'swap',
  preload: true,
});


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${nunito.variable} ${rhodiumLibre.variable} ${metrophobic.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}