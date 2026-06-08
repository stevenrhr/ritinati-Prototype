import { getTranslations } from "next-intl/server";
import { createClient } from "@/lib/supabaseServer";
import { Sparkles, Image as ImageIcon } from "lucide-react";
import Image from "next/image";

interface GalleryImage {
  name: string;
  url: string;
}

export default async function GalleryPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations("Gallery");

  let images: GalleryImage[] = [];

  try {
    const supabase = await createClient();
    // List all files in the public bucket named "media"
    const { data, error } = await supabase.storage.from("media").list("", {
      limit: 100,
      sortBy: { column: "created_at", order: "desc" },
    });

    if (data && !error) {
      images = data
        .filter((file) => file.name !== ".emptyFolderPlaceholder")
        .map((file) => {
          const { data: { publicUrl } } = supabase.storage
            .from("media")
            .getPublicUrl(file.name);
          return {
            name: file.name,
            url: publicUrl,
          };
        });
    }
  } catch (error) {
    console.error("Error loading images from Supabase storage:", error);
  }

  // Elegant traditional photo placeholders for visual wow-factor
  const fallbacks: GalleryImage[] = [
    {
      name: "bali-dancer-1",
      url: "https://images.unsplash.com/photo-1598228723793-52759bba239c?auto=format&fit=crop&q=80&w=800",
    },
    {
      name: "group-practice",
      url: "https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?auto=format&fit=crop&q=80&w=800",
    },
    {
      name: "java-performance-2",
      url: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&q=80&w=800",
    },
    {
      name: "ramayana-performance",
      url: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&q=80&w=800",
    },
    {
      name: "gamelan-player",
      url: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&q=80&w=800",
    },
    {
      name: "culture-fest",
      url: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&q=80&w=800",
    },
  ];

  const finalImages = images.length > 0 ? images : fallbacks;

  return (
    <div className="py-20 w-full">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center flex flex-col items-center gap-4 mb-16">
          <span className="text-accent-gold font-bold text-xs uppercase tracking-widest flex items-center gap-1.5">
            <Sparkles className="h-4 w-4" />
            <span>Dokumentasi Visual</span>
          </span>
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-black dark:text-white">
            {t("title")}
          </h1>
          <div className="h-1.5 w-24 bg-accent-blue rounded mt-2" />
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl text-center mt-2 leading-relaxed">
            {t("subtitle")}
          </p>
        </div>

        {/* Masonry layout using CSS columns */}
        {finalImages.length > 0 ? (
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
            {finalImages.map((img, idx) => (
              <div
                key={idx}
                className="break-inside-avoid relative rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-800 shadow-md group hover:shadow-xl transition-all cursor-zoom-in"
              >
                <img
                  src={img.url}
                  alt={img.name || `Gallery photo ${idx + 1}`}
                  className="w-full h-auto object-cover group-hover:scale-[1.03] transition-transform duration-300"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/35 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                  <span className="text-white text-xs font-semibold uppercase tracking-wider bg-accent-blue/80 backdrop-blur-sm px-3 py-1 rounded-full">
                    {img.name.split("-").join(" ").split(".")[0]}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 border-2 border-dashed border-gray-200 dark:border-gray-800 rounded-2xl">
            <ImageIcon className="h-12 w-12 text-gray-300 mb-2" />
            <p className="text-sm text-gray-500">{t("noImages")}</p>
          </div>
        )}
      </div>
    </div>
  );
}
