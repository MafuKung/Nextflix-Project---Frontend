'use client'

import { useState, useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import CardPoster from '../presentation/components/CardPoster'
import { Search as SearchIcon } from 'lucide-react'

interface MoviePreview {
    id: number
    title: string
    poster_path?: string
}

interface SearchResponse {
    results: MoviePreview[]
}

export default function SearchPage() {
    // 1. ตัวแปรเก็บคำค้น
    const [term, setTerm] = useState('')
    // 2. เรียก useQuery เมื่อ term ไม่ว่าง
    const { data, isLoading, error, refetch } = useQuery<SearchResponse, Error>({
        queryKey: ['search', term],
        queryFn: async () => {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/movies/search?query=${encodeURIComponent(term)}`
            )
            if (!res.ok) throw new Error('Search failed')
            return res.json()
        },
        enabled: true,
    })

    // 3. เมื่อ term เปลี่ยน รีเฟตช์อัตโนมัติ
    useEffect(() => {
        refetch()
    }, [term, refetch])

    return (
        <div className="pt-16 px-6 pb-8">
            {/* 4. Input */}
            <div className="search-wrapper">
                <SearchIcon className="search-icon" />
                <input
                    type="text"
                    placeholder="Search movies..."
                    value={term}
                    onChange={e => setTerm(e.target.value)}
                    className="search-input"
                />
            </div>

            {/* 5. State ต่าง ๆ */}
            {isLoading && (
                <p className="mt-6 text-center text-[var(--color-subtext)]">
                    Loading…
                </p>
            )}
            {error && (
                <p className="mt-6 text-center text-[var(--color-accent)]">
                    Error loading.{' '}
                    <button onClick={() => refetch()} className="underline">
                        Retry
                    </button>
                </p>
            )}
            {!isLoading && !error && data?.results.length === 0 && (
                <p className="mt-6 text-center text-[var(--color-subtext)]">
                    No results for “{term}”
                </p>
            )}

            {/* 6. Grid แสดงผล */}
            <ul className="mt-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {data?.results.map(m => (
                    <CardPoster key={m.id} movie={m} />
                ))}
            </ul>
        </div>
    )
}
