# 📅 Social Content Planner  
Next.js 14 + Prisma + MongoDB + Zustand ile geliştirilmiş tam kapsamlı bir sosyal medya içerik planlama uygulaması.

Bu proje; içerik oluşturma, zamanlama, durum takibi ve platform bazlı filtreleme gibi temel ihtiyaçları karşılayan modern bir CRUD uygulamasıdır.

---

## 🚀 Özellikler

### 🔹 İçerik Yönetimi
- Yeni post ekleme (title, platform, status, description, imageUrl)
- Tüm içerikleri listeleme
- İçerik güncelleme
- İçerik silme

### 🔹 Planlama & Takvim
- `scheduledAt` alanı ile tarih/zaman ayarlama
- Tarih validasyonu ve otomatik formatlama

### 🔹 API & Backend
- Next.js App Router → `/api/posts` ve `/api/posts/[id]`
- Tam CRUD desteği
- MongoDB ObjectId → string normalize işlemi
- Error handling & status kodları

### 🔹 Global State
- Zustand ile:
  - Post listesi yönetimi
  - API senkronizasyonu
  - Otomatik refresh & optimistic update

### 🔹 UI (Frontend)
- Tailwind CSS ile modern arayüz
- Component-based yapı:
  - `PostCard`
  - `PostForm`
  - `SectionCard`
- Responsive tasarım

---

## 🧱 Kullanılan Teknolojiler

| Teknoloji | Açıklama |
|----------|----------|
| **Next.js 14** | Frontend + API Routes |
| **Prisma ORM** | MongoDB ile veri modelleme |
| **MongoDB Atlas** | Cloud database |
| **Zustand** | Global state yönetimi |
| **Tailwind CSS** | UI tasarımı |
| **Vercel** | Deployment |

---

## 📁 Proje Yapısı

```bash
src/
 ├── app/
 │   ├── api/
 │   │   ├── posts/route.js
 │   │   └── posts/[id]/route.js
 │   ├── layout.jsx
 │   ├── page.jsx
 │   └── globals.css
 │
 ├── components/
 │   ├── PostCard.jsx
 │   ├── PostForm.jsx
 │   └── SectionCard.jsx
 │
 ├── constants/
 │   └── postOptions.js
 │
 ├── lib/
 │   ├── prisma.js
 │   └── services/api.js
 │
 ├── store/
 │   └── postStore.js
 │
 └── utils/
     └── date.js
