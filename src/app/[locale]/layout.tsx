import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { Playfair_Display, Inter } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AudioPlayer from "@/components/AudioPlayer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { cn } from "@/lib/utils";
import "../globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  // Retrieve the loaded messages bundle for this specific request
  const messages = await getMessages();

  return (
    <html
      lang={locale}
      className={cn(
        "h-full antialiased selection:bg-accent-gold/30 selection:text-accent-blue",
        playfair.variable,
        inter.variable
      )}
    >
      <body className="min-h-full flex flex-col bg-white dark:bg-black font-sans text-gray-900 dark:text-gray-100 transition-colors duration-300">
        <NextIntlClientProvider messages={messages}>
          <Navbar />
          <main className="flex-grow flex flex-col bg-batik-subtle">
            {children}
          </main>
          <Footer />
          <AudioPlayer />
          <WhatsAppButton />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
