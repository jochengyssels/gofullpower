"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Menu, X } from "lucide-react"

const menuItems = [
  { name: "home", href: "/" },
  { name: "kitespots", href: "/kitespots" },
  { name: "kiteschools", href: "/kiteschools" },
  { name: "travel agent", href: "/travel" },
  { name: "instructors", href: "/instructors" },
]

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled ? "bg-black/80 backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <Image src="/logo-icon-transpa.png" alt="full power logo" width={40} height={40} className="h-8 w-auto" />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {menuItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-sm text-white hover:text-blue-300 transition-colors uppercase tracking-wide"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-blue-300 focus:outline-none"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <span className="sr-only">Open main menu</span>
              {isMobileMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-black/90 backdrop-blur-md">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {menuItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="block px-3 py-2 text-base text-white hover:text-blue-300 uppercase tracking-wide"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  )
}
