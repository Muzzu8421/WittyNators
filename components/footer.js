"use client";

import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-emerald-500 via-cyan-500 to-blue-500 text-white">
      <div className="container mx-auto px-6 py-3">
        {/* Single Row Layout */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-3">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <Image
              src="/logo.png"
              alt="EcoLearn"
              width={32}
              height={32}
              className="h-8 w-8 rounded-full border-2 border-white object-cover"
            />
            <span className="text-lg font-bold">EcoLearn</span>
          </div>

          {/* Copyright */}
          <p className="text-white/90 text-sm">
            © 2025 EcoLearn. Made with 💚
          </p>

          {/* Social Icons */}
          <div className="flex space-x-2">
            <button 
              className="bg-white/20 p-1.5 rounded-full hover:bg-white/30 transition text-sm"
              suppressHydrationWarning={true}
            >
              📱
            </button>
            <button 
              className="bg-white/20 p-1.5 rounded-full hover:bg-white/30 transition text-sm"
              suppressHydrationWarning={true}
            >
              🌐
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
