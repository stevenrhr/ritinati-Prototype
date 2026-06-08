import { Link } from "@/i18n/routing";
import { getTranslations } from "next-intl/server";
import { Flower2, Calendar, Sparkles, ChevronRight, Check } from "lucide-react";

export default async function LayananPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations("Layanan");

  return (
    <div className="py-20 w-full">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center flex flex-col items-center gap-4 mb-16">
          <span className="text-accent-gold font-bold text-xs uppercase tracking-widest flex items-center gap-1.5">
            <Sparkles className="h-4 w-4" />
            <span>Ritinari Karya Indonesia</span>
          </span>
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-black dark:text-white">
            {t("title")}
          </h1>
          <div className="h-1.5 w-24 bg-accent-blue rounded mt-2" />
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl text-center mt-2 leading-relaxed">
            {t("subtitle")}
          </p>
        </div>

        {/* Services List */}
        <div className="space-y-16">
          {/* Service 1 */}
          <div className="bg-white dark:bg-zinc-900 border border-gray-100 dark:border-gray-800 rounded-3xl p-8 md:p-12 shadow-xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center hover:border-accent-gold/40 transition-colors">
            <div className="lg:col-span-4 flex flex-col items-center lg:items-start text-center lg:text-left gap-4">
              <div className="w-16 h-16 bg-accent-blue/10 rounded-2xl flex items-center justify-center text-accent-blue">
                <Flower2 className="h-9 w-9 text-accent-gold" />
              </div>
              <h2 className="font-heading text-2xl font-bold text-black dark:text-white">
                {t("kelas.title")}
              </h2>
            </div>
            <div className="lg:col-span-8 flex flex-col gap-6 text-left">
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                {t("kelas.desc")}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {(t.raw("kelas.features") as string[]).map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-2.5">
                    <div className="p-0.5 rounded-full bg-accent-blue/10 text-accent-blue mt-0.5 shrink-0">
                      <Check className="h-4 w-4 text-accent-gold" />
                    </div>
                    <span className="text-sm text-gray-700 dark:text-gray-300 font-medium">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Service 2 */}
          <div className="bg-white dark:bg-zinc-900 border border-gray-100 dark:border-gray-800 rounded-3xl p-8 md:p-12 shadow-xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center hover:border-accent-gold/40 transition-colors">
            <div className="lg:col-span-4 flex flex-col items-center lg:items-start text-center lg:text-left gap-4">
              <div className="w-16 h-16 bg-accent-blue/10 rounded-2xl flex items-center justify-center text-accent-blue">
                <Sparkles className="h-9 w-9 text-accent-gold" />
              </div>
              <h2 className="font-heading text-2xl font-bold text-black dark:text-white">
                {t("show.title")}
              </h2>
            </div>
            <div className="lg:col-span-8 flex flex-col gap-6 text-left">
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                {t("show.desc")}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {(t.raw("show.features") as string[]).map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-2.5">
                    <div className="p-0.5 rounded-full bg-accent-blue/10 text-accent-blue mt-0.5 shrink-0">
                      <Check className="h-4 w-4 text-accent-gold" />
                    </div>
                    <span className="text-sm text-gray-700 dark:text-gray-300 font-medium">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Service 3 */}
          <div className="bg-white dark:bg-zinc-900 border border-gray-100 dark:border-gray-800 rounded-3xl p-8 md:p-12 shadow-xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center hover:border-accent-gold/40 transition-colors">
            <div className="lg:col-span-4 flex flex-col items-center lg:items-start text-center lg:text-left gap-4">
              <div className="w-16 h-16 bg-accent-blue/10 rounded-2xl flex items-center justify-center text-accent-blue">
                <Calendar className="h-9 w-9 text-accent-gold" />
              </div>
              <h2 className="font-heading text-2xl font-bold text-black dark:text-white">
                {t("sewa.title")}
              </h2>
            </div>
            <div className="lg:col-span-8 flex flex-col gap-6 text-left">
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                {t("sewa.desc")}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {(t.raw("sewa.features") as string[]).map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-2.5">
                    <div className="p-0.5 rounded-full bg-accent-blue/10 text-accent-blue mt-0.5 shrink-0">
                      <Check className="h-4 w-4 text-accent-gold" />
                    </div>
                    <span className="text-sm text-gray-700 dark:text-gray-300 font-medium">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* CTA Footer */}
        <div className="mt-16 text-center">
          <Link
            href="/daftar"
            className="inline-flex h-12 items-center justify-center px-10 rounded-full bg-accent-blue text-white text-sm font-bold tracking-wider hover:bg-accent-blue/95 hover:-translate-y-0.5 active:translate-y-0 transition-all shadow-lg shadow-accent-blue/20"
          >
            Daftar Sekarang
            <ChevronRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
