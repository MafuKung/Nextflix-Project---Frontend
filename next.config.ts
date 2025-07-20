import type { NextConfig } from "next";

const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: ['image.tmdb.org'],  // ← เพิ่มตรงนี้
  },
  // …ถ้ามีอื่น ๆ อยู่แล้วก็ไม่ต้องลบทิ้ง
}

export default nextConfig;
