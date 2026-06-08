"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/routing";
import { Globe } from "lucide-react";

export default function LanguageToggle() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  const toggleLanguage = () => {
    const nextLocale = locale === "id" ? "en" : "id";
    router.replace(pathname, { locale: nextLocale });
  };

  return (
    <button
      onClick={toggleLanguage}
      className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-gray-200 dark:border-gray-800 hover:border-accent-gold text-sm font-semibold text-gray-700 dark:text-gray-300 hover:text-accent-gold transition-all duration-300 bg-white/50 dark:bg-black/50 cursor-pointer shadow-sm"
      aria-label="Switch Language"
    >
      <Globe className="h-4 w-4 text-accent-blue" />
      <span className="tracking-wider">{locale.toUpperCase()}</span>
    </button>
  );
}
