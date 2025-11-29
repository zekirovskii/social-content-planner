"use client";

import { useEffect, useMemo, useState } from "react";
import PostCard from "@/components/PostCard";
import PostForm from "@/components/PostForm";
import SectionCard from "@/components/SectionCard";
import { platformOptions, statusOptions } from "@/constants/postOptions";
import { usePostStore } from "@/store/postStore";

export default function Home() {
  const { posts, loading, error, fetchPosts, createPost, updatePost, deletePost } =
    usePostStore();
  const [search, setSearch] = useState("");
  const [platformFilter, setPlatformFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [page, setPage] = useState(1);
  const pageSize = 6;

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const filtered = useMemo(() => {
    return posts.filter((post) => {
      const matchesPlatform =
        platformFilter === "all" || post.platform === platformFilter;
      const matchesStatus = statusFilter === "all" || post.status === statusFilter;
      const matchesText =
        !search ||
        post.title.toLowerCase().includes(search.toLowerCase()) ||
        (post.description || "")
          .toLowerCase()
          .includes(search.toLowerCase());
      return matchesPlatform && matchesStatus && matchesText;
    });
  }, [posts, platformFilter, statusFilter, search]);

  useEffect(() => {
    setPage(1);
  }, [platformFilter, statusFilter, search]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const currentPage = Math.min(page, totalPages);
  const pageItems = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filtered.slice(start, start + pageSize);
  }, [filtered, currentPage]);

  return (
    <div className="relative min-h-screen overflow-hidden px-4 py-10 text-slate-900 sm:px-6">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8">
        <header className="flex flex-col gap-3 rounded-3xl border border-blue-200/40 bg-gradient-to-br from-[#0b1f5a] via-[#0c2f82] to-[#0a1f63] p-8 sm:p-10 text-white shadow-[0_24px_50px_rgba(10,31,90,0.4)]">
          <p className="text-xs uppercase tracking-[0.3em] text-blue-100">
            Social Content Planner
          </p>
          <h1 className="text-3xl font-semibold text-white">
            Gönderilerini planla, paylaş, takip et.
          </h1>
          <p className="text-sm text-blue-100">
            Tek ekranda içerik ekle, filtrele, düzenle ve görsellerin önizlemesini kontrol et.
          </p>
        </header>

        <SectionCard title="Yeni Gönderi" subtitle="">
          <PostForm onSubmit={createPost} />
        </SectionCard>

        <SectionCard title="Gönderiler" subtitle="">
          <div className="mb-6 grid gap-3 md:grid-cols-3">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Başlık ya da brief içinde ara..."
              className="rounded-xl border border-white/15 bg-white/90 px-3.5 py-2.5 text-sm text-slate-900 outline-none transition focus:border-blue-200 focus:ring-2 focus:ring-blue-200/60"
            />
            <select
              value={platformFilter}
              onChange={(e) => setPlatformFilter(e.target.value)}
              className="rounded-xl border border-white/15 bg-white/90 px-3.5 py-2.5 text-sm text-slate-900 outline-none transition focus:border-blue-200 focus:ring-2 focus:ring-blue-200/60"
            >
              <option value="all">Platform (tümü)</option>
              {platformOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="rounded-xl border border-white/15 bg-white/90 px-3.5 py-2.5 text-sm text-slate-900 outline-none transition focus:border-blue-200 focus:ring-2 focus:ring-blue-200/60"
            >
              <option value="all">Durum (tümü)</option>
              {statusOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          {error ? (
            <p className="text-sm font-semibold text-rose-500">{error}</p>
          ) : null}

          {loading ? (
            <div className="flex items-center gap-3 rounded-xl border border-dashed border-slate-200 bg-slate-50 px-4 py-6 text-sm text-slate-600">
              <span className="h-3 w-3 animate-spin rounded-full border-2 border-slate-400 border-t-transparent" />
              Gönderiler yükleniyor...
            </div>
          ) : filtered.length ? (
            <>
              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {pageItems.map((post) => (
                  <PostCard
                    key={post.id}
                    post={post}
                    onUpdate={updatePost}
                    onDelete={deletePost}
                  />
                ))}
              </div>
              <div className="flex items-center justify-center gap-3 pt-4">
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm transition hover:-translate-y-0.5 hover:border-slate-300 hover:shadow disabled:translate-y-0 disabled:opacity-50"
                >
                  Önceki
                </button>
                <span className="text-sm text-slate-600">
                  Sayfa {currentPage} / {totalPages}
                </span>
                <button
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm transition hover:-translate-y-0.5 hover:border-slate-300 hover:shadow disabled:translate-y-0 disabled:opacity-50"
                >
                  Sonraki
                </button>
              </div>
            </>
          ) : (
            <div className="rounded-xl border border-dashed border-slate-200 bg-slate-50 px-4 py-6 text-sm text-slate-600">
              Henüz içerik yok. Filtreyi temizle veya yeni bir içerik ekle.
            </div>
          )}
        </SectionCard>
      </div>
    </div>
  );
}
