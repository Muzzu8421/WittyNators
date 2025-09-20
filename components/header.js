"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="w-full">
      {/* Header */}
      <header className="bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-400 shadow-2xl sticky top-0 z-50 backdrop-blur-sm w-full">
        <div className="w-full max-w-7xl mx-auto flex justify-between items-center py-3 px-4 sm:px-6 lg:px-8">
          {/* Logo Section */}
          <Link href="/" className="flex items-center gap-2 sm:gap-3 transform hover:scale-105 transition-transform duration-300 min-w-0">
            <div className="relative flex-shrink-0">
              <div className="absolute -inset-1 bg-gradient-to-r from-pink-400 to-yellow-400 rounded-full blur opacity-60 animate-pulse"></div>
              <Image
                src="/logo.png"
                alt="EcoLearn"
                width={64}
                height={64}
                className="relative h-12 w-12 sm:h-14 sm:w-14 md:h-16 md:w-16 rounded-full border-2 sm:border-4 border-white shadow-xl object-cover"
              />
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-white font-black text-lg sm:text-xl md:text-2xl lg:text-3xl tracking-tight drop-shadow-lg truncate">
                EcoLearn
              </span>
              <span className="text-white/80 text-xs sm:text-sm font-medium -mt-1 hidden sm:block">
                Learn • Play • Grow
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-6 xl:space-x-8">
            {[
              { name: 'Features', href: '/#features' },
              { name: 'About', href: '/#about' },
              { name: 'Dashboard', href: '/student-dashboard' }
            ].map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="relative text-white font-semibold text-base xl:text-lg hover:text-yellow-200 transition-all duration-300 group whitespace-nowrap"
              >
                {item.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-yellow-300 transition-all duration-300 group-hover:w-full"></span>
              </Link>
            ))}
            <Link
              href="/teachers-dashboard"
              className="bg-white text-emerald-500 px-4 xl:px-6 py-2 rounded-full font-bold hover:bg-yellow-100 hover:text-emerald-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 text-sm xl:text-base whitespace-nowrap"
            >
              For Teachers
            </Link>
          </nav>

          {/* Medium Screen Navigation (Tablet) */}
          <nav className="hidden md:flex lg:hidden items-center space-x-4">
            {[
              { name: 'Features', href: '/#features' },
              { name: 'About', href: '/#about' }
            ].map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-white font-semibold text-sm hover:text-yellow-200 transition-all duration-300 whitespace-nowrap"
              >
                {item.name}
              </Link>
            ))}
            <Link
              href="/student-dashboard"
              className="bg-white text-emerald-500 px-4 py-2 rounded-full font-bold hover:bg-yellow-100 hover:text-emerald-600 transition-all duration-300 shadow-lg text-sm whitespace-nowrap"
            >
              Dashboard
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden bg-white/20 backdrop-blur-sm p-2 sm:p-3 rounded-xl hover:bg-white/30 transition-all duration-300 flex-shrink-0"
            suppressHydrationWarning={true}
            aria-label="Toggle menu"
          >
            <div className="w-5 h-4 sm:w-6 sm:h-5 flex flex-col justify-between">
              <span className={`w-full h-0.5 bg-white transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-1.5 sm:translate-y-2' : ''}`}></span>
              <span className={`w-full h-0.5 bg-white transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`}></span>
              <span className={`w-full h-0.5 bg-white transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-1.5 sm:-translate-y-2' : ''}`}></span>
            </div>
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden transition-all duration-300 overflow-hidden w-full ${menuOpen ? 'max-h-80' : 'max-h-0'}`}>
          <nav className="bg-white/10 backdrop-blur-sm border-t border-white/20 w-full">
            {[
              { name: 'Features', href: '/#features' },
              { name: 'About', href: '/#about' },
              { name: 'Dashboard', href: '/student-dashboard' },
              { name: 'For Teachers', href: '/teachers-dashboard' }
            ].map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="block px-4 sm:px-6 py-3 sm:py-4 text-white font-semibold hover:bg-white/10 transition-all duration-300 w-full"
                onClick={() => setMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
      </header>

      {/* Decorative floating elements - Responsive positioning */}
      <div className="hidden sm:block fixed top-20 left-4 lg:left-10 w-3 h-3 sm:w-4 sm:h-4 bg-yellow-300 rounded-full animate-bounce opacity-60 z-40"></div>
      <div className="hidden md:block fixed top-28 lg:top-32 right-8 lg:right-16 w-2 h-2 sm:w-3 sm:h-3 bg-pink-300 rounded-full animate-pulse opacity-60 z-40"></div>
      <div className="hidden lg:block fixed top-24 right-24 xl:right-32 w-2 h-2 bg-blue-300 rounded-full animate-bounce opacity-60 z-40" style={{ animationDelay: '0.5s' }}></div>
    </div>
  );
}
