import type { Metadata } from "next";
import { Figtree } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import NavbarContainer from "@/components/NavbarContainer/NavbarContainer";
import { auth } from "@/auth";
import Footer from "@/components/Footer/Footer";

const fitgree = Figtree({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Airbnb | Real estate, rentals, events & more",
  description: "Airbnb is a real estate agency in the city of Deroua, Morocco",
};

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const session = await auth();

  return (
    <html lang="en">
      <body className={`${fitgree.className} max-w-[1920px] mx-auto`}>
        <NavbarContainer session={session} />
        {children}
        <Footer />
        <Toaster />
      </body>
    </html>
  );
}
