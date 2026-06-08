"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { Plus, Trash2, FileText, Users, Sparkles, AlertCircle } from "lucide-react";

interface KontenItem {
  id: string;
  type: "artikel" | "youtube" | "team";
  title: string;
  content: string;
  image_url?: string;
  created_at: string;
}

export default function AdminKontenPage() {
  const [items, setItems] = useState<KontenItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // Form State
  const [type, setType] = useState<"artikel" | "youtube" | "team">("artikel");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const loadKonten = async () => {
    setLoading(true);
    try {
      const { data, error: fetchError } = await supabase
        .from("konten")
        .select("*")
        .order("created_at", { ascending: false });

      if (fetchError) throw fetchError;
      setItems(data || []);
    } catch (err: any) {
      setError(err.message || "Failed to load content");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadKonten();
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    setMessage("");

    try {
      // For YouTube type, convert standard YouTube URL to Embed URL if possible
      let finalContent = content;
      if (type === "youtube" && content.includes("youtube.com/watch")) {
        const urlParams = new URLSearchParams(new URL(content).search);
        const videoId = urlParams.get("v");
        if (videoId) {
          finalContent = `https://www.youtube.com/embed/${videoId}`;
        }
      } else if (type === "youtube" && content.includes("youtu.be/")) {
        const videoId = content.split("/").pop();
        if (videoId) {
          finalContent = `https://www.youtube.com/embed/${videoId}`;
        }
      }

      const { data, error: insertError } = await supabase
        .from("konten")
        .insert([
          {
            type,
            title,
            content: finalContent,
            image_url: imageUrl || null,
          },
        ])
        .select();

      if (insertError) throw insertError;

      setMessage("Konten berhasil ditambahkan!");
      setTitle("");
      setContent("");
      setImageUrl("");
      loadKonten();
    } catch (err: any) {
      setError(err.message || "Failed to create content");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Apakah Anda yakin ingin menghapus konten ini?")) return;

    try {
      const { error: deleteError } = await supabase
        .from("konten")
        .delete()
        .eq("id", id);

      if (deleteError) throw deleteError;
      loadKonten();
    } catch (err: any) {
      setError(err.message || "Failed to delete content");
    }
  };

  return (
    <div className="space-y-8 text-left">
      <div>
        <h1 className="font-heading text-3xl font-bold text-black dark:text-white">
          Kelola Konten Studio
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Tambahkan atau hapus Artikel, Link YouTube, dan Profil Pengajar Studio
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Create Content Form */}
        <div className="bg-white dark:bg-zinc-900 border border-gray-100 dark:border-gray-800 p-6 rounded-3xl shadow-xl lg:col-span-5 space-y-6">
          <h2 className="font-heading text-xl font-bold text-black dark:text-white flex items-center gap-2">
            <Plus className="h-5 w-5 text-accent-gold" />
            Tambah Konten Baru
          </h2>

          {message && (
            <div className="p-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-sm font-semibold">
              {message}
            </div>
          )}

          {error && (
            <div className="p-3.5 rounded-xl bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 text-red-800 dark:text-red-300 flex items-start gap-2.5 text-sm font-semibold">
              <AlertCircle className="h-5 w-5 shrink-0 text-red-500 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleCreate} className="space-y-4">
            {/* Tipe Konten */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
                Tipe Konten
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { value: "artikel", label: "Artikel", icon: FileText, svgIcon: null as React.ReactNode },
                  { value: "youtube", label: "YouTube", icon: null, svgIcon: (<svg className="h-4 w-4 mb-1.5 fill-current text-red-500" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>) as React.ReactNode },
                  { value: "team", label: "Tim / Pengajar", icon: Users, svgIcon: null as React.ReactNode },
                ].map((option) => {
                  const Icon = option.icon;
                  const active = type === option.value;
                  return (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => setType(option.value as any)}
                      className={`flex flex-col items-center justify-center p-3 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                        active
                          ? "border-accent-blue bg-accent-blue/10 text-accent-blue"
                          : "border-gray-200 dark:border-gray-800 hover:border-gray-300 hover:bg-gray-50 dark:hover:bg-zinc-800/40 text-gray-600 dark:text-gray-400"
                      }`}
                    >
                      {option.svgIcon ? option.svgIcon : Icon ? <Icon className="h-4 w-4 mb-1.5 text-accent-gold" /> : null}
                      <span>{option.label}</span>
                    </button>
                  );
                })}
              </div>

            </div>

            {/* Judul / Nama */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
                {type === "team" ? "Nama Pengajar" : type === "youtube" ? "Judul Video" : "Judul Artikel"}
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder={
                  type === "team" ? "Nama Lengkap & Gelar" : type === "youtube" ? "E.g. Pentas Tari Pendet Ritinari" : "Judul artikel budaya..."
                }
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-800 bg-transparent text-sm focus:border-accent-gold focus:outline-none focus:ring-1 focus:ring-accent-gold dark:text-white"
              />
            </div>

            {/* Deskripsi / Isi / URL */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
                {type === "youtube" ? "URL Video YouTube" : type === "team" ? "Deskripsi / Jabatan / Biografi" : "Isi Artikel"}
              </label>
              {type === "youtube" ? (
                <input
                  type="url"
                  required
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="https://www.youtube.com/watch?v=..."
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-800 bg-transparent text-sm focus:border-accent-gold focus:outline-none focus:ring-1 focus:ring-accent-gold dark:text-white"
                />
              ) : (
                <textarea
                  required
                  rows={5}
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder={
                    type === "team"
                      ? "Deskripsikan keahlian tari, latar belakang pendidikan, atau peran tim pengajar..."
                      : "Tuliskan isi paragraf artikel di sini..."
                  }
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-800 bg-transparent text-sm focus:border-accent-gold focus:outline-none focus:ring-1 focus:ring-accent-gold dark:text-white resize-none"
                />
              )}
            </div>

            {/* Foto URL (Optional for team & artikel) */}
            {type !== "youtube" && (
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
                  Foto URL (Opsional)
                </label>
                <input
                  type="url"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  placeholder="https://images.unsplash.com/photo-..."
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-800 bg-transparent text-sm focus:border-accent-gold focus:outline-none focus:ring-1 focus:ring-accent-gold dark:text-white"
                />
                <span className="text-[10px] text-gray-400 mt-1 block">
                  Anda bisa menyalin link foto Unsplash atau mengupload foto di tab Pustaka Media dan menempel link di sini.
                </span>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={submitting}
              className="w-full h-11 inline-flex items-center justify-center bg-accent-blue text-white rounded-xl text-sm font-bold tracking-wider hover:bg-accent-blue/95 transition-all shadow-md shadow-accent-blue/15 cursor-pointer disabled:opacity-50"
            >
              {submitting ? "Menyimpan..." : "Simpan Konten"}
            </button>
          </form>
        </div>

        {/* Existing Content List */}
        <div className="bg-white dark:bg-zinc-900 border border-gray-100 dark:border-gray-800 p-6 rounded-3xl shadow-xl lg:col-span-7 space-y-6">
          <h2 className="font-heading text-xl font-bold text-black dark:text-white flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-accent-gold" />
            Daftar Konten Terpasang ({items.length})
          </h2>

          {loading ? (
            <div className="text-center py-12 text-sm text-gray-400">Loading konten...</div>
          ) : items.length > 0 ? (
            <div className="space-y-4 max-h-[600px] overflow-y-auto pr-1">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="p-4 border border-gray-100 dark:border-gray-800 rounded-2xl flex items-start justify-between gap-4 bg-gray-50/30 dark:bg-zinc-950/20"
                >
                  <div className="flex items-start gap-3 text-left">
                    <div className="p-2.5 rounded-xl bg-accent-blue/5 text-accent-blue shrink-0 mt-0.5">
                      {item.type === "youtube" ? (
                        <svg className="h-5 w-5 fill-current text-red-500" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                      ) : item.type === "team" ? (
                        <Users className="h-5 w-5 text-accent-gold" />
                      ) : (
                        <FileText className="h-5 w-5 text-blue-500" />
                      )}
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold uppercase tracking-widest text-accent-gold">
                          {item.type}
                        </span>
                        <span className="text-[10px] text-gray-400">
                          {new Date(item.created_at).toLocaleDateString("id-ID", {
                            day: "numeric",
                            month: "short",
                          })}
                        </span>
                      </div>
                      <h3 className="font-semibold text-black dark:text-white text-sm">
                        {item.title}
                      </h3>
                      <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2 leading-relaxed">
                        {item.content}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => handleDelete(item.id)}
                    className="p-2 rounded-xl text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 transition-colors cursor-pointer shrink-0"
                    aria-label="Delete item"
                  >
                    <Trash2 className="h-4.5 w-4.5" />
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 text-sm text-gray-400 border border-dashed border-gray-200 dark:border-gray-800 rounded-2xl">
              Belum ada konten kustom di database.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
