import Link from 'next/link'
import Image from 'next/image'

interface Movie {
  id: number
  title: string
  poster_path?: string | null
}

export default function CardPoster({ movie }: { movie: Movie }) {
  const hasPoster = Boolean(movie.poster_path)
  const posterUrl = movie.poster_path ? `https://image.tmdb.org/t/p/w342${movie.poster_path}` : ''

  return (
    <li className="group relative h-[12rem] w-[8rem] flex-shrink-0 cursor-pointer rounded-[0.5rem] overflow-hidden bg-[var(--color-card)]">
      <Link href={`/movie/${movie.id}`}className="absolute inset-0 z-10 block">
        <span className="sr-only">View details for {movie.title}</span>
      </Link>
      {hasPoster ? (
        <Image
          src={posterUrl}
          alt={movie.title}
          fill
          className="object-cover transition-transform duration-200 group-hover:scale-105"
        />
      ) : (
        <div className="flex items-center justify-center h-full w-full text-[var(--color-subtext)] text-xs p-2">
          No Image
        </div>
      )}
    </li>
  )
}
