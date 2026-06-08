"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { Upload, Trash2, Sparkles, Image as ImageIcon, Link2, Check, AlertCircle } from "lucide-react";

interface MediaFile {
  name: string;
  url: string;
  size?: number;
}

export default function AdminMediaPage() {
  const [images, setImages] = useState<MediaFile[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const loadMedia = async () => {
    setLoading(true);
    setError("");
    try {
      const { data, error: fetchError } = await supabase.storage
        .from("media")
        .list("", {
          limit: 100,
          sortBy: { column: "created_at", order: "desc" },
        });

      if (fetchError) throw fetchError;

      if (data) {
        const mapped = data
          .filter((file) => file.name !== ".emptyFolderPlaceholder")
          .map((file) => {
            const { data: { publicUrl } } = supabase.storage
              .from("media")
              .getPublicUrl(file.name);
            return {
              name: file.name,
              url: publicUrl,
              size: file.metadata?.size,
            };
          });
        setImages(mapped);
      }
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Gagal memuat pustaka media. Pastikan bucket 'media' sudah dibuat dan diset Public.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMedia();
  }, []);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    setError("");
    setMessage("");

    try {
      const file = files[0];
      const fileExt = file.name.split(".").pop();
      // Generate clean filename to avoid path issues
      const cleanFileName = `${Date.now()}_${Math.random()
        .toString(36)
        .substring(2, 9)}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from("media")
        .upload(cleanFileName, file, {
          cacheControl: "3600",
          upsert: false,
        });

      if (uploadError) throw uploadError;

      setMessage("Foto berhasil diupload!");
      loadMedia();
    } catch (err: any) {
      setError(err.message || "Failed to upload image");
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (fileName: string) => {
    if (!confirm("Apakah Anda yakin ingin menghapus foto ini secara permanen dari Storage?")) return;

    try {
      const { error: deleteError } = await supabase.storage
        .from("media")
        .remove([fileName]);

      if (deleteError) throw deleteError;
      loadMedia();
      setMessage("Foto berhasil dihapus.");
    } catch (err: any) {
      setError(err.message || "Failed to delete image");
    }
  };

  const handleCopyLink = (url: string, index: number) => {
    navigator.clipboard.writeText(url);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="space-y-8 text-left">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading text-3xl font-bold text-black dark:text-white">
            Pustaka Media Storage
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Upload foto pentas atau studio ke Supabase Storage dan salin link URL-nya
          </p>
        </div>

        {/* Custom Upload Button */}
        <label className="inline-flex h-11 items-center justify-center gap-2 px-5 bg-accent-blue hover:bg-accent-blue/95 text-white rounded-xl text-sm font-bold tracking-wider transition-all shadow-md shadow-accent-blue/15 cursor-pointer disabled:opacity-50">
          <Upload className="h-4.5 w-4.5" />
          <span>{uploading ? "Mengupload..." : "Upload Foto Baru"}</span>
          <input
            type="file"
            accept="image/*"
            disabled={uploading}
            onChange={handleUpload}
            className="hidden"
          />
        </label>
      </div>

      {message && (
        <div className="p-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-sm font-semibold">
          {message}
        </div>
      )}

      {error && (
        <div className="p-4 rounded-xl bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 text-red-800 dark:text-red-300 flex items-start gap-2.5 text-sm font-semibold">
          <AlertCircle className="h-5 w-5 shrink-0 text-red-500 mt-0.5" />
          <span>{error}</span>
        </div>
      )}

      {/* Media Library Grid */}
      <div className="bg-white dark:bg-zinc-900 border border-gray-100 dark:border-gray-800 rounded-3xl shadow-xl p-6 space-y-6">
        <h2 className="font-heading text-xl font-bold text-black dark:text-white flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-accent-gold" />
          Foto Terunggah ({images.length})
        </h2>

        {loading ? (
          <div className="text-center py-20 text-sm text-gray-400">Memuat berkas media...</div>
        ) : images.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {images.map((img, idx) => (
              <div
                key={idx}
                className="group relative border border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-zinc-950/30 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col"
              >
                {/* Image aspect-square container */}
                <div className="relative aspect-square w-full overflow-hidden bg-gray-100 dark:bg-zinc-800">
                  <img
                    src={img.url}
                    alt={img.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {/* Hover action overlay */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                    <button
                      onClick={() => handleCopyLink(img.url, idx)}
                      className="p-2.5 bg-white hover:bg-gray-100 text-accent-blue rounded-xl shadow transition-colors cursor-pointer"
                      title="Salin Link Gambar"
                    >
                      {copiedIndex === idx ? (
                        <Check className="h-5 w-5 text-emerald-600" />
                      ) : (
                        <Link2 className="h-5 w-5" />
                      )}
                    </button>
                    <button
                      onClick={() => handleDelete(img.name)}
                      className="p-2.5 bg-red-600 hover:bg-red-700 text-white rounded-xl shadow transition-colors cursor-pointer"
                      title="Hapus Gambar"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                </div>

                {/* Footer metadata */}
                <div className="p-3 text-left">
                  <p className="text-xs font-semibold text-gray-700 dark:text-gray-300 truncate" title={img.name}>
                    {img.name}
                  </p>
                  <p className="text-[10px] text-gray-400 mt-0.5">
                    {img.size ? `${(img.size / 1024).toFixed(1)} KB` : "Storage File"}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-24 border-2 border-dashed border-gray-200 dark:border-gray-800 rounded-2xl">
            <ImageIcon className="h-12 w-12 text-gray-300 mb-2" />
            <p className="text-sm text-gray-500">Pustaka media kosong. Silakan upload foto baru.</p>
          </div>
        )}
      </div>
    </div>
  );
}
