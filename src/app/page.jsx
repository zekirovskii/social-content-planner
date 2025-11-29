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

  return (
    <div className="relative min-h-screen overflow-hidden px-4 py-10 text-slate-50 sm:px-6">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8">
        <header className="flex flex-col gap-3 rounded-3xl border border-blue-200/60 bg-gradient-to-br from-[#1858d6] via-[#1d6fea] to-[#0f3fa8] p-8 sm:p-10 text-white shadow-[0_18px_40px_rgba(37,99,235,0.25)]">
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
            <div className="grid gap-4">
              {filtered.map((post) => (
                <PostCard
                  key={post.id}
                  post={post}
                  onUpdate={updatePost}
                  onDelete={deletePost}
                />
              ))}
            </div>
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
