"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Sparkles, Send, CheckCircle2, AlertCircle } from "lucide-react";

export default function DaftarPage() {
  const t = useTranslations("Daftar");

  const [formData, setFormData] = useState({
    nama: "",
    email: "",
    no_hp: "",
    pilihan_kelas: "",
    pesan: "",
  });

  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");

    try {
      const res = await fetch("/api/form", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setStatus("success");
        setFormData({
          nama: "",
          email: "",
          no_hp: "",
          pilihan_kelas: "",
          pesan: "",
        });
      } else {
        setStatus("error");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setStatus("error");
    }
  };

  return (
    <div className="py-20 w-full">
      <div className="mx-auto max-w-2xl px-4">
        {/* Header */}
        <div className="text-center flex flex-col items-center gap-4 mb-12">
          <span className="text-accent-gold font-bold text-xs uppercase tracking-widest flex items-center gap-1.5">
            <Sparkles className="h-4 w-4" />
            <span>Pendaftaran Resmi</span>
          </span>
          <h1 className="font-heading text-4xl font-bold text-black dark:text-white">
            {t("title")}
          </h1>
          <div className="h-1 w-20 bg-accent-blue rounded mt-1" />
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
            {t("subtitle")}
          </p>
        </div>

        {/* Form Container */}
        <div className="bg-white dark:bg-zinc-900 border border-gray-100 dark:border-gray-800 rounded-3xl p-8 shadow-xl">
          {status === "success" && (
            <div className="mb-6 p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 flex items-start gap-3">
              <CheckCircle2 className="h-5 w-5 shrink-0 mt-0.5 text-emerald-500" />
              <p className="text-sm font-medium text-left">{t("form.success")}</p>
            </div>
          )}

          {status === "error" && (
            <div className="mb-6 p-4 rounded-xl bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 text-red-800 dark:text-red-300 flex items-start gap-3">
              <AlertCircle className="h-5 w-5 shrink-0 mt-0.5 text-red-500" />
              <p className="text-sm font-medium text-left">{t("form.error")}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6 text-left">
            {/* Nama */}
            <div>
              <label htmlFor="nama" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                {t("form.nama")} <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="nama"
                name="nama"
                required
                value={formData.nama}
                onChange={handleChange}
                placeholder={t("form.placeholderNama")}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-800 bg-transparent text-sm focus:border-accent-gold focus:outline-none focus:ring-1 focus:ring-accent-gold transition-colors dark:text-white"
              />
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                {t("form.email")} <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder={t("form.placeholderEmail")}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-800 bg-transparent text-sm focus:border-accent-gold focus:outline-none focus:ring-1 focus:ring-accent-gold transition-colors dark:text-white"
              />
            </div>

            {/* No HP */}
            <div>
              <label htmlFor="no_hp" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                {t("form.no_hp")} <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                id="no_hp"
                name="no_hp"
                required
                value={formData.no_hp}
                onChange={handleChange}
                placeholder={t("form.placeholderNoHp")}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-800 bg-transparent text-sm focus:border-accent-gold focus:outline-none focus:ring-1 focus:ring-accent-gold transition-colors dark:text-white"
              />
            </div>

            {/* Pilihan Kelas */}
            <div>
              <label htmlFor="pilihan_kelas" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                {t("form.pilihan_kelas")} <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <select
                  id="pilihan_kelas"
                  name="pilihan_kelas"
                  required
                  value={formData.pilihan_kelas}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-zinc-900 text-sm focus:border-accent-gold focus:outline-none focus:ring-1 focus:ring-accent-gold transition-colors dark:text-white appearance-none cursor-pointer"
                >
                  <option value="" disabled>
                    {t("form.selectClass")}
                  </option>
                  <option value="Kelas Anak">{t("classes.anak")}</option>
                  <option value="Kelas Remaja">{t("classes.remaja")}</option>
                  <option value="Kelas Dewasa">{t("classes.dewasa")}</option>
                  <option value="Kelas Privat">{t("classes.privat")}</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
                  <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Pesan */}
            <div>
              <label htmlFor="pesan" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                {t("form.pesan")}
              </label>
              <textarea
                id="pesan"
                name="pesan"
                rows={4}
                value={formData.pesan}
                onChange={handleChange}
                placeholder={t("form.placeholderPesan")}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-800 bg-transparent text-sm focus:border-accent-gold focus:outline-none focus:ring-1 focus:ring-accent-gold transition-colors dark:text-white resize-none"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={status === "submitting"}
              className="w-full h-12 inline-flex items-center justify-center bg-accent-blue text-white rounded-xl text-sm font-bold tracking-wider hover:bg-accent-blue/95 transition-all shadow-md shadow-accent-blue/15 cursor-pointer disabled:opacity-50"
            >
              {status === "submitting" ? (
                <span>{t("form.submitting")}</span>
              ) : (
                <span className="flex items-center gap-2">
                  <Send className="h-4 w-4" />
                  {t("form.submit")}
                </span>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
