'use client'

import { useState } from 'react'
import { useParams } from 'next/navigation'
import { useQuery } from '@tanstack/react-query'
import Image from 'next/image'
import { Play } from 'lucide-react'
import Modal from 'react-modal'

Modal.setAppElement('body')

export default function MovieDetailPage() {
  const { id } = useParams()
  const [isOpen, setIsOpen] = useState(false)

  const { data, isLoading, error } = useQuery({
    queryKey: ['movie', id],
    queryFn: () =>
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/movies/${id}`)
        .then(res => res.json()),
    enabled: !!id,
  })

  const { data: vids } = useQuery({
    queryKey: ['videos', id],
    queryFn: () =>
      fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/movies/${id}/videos`
      ).then((res) => res.json()),
    enabled: isOpen && !!id,
  })

  if (isLoading) return <p>Loading…</p>
  if (error || !data) return <p>Error loading movie.</p>

  const trailer = vids?.results.find(
    (v: any) => v.type === 'Trailer' && v.site === 'YouTube'
  )

  const backdropUrl = data.backdrop_path
    ? `https://image.tmdb.org/t/p/original${data.backdrop_path}`
    : ''

  const posterUrl = data.poster_path
    ? `https://image.tmdb.org/t/p/w342${data.poster_path}`
    : ''

  // Format release date
  const releaseDate = new Date(data.release_date).toLocaleDateString('en-US', {
    year: 'numeric', month: 'short', day: 'numeric'
  })

  return (
    <>
      <section className="relative min-h-screen w-full bg-black">
        {/* Backdrop background */}
        {backdropUrl && (
          <Image
            src={backdropUrl}
            alt={data.title}
            fill
            className="object-cover brightness-50"
            priority
          />
        )}
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />

        {/* Content */}
        <div className="relative z-10 container mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left: Poster */}
          <div className="col-span-1 rounded-xl overflow-hidden shadow-xl">
            <Image
              src={posterUrl}
              alt={data.title}
              width={300}
              height={450}
              className="w-full h-auto object-cover"
            />
          </div>

          {/* Right: Info */}
          <div className="col-span-2 space-y-4 text-white">
            <h1 className="text-4xl font-extrabold">{data.title}</h1>
            <p className="text-sm text-gray-300">
              {releaseDate} • {data.runtime} min •{' '}
              {data.genres.map((g: any) => g.name).join(', ')}
            </p>
            <p className="text-base leading-relaxed">{data.overview}</p>

            {/* Actions */}
            <div className="flex items-center space-x-4 mt-6">
              <button onClick={() => setIsOpen(true)} className="flex items-center gap-2 bg-[var(--color-accent)] text-black font-semibold px-6 py-3 rounded hover:brightness-110 transition">
                <Play className="w-5 h-5" />
                Watch Trailer
              </button>
            </div>
          </div>
        </div>
      </section>
      <Modal
        isOpen={isOpen}
        onRequestClose={() => setIsOpen(false)}
        shouldCloseOnOverlayClick={true}
        shouldCloseOnEsc={true}
        overlayClassName="fixed inset-0 bg-black/75 z-40"
        className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-3xl outline-none">
        <div className="relative w-full aspect-video">
          <iframe
            src={`https://www.youtube.com/embed/${trailer?.key}?autoplay=1`}
            className="w-full h-full"
            allow="autoplay; fullscreen"
          />
        </div>
      </Modal>

    </>
  )
}
