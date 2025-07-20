'use client'

import { useState, useEffect, useRef  } from 'react'
import { useQuery } from '@tanstack/react-query'
import Image from 'next/image'
import { Play, Info, ChevronLeft, ChevronRight } from 'lucide-react'
import Link from 'next/link'

interface Movie {
  id: number
  title: string
  overview: string
  backdrop_path: string
}

export default function HeroBanner() {
  const { data, isLoading, error } = useQuery<{
    results: Movie[]
  }>({
    queryKey: ['heroMovies'],
    queryFn: async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/movies/popular`
      )
      if (!res.ok) throw new Error('Failed to load hero movies')
      return res.json()
    },
    staleTime: 1000 * 60 * 5,
  })

  const [idx, setIdx] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const AUTO_SLIDE_MS = 5000

  useEffect(() => {
    if (!data?.results?.length) return
    const max = Math.min(data.results.length, 5)
    const iv = setInterval(() => {
      setIdx((i) => (i + 1) % max)
    }, AUTO_SLIDE_MS)
    return () => clearInterval(iv)
  }, [data])

  if (isLoading) return <div className="h-[75vh] flex items-center justify-center">Loading…</div>
  if (error || !data?.results?.length) return null

  // เอาแค่ 5 เรื่องแรก
  const movies = data.results.slice(0, 5)

  return (
    <section className="relative h-[75vh] w-full overflow-hidden">
      {/* Carousel track */}
      <div
        ref={containerRef}
        className="flex h-full transition-transform duration-700 ease-out"
        style={{ transform: `translateX(${-idx * 100}%)` }}
      >
        {movies.map((movie) => (
          <div
            key={movie.id}
            className="relative h-full w-full flex-shrink-0"
          >
            <Image
              src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
              alt={movie.title}
              fill
              priority
              className="object-cover brightness-75"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />

            <div className="absolute bottom-16 left-6 md:left-16 max-w-lg space-y-4 text-white">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold">
                {movie.title}
              </h1>
              <p className="hidden md:block line-clamp-2 text-gray-200">
                {movie.overview}
              </p>
              <div className="flex gap-4">
                <Link href={`/movie/${movie.id}`}>
                  <button className="flex items-center gap-2 bg-white text-black px-6 py-2 rounded hover:bg-white/90 transition">
                    <Play className="w-5 h-5" /> Watch Trailer
                  </button>
                </Link>
                <Link href={`/movie/${movie.id}`}>
                  <button className="flex items-center gap-2 border border-white text-white px-6 py-2 rounded hover:border-white/80 transition">
                    <Info className="w-5 h-5" /> More Info
                  </button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ● Prev / Next buttons */}
      <button
        onClick={() =>
          setIdx((i) => (i - 1 + movies.length) % movies.length)
        }
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 p-2 rounded-full z-10"
      >
        <ChevronLeft className="w-6 h-6 text-white" />
      </button>
      <button
        onClick={() => setIdx((i) => (i + 1) % movies.length)}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 p-2 rounded-full z-10"
      >
        <ChevronRight className="w-6 h-6 text-white" />
      </button>
    </section>
  )
}