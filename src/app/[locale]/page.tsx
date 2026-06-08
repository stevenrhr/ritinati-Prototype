import { Link } from "@/i18n/routing";
import { getTranslations } from "next-intl/server";
import { createClient } from "@/lib/supabaseServer";
import { Flower2, ChevronRight, Phone, Calendar, Mail, MapPin, Users, Sparkles, Heart } from "lucide-react";
import Image from "next/image";


interface KontenItem {
  id: string;
  type: "artikel" | "youtube" | "team";
  title: string;
  content: string;
  image_url?: string;
  created_at: string;
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations("Home");
  const tNav = await getTranslations("Navbar");

  // Fetch dynamic content from Supabase
  let teamMembers: KontenItem[] = [];
  let youtubeVideos: KontenItem[] = [];

  try {
    const supabase = await createClient();
    const { data: teamData } = await supabase
      .from("konten")
      .select("*")
      .eq("type", "team")
      .order("created_at", { ascending: true });

    const { data: youtubeData } = await supabase
      .from("konten")
      .select("*")
      .eq("type", "youtube")
      .order("created_at", { ascending: false });

    if (teamData) teamMembers = teamData;
    if (youtubeData) youtubeVideos = youtubeData;
  } catch (error) {
    console.error("Error fetching content from Supabase:", error);
  }

  // Fallbacks for rich default styling
  const fallbackTeam = [
    {
      id: "1",
      title: "Ni Ketut Ritinari",
      content: "Pendiri & Direktur Artistik (Artistic Director & Founder) - Maestro Tari Bali dengan pengalaman pentas internasional selama 20+ tahun.",
      image_url: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=400",
    },
    {
      id: "2",
      title: "Raden Mas Bambang",
      content: "Koreografer Utama Tari Jawa (Lead Javanese Choreographer) - Lulusan Institut Seni Indonesia yang memadukan keanggunan klasik dengan sentuhan modern.",
      image_url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400",
    },
    {
      id: "3",
      title: "Siti Nurhaliza",
      content: "Spesialis Tari Melayu & Sumatra (Sumatran & Malay Dance Specialist) - Pengajar ramah anak yang berfokus pada pelestarian tradisi pesisir barat Nusantara.",
      image_url: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=400",
    },
  ];

  const fallbackYoutube = [
    {
      id: "1",
      title: "Pagelaran Tari Kolosal - Ritinari Karya Indonesia di Istana Negara",
      content: "https://www.youtube.com/embed/5a2d3bE_oZ0", // Indonesian dance performance URL
    },
  ];

  const finalTeam = teamMembers.length > 0 ? teamMembers : fallbackTeam;
  const finalYoutube = youtubeVideos.length > 0 ? youtubeVideos : fallbackYoutube;

  const instagramPosts = [
    "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&q=80&w=400",
    "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&q=80&w=400",
    "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&q=80&w=400",
    "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&q=80&w=400",
  ];

  return (
    <div className="flex flex-col w-full">
      {/* Hero Section with animated background scale */}
      <section className="relative h-[90vh] min-h-[600px] w-full flex items-center justify-center overflow-hidden bg-black text-white">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1598228723793-52759bba239c?auto=format&fit=crop&q=80&w=1920"
            alt="Traditional Indonesian Dancer background"
            fill
            className="object-cover opacity-60 animate-[pulse_8s_infinite] scale-105 transition-all duration-1000"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/45 to-transparent z-10" />
        </div>

        <div className="relative z-20 mx-auto max-w-4xl px-4 text-center flex flex-col items-center gap-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-accent-gold/40 bg-accent-gold/10 backdrop-blur-sm text-accent-gold text-xs font-semibold uppercase tracking-widest">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Ritinari Karya Indonesia</span>
          </div>

          <h1 className="font-heading text-5xl md:text-7xl font-bold tracking-wide leading-tight drop-shadow-md text-white">
            {t("hero.tagline")}
          </h1>

          <p className="text-lg md:text-xl text-gray-200 max-w-2xl font-light leading-relaxed">
            {t("hero.subtitle")}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mt-6">
            <Link
              href="/daftar"
              className="inline-flex h-12 items-center justify-center px-8 rounded-full bg-accent-blue text-white text-sm font-bold tracking-wider hover:bg-accent-blue/95 hover:-translate-y-0.5 active:translate-y-0 transition-all shadow-lg shadow-accent-blue/20"
            >
              {t("hero.ctaDaftar")}
              <ChevronRight className="ml-2 h-4 w-4" />
            </Link>
            <a
              href="https://wa.me/6281234567890?text=Halo%20Ritinari,%20saya%20tertarik%20pendaftaran%20kelas%20tari."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-12 items-center justify-center px-8 rounded-full border-2 border-accent-gold text-accent-gold bg-transparent text-sm font-bold tracking-wider hover:bg-accent-gold hover:text-black hover:-translate-y-0.5 active:translate-y-0 transition-all"
            >
              {t("hero.ctaWhatsapp")}
            </a>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 z-20">
          <div className="batik-line" />
        </div>
      </section>

      {/* Tentang Section */}
      <section className="py-20 bg-white dark:bg-black w-full border-b border-gray-100 dark:border-gray-900 transition-colors">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Frame Photo with elegant traditional gold details */}
            <div className="relative aspect-square max-w-md mx-auto w-full border-4 border-accent-gold/40 p-3 rounded-2xl bg-white dark:bg-zinc-950 shadow-xl">
              <div className="absolute -top-3 -left-3 h-10 w-10 border-t-4 border-l-4 border-accent-blue rounded-tl-lg" />
              <div className="absolute -bottom-3 -right-3 h-10 w-10 border-b-4 border-r-4 border-accent-blue rounded-br-lg" />
              <div className="relative w-full h-full rounded-lg overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?auto=format&fit=crop&q=80&w=800"
                  alt="Students dancing traditional Indonesia"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            {/* Right Text Content */}
            <div className="flex flex-col gap-6 text-left">
              <div className="flex items-center gap-2 text-accent-gold font-bold text-xs uppercase tracking-widest">
                <Heart className="h-4 w-4" />
                <span>{t("tentang.subtitle")}</span>
              </div>
              <h2 className="font-heading text-3xl md:text-4xl font-bold tracking-wide text-black dark:text-white">
                {t("tentang.title")}
              </h2>
              <div className="h-1 w-20 bg-accent-blue rounded" />
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-base">
                {t("tentang.p1")}
              </p>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-base">
                {t("tentang.p2")}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Layanan Section */}
      <section className="py-20 bg-gray-50/50 dark:bg-zinc-950/50 w-full border-b border-gray-100 dark:border-gray-900 transition-colors">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center gap-12">
          <div className="flex flex-col gap-3">
            <span className="text-accent-gold font-bold text-xs uppercase tracking-widest">
              {t("layanan.subtitle")}
            </span>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-black dark:text-white">
              {t("layanan.title")}
            </h2>
            <div className="h-1 w-16 bg-accent-blue rounded mx-auto mt-2" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
            {/* Service 1 */}
            <div className="bg-white dark:bg-zinc-900 border border-gray-100 dark:border-gray-800 rounded-2xl p-8 text-center flex flex-col items-center gap-5 shadow-lg shadow-gray-100/10 dark:shadow-none hover:-translate-y-1 transition-transform group">
              <div className="w-14 h-14 bg-accent-blue/10 rounded-full flex items-center justify-center text-accent-blue">
                <Flower2 className="h-7 w-7 text-accent-gold group-hover:rotate-12 transition-transform" />
              </div>
              <h3 className="font-heading text-xl font-bold text-black dark:text-white">
                {t("layanan.service1.title")}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                {t("layanan.service1.desc")}
              </p>
              <Link
                href="/layanan"
                className="mt-auto inline-flex items-center text-xs font-bold text-accent-blue group-hover:text-accent-gold transition-colors"
              >
                {t("layanan.detailButton")}
                <ChevronRight className="ml-1 h-3.5 w-3.5" />
              </Link>
            </div>

            {/* Service 2 */}
            <div className="bg-white dark:bg-zinc-900 border border-gray-100 dark:border-gray-800 rounded-2xl p-8 text-center flex flex-col items-center gap-5 shadow-lg shadow-gray-100/10 dark:shadow-none hover:-translate-y-1 transition-transform group">
              <div className="w-14 h-14 bg-accent-blue/10 rounded-full flex items-center justify-center text-accent-blue">
                <Users className="h-7 w-7 text-accent-gold group-hover:rotate-12 transition-transform" />
              </div>
              <h3 className="font-heading text-xl font-bold text-black dark:text-white">
                {t("layanan.service2.title")}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                {t("layanan.service2.desc")}
              </p>
              <Link
                href="/layanan"
                className="mt-auto inline-flex items-center text-xs font-bold text-accent-blue group-hover:text-accent-gold transition-colors"
              >
                {t("layanan.detailButton")}
                <ChevronRight className="ml-1 h-3.5 w-3.5" />
              </Link>
            </div>

            {/* Service 3 */}
            <div className="bg-white dark:bg-zinc-900 border border-gray-100 dark:border-gray-800 rounded-2xl p-8 text-center flex flex-col items-center gap-5 shadow-lg shadow-gray-100/10 dark:shadow-none hover:-translate-y-1 transition-transform group">
              <div className="w-14 h-14 bg-accent-blue/10 rounded-full flex items-center justify-center text-accent-blue">
                <Calendar className="h-7 w-7 text-accent-gold group-hover:rotate-12 transition-transform" />
              </div>
              <h3 className="font-heading text-xl font-bold text-black dark:text-white">
                {t("layanan.service3.title")}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                {t("layanan.service3.desc")}
              </p>
              <Link
                href="/layanan"
                className="mt-auto inline-flex items-center text-xs font-bold text-accent-blue group-hover:text-accent-gold transition-colors"
              >
                {t("layanan.detailButton")}
                <ChevronRight className="ml-1 h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* YouTube section */}
      <section className="py-20 bg-white dark:bg-black w-full border-b border-gray-100 dark:border-gray-900 transition-colors">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center gap-10">
          <div className="flex flex-col gap-2">
            <span className="text-accent-gold font-bold text-xs uppercase tracking-widest">
              {t("youtube.subtitle")}
            </span>
            <h2 className="font-heading text-3xl font-bold text-black dark:text-white flex items-center gap-2 justify-center">
              <svg className="h-7 w-7 text-red-600 shrink-0 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
              {t("youtube.title")}
            </h2>
            <div className="h-1 w-16 bg-accent-blue rounded mx-auto mt-2" />
          </div>

          {finalYoutube.map((video) => (
            <div
              key={video.id}
              className="w-full aspect-video rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-800 shadow-xl bg-black"
            >
              <iframe
                src={video.content}
                title={video.title}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          ))}
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-gray-50/50 dark:bg-zinc-950/50 w-full border-b border-gray-100 dark:border-gray-900 transition-colors">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center gap-12">
          <div className="flex flex-col gap-3">
            <span className="text-accent-gold font-bold text-xs uppercase tracking-widest">
              {t("team.subtitle")}
            </span>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-black dark:text-white">
              {t("team.title")}
            </h2>
            <div className="h-1 w-16 bg-accent-blue rounded mx-auto mt-2" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
            {finalTeam.map((member) => (
              <div
                key={member.id}
                className="bg-white dark:bg-zinc-900 border border-gray-100 dark:border-gray-800 rounded-2xl p-6 text-center flex flex-col items-center gap-4 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all"
              >
                <div className="relative w-28 h-28 rounded-full overflow-hidden border-2 border-accent-gold shadow-md">
                  <Image
                    src={member.image_url || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=200"}
                    alt={member.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <h3 className="font-heading text-lg font-bold text-black dark:text-white">
                    {member.title}
                  </h3>
                </div>
                <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed font-light">
                  {member.content}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Instagram Section */}
      <section className="py-20 bg-white dark:bg-black w-full border-b border-gray-100 dark:border-gray-900 transition-colors">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center gap-10">
          <div className="flex flex-col gap-2">
            <span className="text-accent-gold font-bold text-xs uppercase tracking-widest">
              {t("instagram.subtitle")}
            </span>
            <h2 className="font-heading text-3xl font-bold text-black dark:text-white flex items-center gap-2 justify-center">
              <svg className="h-7 w-7 text-pink-600 shrink-0 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/></svg>
              {t("instagram.title")}
            </h2>
            <div className="h-1 w-16 bg-accent-blue rounded mx-auto mt-2" />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full">
            {instagramPosts.map((src, i) => (
              <div
                key={i}
                className="relative aspect-square rounded-xl overflow-hidden border border-gray-100 dark:border-gray-800 shadow-md group cursor-pointer"
              >
                <Image
                  src={src}
                  alt={`Instagram post placeholder ${i + 1}`}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <svg className="h-8 w-8 text-white fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/></svg>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact & Maps Section */}
      <section className="py-20 bg-gray-50/50 dark:bg-zinc-950/50 w-full transition-colors">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">
            {/* Contact details */}
            <div className="bg-white dark:bg-zinc-900 border border-gray-100 dark:border-gray-800 p-8 rounded-2xl shadow-xl flex flex-col justify-between gap-6 text-left">
              <div className="flex flex-col gap-2">
                <span className="text-accent-gold font-bold text-xs uppercase tracking-widest">
                  Hubungi Kami
                </span>
                <h2 className="font-heading text-3xl font-bold text-black dark:text-white">
                  Studio Ritinari
                </h2>
                <div className="h-1 w-12 bg-accent-blue rounded mt-1" />
              </div>

              <div className="space-y-5 py-4">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-accent-blue/10 rounded-xl text-accent-blue">
                    <MapPin className="h-6 w-6 text-accent-gold" />
                  </div>
                  <div>
                    <h4 className="font-heading font-semibold text-black dark:text-white">Alamat Studio</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      Jl. Budaya No. 12, Jakarta, Indonesia
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 bg-accent-blue/10 rounded-xl text-accent-blue">
                    <Phone className="h-6 w-6 text-accent-gold" />
                  </div>
                  <div>
                    <h4 className="font-heading font-semibold text-black dark:text-white">WhatsApp / Telepon</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      +62 812-3456-7890
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 bg-accent-blue/10 rounded-xl text-accent-blue">
                    <Mail className="h-6 w-6 text-accent-gold" />
                  </div>
                  <div>
                    <h4 className="font-heading font-semibold text-black dark:text-white">Email Resmi</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      info@ritinari.id
                    </p>
                  </div>
                </div>
              </div>

              <a
                href="https://wa.me/6281234567890?text=Halo%20Ritinari,%20saya%20tertarik%20pendaftaran%20kelas%20tari."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full h-12 inline-flex items-center justify-center bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl text-sm font-bold tracking-wider transition-all shadow-md shadow-emerald-500/10 cursor-pointer"
              >
                Chat WhatsApp
              </a>
            </div>

            {/* Google Maps embed */}
            <div className="w-full h-[450px] lg:h-auto rounded-2xl overflow-hidden shadow-xl border border-gray-200 dark:border-gray-800">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15865.733519864239!2d106.81223945!3d-6.20658425!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f3fe2b451759%3A0x6b093c3c723f5b72!2sSemanggi%2C%20Kec.%20Setiabudi%2C%20Kota%20Jakarta%20Selatan%2C%20Daerah%20Khusus%20Ibukota%20Jakarta!5e0!3m2!1sid!2sid!4v1717830000000!5m2!1sid!2sid"
                className="w-full h-full border-0"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
