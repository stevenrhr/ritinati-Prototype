import { createClient } from "@/lib/supabaseServer";
import { Users, FileText, Calendar, Sparkles, Clock, ArrowRight } from "lucide-react";
import { Link } from "@/i18n/routing";

export const revalidate = 0; // Disable static cache to ensure live data counts

export default async function AdminDashboardPage() {
  let pendaftarCount = 0;
  let portofolioCount = 0;
  let kontenCount = 0;
  let recentPendaftar: any[] = [];

  try {
    const supabase = await createClient();

    // Fetch total registration count
    const { count: pCount } = await supabase
      .from("pendaftaran")
      .select("*", { count: "exact", head: true });
    pendaftarCount = pCount || 0;

    // Fetch total portfolio items count
    const { count: pPort } = await supabase
      .from("portofolio")
      .select("*", { count: "exact", head: true });
    portofolioCount = pPort || 0;

    // Fetch active custom content items count
    const { count: pKonten } = await supabase
      .from("konten")
      .select("*", { count: "exact", head: true });
    kontenCount = pKonten || 0;

    // Fetch five most recent registrations
    const { data: recentData } = await supabase
      .from("pendaftaran")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(5);
    if (recentData) recentPendaftar = recentData;
  } catch (error) {
    console.error("Dashboard database fetch error:", error);
  }

  const statCards = [
    {
      title: "Total Pendaftar",
      value: pendaftarCount,
      desc: "Peserta mendaftar kelas tari",
      icon: Users,
      color: "text-blue-600 bg-blue-50 dark:bg-blue-950/20",
    },
    {
      title: "Portofolio Pertunjukan",
      value: portofolioCount,
      desc: "Acara yang didokumentasikan",
      icon: Calendar,
      color: "text-accent-gold bg-amber-50 dark:bg-amber-950/20",
    },
    {
      title: "Konten Aktif",
      value: kontenCount,
      desc: "Artikel, Pengajar, & Video",
      icon: FileText,
      color: "text-emerald-600 bg-emerald-50 dark:bg-emerald-950/20",
    },
  ];

  return (
    <div className="space-y-8 text-left">
      {/* Header banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading text-3xl font-bold text-black dark:text-white">
            Ringkasan Dashboard
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Pantau performa dan pendaftaran studio Ritinari Karya Indonesia
          </p>
        </div>
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl border border-accent-gold/40 bg-accent-gold/5 text-accent-gold text-xs font-semibold uppercase tracking-wider">
          <Sparkles className="h-4 w-4 text-accent-blue" />
          <span>Status Sistem Aktif</span>
        </div>
      </div>

      {/* Stats Cards Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {statCards.map((card, idx) => {
          const Icon = card.icon;
          return (
            <div
              key={idx}
              className="bg-white dark:bg-zinc-900 border border-gray-100 dark:border-gray-800 p-6 rounded-2xl shadow-md flex items-center justify-between gap-4"
            >
              <div className="flex flex-col gap-1">
                <span className="text-sm font-semibold text-gray-500">
                  {card.title}
                </span>
                <span className="text-3xl font-bold text-black dark:text-white">
                  {card.value}
                </span>
                <span className="text-xs text-gray-400 mt-1">{card.desc}</span>
              </div>
              <div className={`p-4 rounded-2xl shrink-0 ${card.color}`}>
                <Icon className="h-6 w-6" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Main Grid: Recent activities and actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Registrations Table */}
        <div className="bg-white dark:bg-zinc-900 border border-gray-100 dark:border-gray-800 p-6 rounded-3xl shadow-md lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-heading text-xl font-bold text-black dark:text-white flex items-center gap-2">
              <Clock className="h-5 w-5 text-accent-gold" />
              Pendaftaran Terbaru
            </h2>
            <Link
              href="/admin/pendaftar"
              className="text-xs font-bold text-accent-blue hover:text-accent-gold flex items-center gap-1"
            >
              Lihat Semua
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="overflow-x-auto">
            {recentPendaftar.length > 0 ? (
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-100 dark:border-gray-800 text-gray-500 font-semibold">
                    <th className="pb-3 text-left">Nama</th>
                    <th className="pb-3 text-left">Pilihan Kelas</th>
                    <th className="pb-3 text-left">Tanggal</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50 dark:divide-gray-800">
                  {recentPendaftar.map((p) => (
                    <tr key={p.id} className="text-gray-700 dark:text-gray-300">
                      <td className="py-3 font-semibold">{p.nama}</td>
                      <td className="py-3">
                        <span className="px-2.5 py-1 text-xs rounded-full bg-accent-blue/10 text-accent-blue font-bold">
                          {p.pilihan_kelas}
                        </span>
                      </td>
                      <td className="py-3 text-gray-500 text-xs">
                        {new Date(p.created_at).toLocaleDateString("id-ID", {
                          day: "numeric",
                          month: "short",
                        })}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="text-center py-8 text-gray-400 text-sm">
                Belum ada pendaftaran masuk.
              </div>
            )}
          </div>
        </div>

        {/* Quick Admin Actions */}
        <div className="bg-white dark:bg-zinc-900 border border-gray-100 dark:border-gray-800 p-6 rounded-3xl shadow-md space-y-4">
          <h2 className="font-heading text-xl font-bold text-black dark:text-white">
            Pintasan Cepat
          </h2>
          <div className="flex flex-col gap-2">
            <Link
              href="/admin/konten"
              className="w-full px-4 py-3 border border-gray-100 dark:border-gray-800 hover:border-accent-gold/50 rounded-xl text-sm font-semibold text-gray-700 dark:text-gray-300 hover:text-accent-blue bg-gray-50/50 dark:bg-zinc-950/20 hover:bg-white dark:hover:bg-zinc-900 transition-all text-left"
            >
              + Tambah Artikel / Video
            </Link>
            <Link
              href="/admin/media"
              className="w-full px-4 py-3 border border-gray-100 dark:border-gray-800 hover:border-accent-gold/50 rounded-xl text-sm font-semibold text-gray-700 dark:text-gray-300 hover:text-accent-blue bg-gray-50/50 dark:bg-zinc-950/20 hover:bg-white dark:hover:bg-zinc-900 transition-all text-left"
            >
              + Upload Foto Galeri
            </Link>
            <Link
              href="/admin/pendaftar"
              className="w-full px-4 py-3 border border-gray-100 dark:border-gray-800 hover:border-accent-gold/50 rounded-xl text-sm font-semibold text-gray-700 dark:text-gray-300 hover:text-accent-blue bg-gray-50/50 dark:bg-zinc-950/20 hover:bg-white dark:hover:bg-zinc-900 transition-all text-left"
            >
              Export Data Pendaftar (CSV)
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
