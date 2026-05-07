import type { Metadata } from "next";
import { Fraunces, Work_Sans } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

const workSans = Work_Sans({
  variable: "--font-work-sans",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "Coletivarte — Marketplace de Arte Feita à Mão",
    template: "%s | Coletivarte",
  },
  description:
    "Coletivarte é um marketplace de artesãos independentes. Descubra peças únicas feitas à mão com alma e intenção — cerâmica, joalheria, têxteis, pintura e muito mais.",
  keywords: [
    "artesanato",
    "marketplace",
    "feito à mão",
    "cerâmica",
    "joalheria",
    "arte",
    "artesão",
    "handmade",
  ],
  openGraph: {
    title: "Coletivarte — Arte Feita à Mão",
    description:
      "Descubra peças únicas de artesãos independentes. Cada obra carrega uma história.",
    type: "website",
    locale: "pt_BR",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${fraunces.variable} ${workSans.variable}`}>
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
