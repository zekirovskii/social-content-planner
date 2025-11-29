import { useEffect, useState } from "react";
import { platformOptions, statusOptions } from "@/constants/postOptions";
import { formatDate } from "@/utils/date";

export default function PostCard({ post, onUpdate, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [draft, setDraft] = useState({
    title: post.title,
    platform: post.platform,
    status: post.status,
    scheduledAt: post.scheduledAt
      ? new Date(post.scheduledAt).toISOString().slice(0, 16)
      : "",
    description: post.description || "",
    imageUrl: post.imageUrl || "",
  });

  useEffect(() => {
    setDraft({
      title: post.title,
      platform: post.platform,
      status: post.status,
      scheduledAt: post.scheduledAt
        ? new Date(post.scheduledAt).toISOString().slice(0, 16)
        : "",
      description: post.description || "",
      imageUrl: post.imageUrl || "",
    });
  }, [post]);

  const handleSave = async () => {
    setSaving(true);
    setErrorMessage("");
    try {
      await onUpdate(post.id, draft);
      setIsEditing(false);
    } catch (error) {
      setErrorMessage(error.message || "Güncellenemedi");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    try {
      await onDelete(post.id);
    } catch (error) {
      setErrorMessage(error.message || "Silinemedi");
    }
  };

  const chipClass =
    "inline-flex h-8 items-center rounded-full border border-blue-200/80 bg-white/80 px-3 text-xs font-semibold text-blue-700 shadow-[0_10px_30px_rgba(37,99,235,0.14)] transition hover:-translate-y-0.5 hover:border-blue-300 hover:bg-blue-50";

  return (
    <div className="flex h-full w-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-gradient-to-br from-white via-[#f8fbff] to-white p-4 text-slate-900 shadow-[0_14px_36px_rgba(15,23,42,0.18)] transition hover:shadow-[0_18px_42px_rgba(15,23,42,0.22)] sm:p-5">
      <div className="flex flex-wrap items-center gap-2">
        <span className={`${chipClass} capitalize`}>
          {post.status}
        </span>
        <span className={chipClass}>
          {post.platform}
        </span>
        {post.imageUrl ? (
          <a
            href={post.imageUrl}
            target="_blank"
            rel="noreferrer"
            className={chipClass}
          >
            Kaynak
          </a>
        ) : null}
      </div>

      {isEditing ? (
        <div className="mt-4 flex flex-1 flex-col space-y-3">
          <input
            value={draft.title}
            onChange={(e) => setDraft((prev) => ({ ...prev, title: e.target.value }))}
            className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
          />
          <div className="grid grid-cols-3 gap-3">
            <select
              value={draft.platform}
              onChange={(e) =>
                setDraft((prev) => ({ ...prev, platform: e.target.value }))
              }
              className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
            >
              {platformOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            <select
              value={draft.status}
              onChange={(e) =>
                setDraft((prev) => ({ ...prev, status: e.target.value }))
              }
              className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
            >
              {statusOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            <input
              type="datetime-local"
              value={draft.scheduledAt}
              onChange={(e) =>
                setDraft((prev) => ({ ...prev, scheduledAt: e.target.value }))
              }
              className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
            />
          </div>
          <textarea
            value={draft.description}
            onChange={(e) =>
              setDraft((prev) => ({ ...prev, description: e.target.value }))
            }
            rows={2}
            className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
          />
          <input
            value={draft.imageUrl}
            onChange={(e) =>
              setDraft((prev) => ({ ...prev, imageUrl: e.target.value }))
            }
            placeholder="Görsel URL"
            className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
          />
          <div className="flex justify-end">
            <button
              onClick={handleSave}
              disabled={saving}
              className="rounded-full bg-slate-900 px-4 py-2 text-xs font-semibold text-white shadow-md shadow-slate-200 transition hover:translate-y-[-1px] hover:bg-slate-800 disabled:translate-y-0 disabled:opacity-60"
            >
              {saving ? "Kaydediliyor..." : "Kaydet"}
            </button>
          </div>
          {errorMessage ? (
            <p className="text-xs font-semibold text-rose-500">{errorMessage}</p>
          ) : null}
          <div className="mt-auto flex items-center justify-end gap-2">
            <button
              onClick={() => setIsEditing((prev) => !prev)}
              className="inline-flex h-9 items-center justify-center rounded-full border border-blue-500/30 bg-blue-600 px-4 text-xs font-semibold text-white shadow-[0_12px_24px_rgba(37,99,235,0.35)] transition hover:-translate-y-0.5 hover:bg-blue-500 sm:text-sm"
            >
              Vazgeç
            </button>
            <button
              onClick={handleDelete}
              className="inline-flex h-9 items-center justify-center rounded-full border border-rose-500/30 bg-rose-600 px-4 text-xs font-semibold text-white shadow-[0_12px_24px_rgba(248,113,113,0.3)] transition hover:-translate-y-0.5 hover:bg-rose-500 sm:text-sm"
            >
              Sil
            </button>
          </div>
        </div>
      ) : (
        <div className="mt-4 flex flex-1 flex-col gap-3">
          <h3 className="text-base font-semibold text-slate-900">
            {post.title}
          </h3>
          <div className="relative">
            <p className="min-h-[60px] max-h-[60px] overflow-y-auto pr-3 text-sm leading-snug text-slate-700 break-words">
              {post.description || "Açıklama eklenmemiş."}
            </p>
            {(post.description || "").length > 160 ? (
              <span className="pointer-events-none absolute top-12 right-2 rounded bg-white/120 px-1 text-md font-semibold text-slate-500">
                …
              </span>
            ) : null}
          </div>
          {post.imageUrl ? (
            <div className="overflow-hidden rounded-lg border border-slate-200">
              <img
                src={post.imageUrl}
                alt={post.title}
                className="aspect-square w-full max-h-[220px] object-cover"
              />
            </div>
          ) : null}
          <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500">
            <span>Planlanan: {formatDate(post.scheduledAt)}</span>
            <span className="h-1 w-1 rounded-full bg-slate-300" />
            <span>Oluşturma: {formatDate(post.createdAt)}</span>
          </div>
          {errorMessage ? (
            <p className="text-xs font-semibold text-rose-500">{errorMessage}</p>
          ) : null}
          <div className="mt-auto flex items-center justify-end gap-2">
            <button
              onClick={() => setIsEditing((prev) => !prev)}
              className="inline-flex h-9 items-center justify-center rounded-full border border-blue-500/30 bg-blue-600 px-4 text-xs font-semibold text-white shadow-[0_12px_24px_rgba(37,99,235,0.35)] transition hover:-translate-y-0.5 hover:bg-blue-500 sm:text-sm"
            >
              {isEditing ? "Vazgeç" : "Düzenle"}
            </button>
            <button
              onClick={handleDelete}
              className="inline-flex h-9 items-center justify-center rounded-full border border-rose-500/30 bg-rose-600 px-4 text-xs font-semibold text-white shadow-[0_12px_24px_rgba(248,113,113,0.3)] transition hover:-translate-y-0.5 hover:bg-rose-500 sm:text-sm"
            >
              Sil
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
