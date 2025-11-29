import { create } from "zustand";
import { deleteApi, getApi, postApi, putApi } from "@/services/api";

export const usePostStore = create((set, get) => ({
  posts: [],
  loading: false,
  error: "",

  fetchPosts: async () => {
    set({ loading: true, error: "" });
    try {
      const posts = await getApi("/api/posts");
      set({ posts });
    } catch (error) {
      set({ error: error.message || "Failed to load posts" });
    } finally {
      set({ loading: false });
    }
  },

  createPost: async (payload) => {
    const post = await postApi("/api/posts", payload);
    set({ posts: [post, ...get().posts] });
    return post;
  },

  updatePost: async (id, payload) => {
    const updated = await putApi(`/api/posts/${id}`, payload);
    set({
      posts: get().posts.map((post) => (post.id === id ? updated : post)),
    });
    return updated;
  },

  deletePost: async (id) => {
    await deleteApi(`/api/posts/${id}`);
    set({ posts: get().posts.filter((post) => post.id !== id) });
  },
}));
