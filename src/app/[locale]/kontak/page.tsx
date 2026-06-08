import { getTranslations } from "next-intl/server";
import { Sparkles, Phone, Mail, MapPin, Calendar, MessageSquare } from "lucide-react";

export default async function KontakPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations("Kontak");

  return (
    <div className="py-20 w-full">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center flex flex-col items-center gap-4 mb-16">
          <span className="text-accent-gold font-bold text-xs uppercase tracking-widest flex items-center gap-1.5">
            <Sparkles className="h-4 w-4" />
            <span>Hubungan Kami</span>
          </span>
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-black dark:text-white">
            {t("title")}
          </h1>
          <div className="h-1.5 w-24 bg-accent-blue rounded mt-2" />
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl text-center mt-2 leading-relaxed">
            {t("subtitle")}
          </p>
        </div>

        {/* Content grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          {/* Contact Cards Info */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div className="bg-white dark:bg-zinc-900 border border-gray-100 dark:border-gray-800 p-8 rounded-3xl shadow-xl text-left flex flex-col justify-between h-full gap-6">
              <h2 className="font-heading text-2xl font-bold text-black dark:text-white">
                {t("info.title")}
              </h2>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-accent-blue/10 rounded-xl text-accent-blue mt-0.5">
                    <MapPin className="h-6 w-6 text-accent-gold" />
                  </div>
                  <div>
                    <h3 className="font-heading font-semibold text-gray-900 dark:text-white">
                      {t("info.address")}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      Jl. Budaya No. 12, Jakarta, Indonesia
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 bg-accent-blue/10 rounded-xl text-accent-blue mt-0.5">
                    <Phone className="h-6 w-6 text-accent-gold" />
                  </div>
                  <div>
                    <h3 className="font-heading font-semibold text-gray-900 dark:text-white">
                      {t("info.phone")}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      +62 812-3456-7890
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 bg-accent-blue/10 rounded-xl text-accent-blue mt-0.5">
                    <Mail className="h-6 w-6 text-accent-gold" />
                  </div>
                  <div>
                    <h3 className="font-heading font-semibold text-gray-900 dark:text-white">
                      {t("info.email")}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      info@ritinari.id
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 bg-accent-blue/10 rounded-xl text-accent-blue mt-0.5">
                    <Calendar className="h-6 w-6 text-accent-gold" />
                  </div>
                  <div>
                    <h3 className="font-heading font-semibold text-gray-900 dark:text-white">
                      {t("info.hours")}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      {t("info.hoursValue")}
                    </p>
                  </div>
                </div>
              </div>

              {/* Social Channels */}
              <div className="border-t border-gray-100 dark:border-gray-800 pt-6 flex flex-col gap-4">
                <h3 className="text-xs font-bold uppercase tracking-widest text-accent-gold">
                  Ikuti Media Sosial Kami
                </h3>
                <div className="flex gap-4">
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-pink-500/10 text-pink-500 rounded-xl hover:bg-pink-500 hover:text-white transition-all shadow-sm"
                    aria-label="Instagram Link"
                  >
                    <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/></svg>
                  </a>
                  <a
                    href="https://youtube.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-red-500/10 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all shadow-sm"
                    aria-label="YouTube Link"
                  >
                    <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                  </a>
                  <a
                    href="https://facebook.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-blue-600/10 text-blue-600 rounded-xl hover:bg-blue-600 hover:text-white transition-all shadow-sm"
                    aria-label="Facebook Link"
                  >
                    <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Map & WA Embed details */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <div className="bg-white dark:bg-zinc-900 border border-gray-100 dark:border-gray-800 p-8 rounded-3xl shadow-xl flex flex-col gap-6 text-left">
              <h2 className="font-heading text-2xl font-bold text-black dark:text-white">
                {t("mapTitle")}
              </h2>
              {/* Google Maps embed */}
              <div className="w-full h-[320px] rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-800">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15865.733519864239!2d106.81223945!3d-6.20658425!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f3fe2b451759%3A0x6b093c3c723f5b72!2sSemanggi%2C%20Kec.%20Setiabudi%2C%20Kota%20Jakarta%20Selatan%2C%20Daerah%20Khusus%20Ibukota%20Jakarta!5e0!3m2!1sid!2sid!4v1717830000000!5m2!1sid!2sid"
                  className="w-full h-full border-0"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>

              <a
                href="https://wa.me/6281234567890?text=Halo%20Ritinari,%20saya%20tertarik%20pendaftaran%20kelas%20tari."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full h-12 inline-flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl text-sm font-bold tracking-wider transition-all shadow-md shadow-emerald-500/10 cursor-pointer"
              >
                <MessageSquare className="h-4 w-4" />
                {t("chatWhatsapp")}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
