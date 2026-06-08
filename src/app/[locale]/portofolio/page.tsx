import { getTranslations } from "next-intl/server";
import { createClient } from "@/lib/supabaseServer";
import { Sparkles, Calendar, Heart } from "lucide-react";
import Image from "next/image";

interface PortofolioItem {
  id: string;
  title: string;
  description: string;
  image_url: string;
  event_date: string;
}

export default async function PortofolioPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations("Portofolio");

  let items: PortofolioItem[] = [];

  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from("portofolio")
      .select("*")
      .order("event_date", { ascending: false });

    if (data) items = data;
  } catch (error) {
    console.error("Error loading portofolio from Supabase:", error);
  }

  // High-end elegant fallbacks if DB is blank
  const fallbacks: PortofolioItem[] = [
    {
      id: "1",
      title: "Pagelaran Harmoni Nusantara 2026",
      description: "Pementasan kolaboratif tari Jawa dan Bali di Gedung Kesenian Jakarta yang dihadiri oleh perwakilan duta besar negara sahabat.",
      image_url: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&q=80&w=800",
      event_date: "2026-05-12",
    },
    {
      id: "2",
      title: "Festival Tari Tradisional Ramayana",
      description: "Koreografi sendratari Ramayana kolosal luar ruangan di pelataran Candi Prambanan dengan aransemen gamelan megah.",
      image_url: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&q=80&w=800",
      event_date: "2026-04-18",
    },
    {
      id: "3",
      title: "Misi Budaya Internasional Paris",
      description: "Delegasi seniman Ritinari diundang untuk mementaskan tarian Piring dan Pendet di UNESCO Headquarters, Paris, Prancis.",
      image_url: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&q=80&w=800",
      event_date: "2026-03-02",
    },
  ];

  const finalItems = items.length > 0 ? items : fallbacks;

  return (
    <div className="py-20 w-full">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center flex flex-col items-center gap-4 mb-16">
          <span className="text-accent-gold font-bold text-xs uppercase tracking-widest flex items-center gap-1.5">
            <Sparkles className="h-4 w-4" />
            <span>Karya Kami</span>
          </span>
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-black dark:text-white font-heading">
            {t("title")}
          </h1>
          <div className="h-1.5 w-24 bg-accent-blue rounded mt-2" />
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl text-center mt-2 leading-relaxed">
            {t("subtitle")}
          </p>
        </div>

        {/* Portfolio Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {finalItems.map((item) => (
            <article
              key={item.id}
              className="bg-white dark:bg-zinc-900 border border-gray-100 dark:border-gray-800/80 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all flex flex-col h-full group"
            >
              {/* Photo */}
              <div className="relative aspect-video w-full overflow-hidden bg-gray-100 dark:bg-zinc-800">
                <Image
                  src={item.image_url}
                  alt={item.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Card Body */}
              <div className="p-6 flex flex-col flex-grow gap-4 text-left">
                {/* Event Date badge */}
                <div className="flex items-center gap-1.5 text-xs font-semibold text-accent-gold uppercase tracking-wider">
                  <Calendar className="h-3.5 w-3.5 text-accent-blue" />
                  <span>
                    {new Date(item.event_date).toLocaleDateString(locale === "id" ? "id-ID" : "en-US", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </span>
                </div>

                <h2 className="font-heading text-xl font-bold text-black dark:text-white line-clamp-1 leading-snug">
                  {item.title}
                </h2>

                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed font-light line-clamp-3">
                  {item.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
