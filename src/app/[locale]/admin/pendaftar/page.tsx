"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { Users, Download, Search, Sparkles, Calendar, Trash2 } from "lucide-react";

interface PendaftarItem {
  id: string;
  nama: string;
  email: string;
  no_hp: string;
  pilihan_kelas: string;
  pesan?: string;
  created_at: string;
}

export default function AdminPendaftarPage() {
  const [items, setItems] = useState<PendaftarItem[]>([]);
  const [filteredItems, setFilteredItems] = useState<PendaftarItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");

  const loadPendaftar = async () => {
    setLoading(true);
    try {
      const { data, error: fetchError } = await supabase
        .from("pendaftaran")
        .select("*")
        .order("created_at", { ascending: false });

      if (fetchError) throw fetchError;
      setItems(data || []);
      setFilteredItems(data || []);
    } catch (err: any) {
      setError(err.message || "Failed to load registrations");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPendaftar();
  }, []);

  // Handle Search Filtering
  useEffect(() => {
    const q = search.toLowerCase();
    const filtered = items.filter(
      (item) =>
        item.nama.toLowerCase().includes(q) ||
        item.email.toLowerCase().includes(q) ||
        item.pilihan_kelas.toLowerCase().includes(q) ||
        (item.pesan && item.pesan.toLowerCase().includes(q))
    );
    setFilteredItems(filtered);
  }, [search, items]);

  // Handle Delete Item
  const handleDelete = async (id: string) => {
    if (!confirm("Apakah Anda yakin ingin menghapus pendaftar ini dari database?")) return;

    try {
      const { error: deleteError } = await supabase
        .from("pendaftaran")
        .delete()
        .eq("id", id);

      if (deleteError) throw deleteError;
      loadPendaftar();
    } catch (err: any) {
      setError(err.message || "Failed to delete registration record");
    }
  };

  // Export local state to CSV
  const handleExportCSV = () => {
    if (items.length === 0) return;

    const headers = ["Nama", "Email", "Nomor HP / WhatsApp", "Pilihan Kelas", "Pesan Tambahan", "Tanggal Pendaftaran"];
    const rows = items.map((item) => [
      item.nama,
      item.email,
      item.no_hp,
      item.pilihan_kelas,
      item.pesan || "",
      new Date(item.created_at).toLocaleString("id-ID"),
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows.map((e) => e.map((val) => `"${val.replace(/"/g, '""')}"`).join(","))].join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `pendaftar_ritinari_${new Date().toISOString().split("T")[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-8 text-left">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading text-3xl font-bold text-black dark:text-white">
            Data Pendaftaran Kelas
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Lihat semua peserta pendaftar studio dan eksport data ke format CSV
          </p>
        </div>

        <button
          onClick={handleExportCSV}
          disabled={items.length === 0}
          className="inline-flex h-11 items-center justify-center gap-2 px-5 bg-accent-blue text-white rounded-xl text-sm font-bold tracking-wider hover:bg-accent-blue/95 transition-all shadow-md shadow-accent-blue/15 cursor-pointer disabled:opacity-50"
        >
          <Download className="h-4.5 w-4.5" />
          <span>Export ke CSV</span>
        </button>
      </div>

      {/* Filter and Table Container */}
      <div className="bg-white dark:bg-zinc-900 border border-gray-100 dark:border-gray-800 rounded-3xl shadow-xl p-6 space-y-6">
        {/* Search Bar */}
        <div className="relative max-w-md w-full">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
            <Search className="h-5 w-5" />
          </div>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Cari nama, email, atau kelas..."
            className="pl-11 w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-800 bg-transparent text-sm focus:border-accent-gold focus:outline-none focus:ring-1 focus:ring-accent-gold dark:text-white"
          />
        </div>

        {/* Table list */}
        <div className="overflow-x-auto">
          {loading ? (
            <div className="text-center py-16 text-sm text-gray-400">Loading data pendaftar...</div>
          ) : filteredItems.length > 0 ? (
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-800 text-gray-500 font-bold">
                  <th className="pb-3 text-left">Nama</th>
                  <th className="pb-3 text-left">Email</th>
                  <th className="pb-3 text-left">WhatsApp</th>
                  <th className="pb-3 text-left">Pilihan Kelas</th>
                  <th className="pb-3 text-left">Catatan</th>
                  <th className="pb-3 text-left">Tanggal</th>
                  <th className="pb-3 text-center">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                {filteredItems.map((item) => (
                  <tr key={item.id} className="text-gray-700 dark:text-gray-300 hover:bg-gray-50/50 dark:hover:bg-zinc-800/20">
                    <td className="py-4 font-semibold text-black dark:text-white">{item.nama}</td>
                    <td className="py-4">{item.email}</td>
                    <td className="py-4 font-mono">{item.no_hp}</td>
                    <td className="py-4">
                      <span className="px-2.5 py-1 text-xs rounded-full bg-accent-blue/10 text-accent-blue font-bold">
                        {item.pilihan_kelas}
                      </span>
                    </td>
                    <td className="py-4 max-w-[200px] truncate" title={item.pesan}>
                      {item.pesan || "-"}
                    </td>
                    <td className="py-4 text-xs text-gray-400">
                      {new Date(item.created_at).toLocaleDateString("id-ID", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </td>
                    <td className="py-4 text-center">
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="p-1.5 rounded-lg text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 transition-colors cursor-pointer"
                        aria-label="Delete entry"
                      >
                        <Trash2 className="h-4.5 w-4.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="text-center py-16 text-sm text-gray-400 border border-dashed border-gray-200 dark:border-gray-800 rounded-2xl">
              Tidak ada data pendaftaran ditemukan.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
