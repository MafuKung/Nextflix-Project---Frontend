import "./globals.css";
import Navbar from './presentation/components/Navbar'
import type { ReactNode } from 'react'
import QueryProvider from './presentation/providers/QueryProvider'

export const metadata = {
  title: 'Nextflix',
  description: 'Movie info app',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-[var(--color-bg)] text-[var(--color-text)]">
        <QueryProvider>
          <Navbar />
          {children}
       </QueryProvider>
      </body>
    </html>
  )
}
