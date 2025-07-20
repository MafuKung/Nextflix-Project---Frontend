'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, Search as SearchIcon, Bell, User } from 'lucide-react'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`
    navbar
    ${scrolled ? 'navbar-solid' : 'navbar-transparent'}
  `}
    >
      {/* ซ้ายสุด: Hamburger + Logo + Nav Links */}
      <div className="flex items-center space-x-6">
        <Menu className="block md:hidden w-6 h-6 icon-btn" />
        <Link href="/">
          <span className="navbar-logo">NEXTFLIX</span>
        </Link>
      </div>

      {/* ขวา: Search, Notifications, Profile */}
      <div className="flex items-center space-x-4 navbar-icons">
        <Link href="/search" className="icon-btn">
          <SearchIcon className="w-5 h-5" />
        </Link>
        <Bell className="w-5 h-5 icon-btn" />
        <User className="w-6 h-6 icon-btn" />
      </div>
    </header>

  )
}
