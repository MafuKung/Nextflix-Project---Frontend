'use client'

import { useRef, useState, useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import CardPoster from '../components/CardPoster'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface SectionRowProps {
  title: string
  endpoint: string
  queryKey: string
}

interface MoviePreview {
  id: number
  title: string
  poster_path?: string
}

interface SectionRowResponse {
  results: MoviePreview[]
}

export default function SectionRow({ title, queryKey, endpoint }: SectionRowProps) {
  const { data, isLoading, error, refetch } = useQuery<SectionRowResponse, Error>({
    queryKey: ['movies', queryKey],
    queryFn: () =>
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/movies/${endpoint}`)
        .then((res) => {
          if (!res.ok) throw new Error('Failed to fetch')
          return res.json()
        }),
    enabled: false,
  })

  // เมื่อ component mount ให้ดึงข้อมูล
  useEffect(() => {
    refetch()
  }, [refetch])

  const rowRef = useRef<HTMLUListElement>(null)
  const [atLeftEnd, setAtLeftEnd] = useState(true)
  const [atRightEnd, setAtRightEnd] = useState(false)

  // อัพเดตสถานะปุ่ม
  const checkEnds = () => {
    const row = rowRef.current
    if (!row) return
    setAtLeftEnd(row.scrollLeft <= 0)
    setAtRightEnd(row.scrollLeft + row.clientWidth >= row.scrollWidth)
  }

  useEffect(() => {
    const row = rowRef.current
    if (!row) return
    row.addEventListener('scroll', checkEnds)
    checkEnds()
    return () => row.removeEventListener('scroll', checkEnds)
  }, [data?.results])

  const handleClick = (dir: 'left' | 'right') => {
    const row = rowRef.current
    if (!row) return
    const scrollAmount = row.clientWidth * 0.8
    const newPos =
      dir === 'left'
        ? row.scrollLeft - scrollAmount
        : row.scrollLeft + scrollAmount
    row.scrollTo({ left: newPos, behavior: 'smooth' })
  }

  return (
    <section className="relative py-4">
      <h2 className="px-6 text-xl font-semibold">{title}</h2>

      {!isLoading && !error && data?.results.length && (
        <>
          {/* ปุ่มเลื่อนซ้าย */}
          <button
            onClick={() => handleClick('left')}
            disabled={atLeftEnd}
            className={`
              absolute left-0 top-1/2 -translate-y-1/2 z-20 p-2
              bg-black/50 rounded-full transition-opacity
              ${atLeftEnd ? 'opacity-0 pointer-events-none' : 'opacity-100'}
            `}
          >
            <ChevronLeft className="w-6 h-6 text-white" />
          </button>

          {/* แถวภาพ */}
          <ul
            ref={rowRef}
            className="flex space-x-4 overflow-x-auto scroll-smooth scrollbar-hide px-6"
          >
            {data.results.map(movie => (
              <CardPoster key={movie.id} movie={movie} />
            ))}
          </ul>

          {/* ปุ่มเลื่อนขวา */}
          <button
            onClick={() => handleClick('right')}
            disabled={atRightEnd}
            className={`
              absolute right-0 top-1/2 -translate-y-1/2 z-20 p-2
              bg-black/50 rounded-full transition-opacity
              ${atRightEnd ? 'opacity-0 pointer-events-none' : 'opacity-100'}
            `}
          >
            <ChevronRight className="w-6 h-6 text-white" />
          </button>
        </>
      )}

      {/* สถานะ loading / error */}
      {isLoading && <p className="px-6">Loading…</p>}
      {error && (
        <p className="px-6 text-red-500">
          Failed to load.{' '}
          <button onClick={() => refetch()} className="underline">
            Retry
          </button>
        </p>
      )}
    </section>
  )
}
