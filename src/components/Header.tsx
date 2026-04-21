"use client";

import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-forest text-white sticky top-0 z-50 shadow-md">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2 font-bold text-lg tracking-wide">
            <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="9" />
              <path d="M12 3c0 9-6 9-6 18" />
              <path d="M12 3c0 9 6 9 6 18" />
              <line x1="3.5" y1="10" x2="20.5" y2="10" />
            </svg>
            Apple Hill Tennis
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            <Link href="/" className="hover:text-sage-light transition-colors text-sm uppercase tracking-wider">
              Home
            </Link>
            <Link href="/about" className="hover:text-sage-light transition-colors text-sm uppercase tracking-wider">
              About
            </Link>
            <Link href="/membership" className="hover:text-sage-light transition-colors text-sm uppercase tracking-wider">
              Membership
            </Link>
            <Link
              href="/membership#contact"
              className="bg-clay hover:bg-clay-light text-white px-4 py-2 rounded-md text-sm uppercase tracking-wider transition-colors"
            >
              Join Now
            </Link>
          </nav>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              {menuOpen ? (
                <path strokeLinecap="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <nav className="md:hidden pb-4 flex flex-col gap-3">
            <Link href="/" onClick={() => setMenuOpen(false)} className="hover:text-sage-light transition-colors text-sm uppercase tracking-wider">
              Home
            </Link>
            <Link href="/about" onClick={() => setMenuOpen(false)} className="hover:text-sage-light transition-colors text-sm uppercase tracking-wider">
              About
            </Link>
            <Link href="/membership" onClick={() => setMenuOpen(false)} className="hover:text-sage-light transition-colors text-sm uppercase tracking-wider">
              Membership
            </Link>
            <Link
              href="/membership#contact"
              onClick={() => setMenuOpen(false)}
              className="bg-clay hover:bg-clay-light text-white px-4 py-2 rounded-md text-sm uppercase tracking-wider transition-colors text-center"
            >
              Join Now
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
}
