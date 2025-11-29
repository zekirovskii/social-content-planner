import Image from "next/image";
import { useState } from "react";
import { platformOptions, statusOptions } from "@/constants/postOptions";

const emptyForm = {
  title: "",
  platform: platformOptions[0],
  status: "Taslak",
  scheduledAt: "",
  description: "",
  imageUrl: "",
};

export default function PostForm({ onSubmit }) {
  const [form, setForm] = useState(emptyForm);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    setError("");
    try {
      await onSubmit(form);
      setForm(emptyForm);
    } catch (err) {
      setError(err.message || "Gönderi oluşturulamadı");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="flex flex-col gap-2 text-sm font-medium text-slate-900">
          Başlık
          <input
            required
            value={form.title}
            onChange={(e) => handleChange("title", e.target.value)}
            placeholder="Örn: Yeni ürün duyurusu"
            className="rounded-lg border border-white/12 bg-white/90 px-3 py-2 text-slate-900 outline-none transition focus:border-blue-300 focus:ring-2 focus:ring-blue-300/70"
          />
        </label>
        <div className="grid grid-cols-2 gap-4">
          <label className="flex flex-col gap-2 text-sm font-medium text-slate-900">
            Platform
            <select
              value={form.platform}
              onChange={(e) => handleChange("platform", e.target.value)}
              className="rounded-lg border border-white/12 bg-white/90 px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-blue-300 focus:ring-2 focus:ring-blue-300/70"
            >
              {platformOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </label>
          <label className="flex flex-col gap-2 text-sm font-medium text-slate-900">
            Durum
            <select
              value={form.status}
              onChange={(e) => handleChange("status", e.target.value)}
              className="rounded-lg border border-white/12 bg-white/90 px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-blue-300 focus:ring-2 focus:ring-blue-300/70"
            >
              {statusOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </label>
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <label className="flex flex-col gap-2 text-sm font-medium text-slate-900">
          Zamanlama
          <input
            type="datetime-local"
            value={form.scheduledAt}
            onChange={(e) => handleChange("scheduledAt", e.target.value)}
            className="rounded-lg border border-white/12 bg-white/90 px-3 py-2 text-slate-900 outline-none transition focus:border-blue-300 focus:ring-2 focus:ring-blue-300/70"
          />
        </label>
        <label className="flex flex-col gap-2 text-sm font-medium text-slate-900">
          Görsel URL (opsiyonel)
          <input
            value={form.imageUrl}
            onChange={(e) => handleChange("imageUrl", e.target.value)}
            placeholder="https://..."
            className="rounded-lg border border-white/12 bg-white/90 px-3 py-2 text-slate-900 outline-none transition focus:border-blue-300 focus:ring-2 focus:ring-blue-300/70"
          />
        </label>
      </div>

      <label className="flex flex-col gap-2 text-sm font-medium text-slate-900">
        Açıklama
        <textarea
          rows={3}
          value={form.description}
          onChange={(e) => handleChange("description", e.target.value)}
          placeholder="Kısa brief ya da copy notu..."
          className="rounded-lg border border-white/15 bg-white/90 px-3 py-3 text-sm text-slate-900 outline-none transition focus:border-blue-200 focus:ring-2 focus:ring-blue-200/60"
        />
      </label>

      {error ? (
        <p className="text-sm font-medium text-rose-500">{error}</p>
      ) : null}

      {form.imageUrl ? (
        <div className="mx-auto max-w-xl overflow-hidden rounded-xl border border-white/15 bg-white/10 shadow-[0_20px_40px_rgba(0,0,0,0.35)] backdrop-blur-lg">
          <Image
            src={form.imageUrl}
            alt="Gönderi görseli"
            width={800}
            height={320}
            sizes="100vw"
            className="h-40 w-full object-cover"
          />
        </div>
      ) : null}

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={submitting}
          className="inline-flex items-center justify-center gap-2 rounded-full bg-[#ff8b2a] px-5 py-2 text-sm font-semibold text-white shadow-lg shadow-orange-300/40 transition hover:-translate-y-0.5 hover:bg-white hover:text-[#ff8b2a] hover:ring-2 hover:ring-[#ff8b2a]/60 disabled:translate-y-0 disabled:opacity-60"
        >
          {submitting ? "Kaydediliyor..." : "Yeni Gönderi Ekle"}
        </button>
      </div>
    </form>
  );
}
