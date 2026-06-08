"use client";

import { useState } from "react";
import { Link, usePathname } from "@/i18n/routing";
import { Menu, X, Flower2 } from "lucide-react";
import { useTranslations } from "next-intl";
import LanguageToggle from "./LanguageToggle";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const t = useTranslations("Navbar");
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { href: "/", label: t("home") },
    { href: "/layanan", label: t("layanan") },
    { href: "/portofolio", label: t("portofolio") },
    { href: "/gallery", label: t("gallery") },
    { href: "/daftar", label: t("daftar") },
    { href: "/kontak", label: t("kontak") },
  ];

  return (
    <nav className="sticky top-0 z-40 w-full border-b border-gray-200/80 bg-white/85 backdrop-blur-md dark:border-gray-800/80 dark:bg-black/85 transition-colors duration-300">
      <div className="batik-line" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          {/* Logo Section */}
          <Link href="/" className="flex items-center gap-2 group">
            <Flower2 className="h-7 w-7 text-accent-gold transition-transform duration-500 group-hover:rotate-45" />
            <div className="flex flex-col">
              <span className="font-heading text-lg font-bold tracking-wider text-black dark:text-white">
                RITINARI
              </span>
              <span className="text-[10px] tracking-[0.2em] font-sans font-semibold text-accent-blue uppercase">
                Karya Indonesia
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive =
                link.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(link.href);

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "relative text-sm font-semibold tracking-wide transition-colors hover:text-accent-gold",
                    isActive
                      ? "text-accent-blue dark:text-accent-blue font-bold"
                      : "text-gray-600 dark:text-gray-400"
                  )}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute -bottom-1 left-0 right-0 h-[2px] bg-accent-gold" />
                  )}
                </Link>
              );
            })}
            <LanguageToggle />
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-4 md:hidden">
            <LanguageToggle />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-500 hover:text-black dark:hover:text-white focus:outline-none"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="md:hidden border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-black px-4 pt-2 pb-6 space-y-2 animate-in slide-in-from-top duration-250">
          {navLinks.map((link) => {
            const isActive =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);

            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={cn(
                  "block px-3 py-2.5 rounded-md text-base font-semibold tracking-wide transition-colors",
                  isActive
                    ? "bg-accent-blue/10 text-accent-blue"
                    : "text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-900"
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </div>
      )}
    </nav>
  );
}
