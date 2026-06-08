import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { Flower2, Phone, Mail, MapPin } from "lucide-react";

export default function Footer() {
  const t = useTranslations("Footer");
  const tNav = useTranslations("Navbar");

  return (
    <footer className="w-full border-t border-gray-200 bg-gray-50 dark:border-gray-800 dark:bg-zinc-950 transition-colors duration-300">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Column */}
          <div className="flex flex-col gap-4 md:col-span-2">
            <Link href="/" className="flex items-center gap-2">
              <Flower2 className="h-6 w-6 text-accent-gold" />
              <div className="flex flex-col">
                <span className="font-heading text-base font-bold tracking-wider text-black dark:text-white">
                  RITINARI
                </span>
                <span className="text-[9px] tracking-[0.2em] font-sans font-semibold text-accent-blue uppercase">
                  Karya Indonesia
                </span>
              </div>
            </Link>
            <p className="text-sm text-gray-600 dark:text-gray-400 max-w-sm">
              {t("about")}
            </p>
          </div>

          {/* Links Column */}
          <div className="flex flex-col gap-3">
            <h3 className="font-heading text-sm font-semibold uppercase tracking-wider text-accent-gold">
              {t("links")}
            </h3>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li>
                <Link href="/" className="hover:text-accent-blue transition-colors">
                  {tNav("home")}
                </Link>
              </li>
              <li>
                <Link href="/layanan" className="hover:text-accent-blue transition-colors">
                  {tNav("layanan")}
                </Link>
              </li>
              <li>
                <Link href="/portofolio" className="hover:text-accent-blue transition-colors">
                  {tNav("portofolio")}
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="hover:text-accent-blue transition-colors">
                  {tNav("gallery")}
                </Link>
              </li>
              <li>
                <Link href="/admin/login" className="hover:text-accent-blue transition-colors font-medium">
                  {tNav("admin")} Login
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Column */}
          <div className="flex flex-col gap-3">
            <h3 className="font-heading text-sm font-semibold uppercase tracking-wider text-accent-gold">
              {t("contact")}
            </h3>
            <ul className="space-y-2.5 text-sm text-gray-600 dark:text-gray-400">
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 text-accent-blue mt-0.5 shrink-0" />
                <span>{t("address")}</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-accent-blue shrink-0" />
                <span>+62 812-3456-7890</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-accent-blue shrink-0" />
                <span>info@ritinari.id</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-gray-200 dark:border-gray-800 pt-6 text-center text-xs text-gray-500 dark:text-gray-500">
          <p>
            &copy; {new Date().getFullYear()} Ritinari Karya Indonesia. {t("rights")}
          </p>
        </div>
      </div>
    </footer>
  );
}
