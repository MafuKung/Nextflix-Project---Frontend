# Nextflix 🎬

เว็บแอป “Nextflix” สำหรับดูข้อมูลภาพยนตร์สไตล์ Netflix ฝั่ง Frontend พัฒนาด้วย Next.js + Tailwind CSS ส่วน Backend เป็น NestJS เชื่อมต่อกับ TMDB API และมี API Documentation ให้ทดสอบง่ายๆ ด้วย Apidog  

---

## 🌟 คุณสมบัติหลัก

- **หน้า Home**  
  – Hero Banner ดึงหนังยอดนิยม (Popular) มาโชว์แบบลอยบนพื้นหลังพร้อมไล่ gradient  
  – Carousel แถว “Popular”, “Top Rated”, “Coming Soon” เลื่อนซ้าย-ขวาได้ด้วยปุ่ม  
- **หน้า Search**  
  – ค้นหาชื่อหนังแบบ realtime (พิมพ์แล้ว refetch)  
  – แสดงผลเป็นกริด responsive  
- **หน้า Movie Detail**  
  – แสดงข้อมูลภาพยนตร์: ชื่อ, วันที่, เรตติ้ง, หมวดหมู่, พรีวิวเรื่องย่อ  
  – แสดงภาพโปสเตอร์ + backdrop background พร้อมไล่ gradient  
  – ปุ่ม “Watch Trailer” เปิดดูตัวอย่าง YouTube ใน modal  
- **Backend API**  
  – Endpoint `/movies/popular`, `/movies/top-rated`, `/movies/upcoming`, `/movies/search?query=…`, `/movies/:id`, `/movies/:id/videos`  
  – Clean Architecture แยก Data Layer (TMDB client), Domain Layer (Business Logic), Presentation Layer (Controller)  
- **API Documentation**  
  – ดูโครงสร้าง, ทดลองยิง request ได้จริงที่ Apidog  
  – ไม่ต้องเขียน Postman เอง  

---

## 🔨 เทคโนโลยีที่ใช้

| ฝั่ง Frontend              | ฝั่ง Backend           | อื่นๆ                         |
|-----------------------------|------------------------|-------------------------------|
| Next.js (App Router)        | NestJS (Controllers)   | TMDB API                      |
| TypeScript                  | TypeScript             | Apidog (API Docs)             |
| Tailwind CSS                | @nestjs/axios (Http)   | React Query (Data fetching)   |
| react-modal, lucide-react    | @nestjs/config         | Vercel (Deploy Frontend)      |
|                              | @nestjs/swagger        | Render (Deploy Backend)       |

---

## 🚀 การติดตั้งและใช้งาน (Local)

### 1. Frontend
```bash
cd nextflix-web
# ติดตั้ง dependencies
npm install
# รัน development server
npm run dev
```
ค่าใน .env.local ตัวอย่าง:
  NEXT_PUBLIC_API_URL=http://localhost:3333

• เปิดเบราว์เซอร์ที่ http://localhost:3000


### 2.Backend
```bash
cd nextflix-backend
# ติดตั้ง dependencies
npm install
# สร้างไฟล์ .env.local ตามตัวอย่าง
cp .env.example .env.local
# รัน development server
npm run start:dev
```

ค่าใน .env ตัวอย่าง:
  TMDB_API_KEY=YOUR_TMDB_API_KEY
  TMDB_BASE_URL=https://api.themoviedb.org/3
  PORT=3333
  FRONTEND_URL=http://localhost:3000


### ลิงก์ Deployment
Frontend (Next.js)
https://nextflix-project-frontend.vercel.app

Backend (NestJS)
https://nextflix-project-backend.onrender.com

API Documentation (Apidog)
https://m4noq9znet.apidog.io


ขอบคุณที่ติดตามครับ 🙏
Enjoy your Nextflix!
