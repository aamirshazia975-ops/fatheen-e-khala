import { useState } from 'react';
import { Menu, X } from 'lucide-react';

interface HeaderProps {
  bagCount: number;
  onOpenBag: () => void;
}

export function Header({ bagCount, onOpenBag }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { label: 'Catalog', href: '#catalog' },
    { label: 'Craft', href: '#craft' },
    { label: 'Ledger', href: '#ledger' },
    { label: 'Fit Guide', href: '#fit-guide' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#f5f4ee] border-b-4 border-black">
      <div className="max-w-[1440px] mx-auto h-16 px-6 max-[720px]:px-4 flex items-center justify-between gap-8">
        {/* Zone 1: Single text element Brand Wordmark */}
        <a
          href="#top"
          className="text-xl font-extrabold tracking-[-0.04em] text-black whitespace-nowrap shrink-0 hover:underline decoration-4 underline-offset-4"
        >
          Bauhaus Footwear
        </a>

        {/* Zone 2: 4 concise single-line navigation links */}
        <nav
          aria-label="Primary Navigation"
          className="hidden min-[721px]:flex items-center gap-8 text-sm font-bold text-black"
        >
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="py-1 hover:underline decoration-2 underline-offset-4 whitespace-nowrap shrink-0"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: 1 Primary Action (+ Mobile menu button below 720px) */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={onOpenBag}
            aria-label={`Open shopping bag, ${bagCount} ${bagCount === 1 ? 'item' : 'items'}`}
            className="h-10 px-4 border-2 border-black bg-black text-white text-sm font-extrabold tabular-nums whitespace-nowrap shrink-0 cursor-pointer hover:bg-[#0000ff] active:bg-[#ff0000]"
          >
            Bag ({bagCount})
          </button>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-nav-panel"
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className="min-[721px]:hidden w-10 h-10 border-2 border-black bg-white text-black flex items-center justify-center cursor-pointer hover:bg-[#ffff00] active:bg-black active:text-white"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Disclosure Panel (<= 720px) */}
      {mobileMenuOpen && (
        <nav
          id="mobile-nav-panel"
          aria-label="Mobile Navigation"
          className="min-[721px]:hidden border-t-4 border-black bg-[#f5f4ee] divide-y-2 divide-black"
        >
          {navItems.map((item, idx) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between px-4 py-3.5 text-base font-extrabold text-black hover:bg-[#ffff00]"
            >
              <span>
                0{idx + 1}. {item.label}
              </span>
              <span aria-hidden="true" className="text-sm font-extrabold">
                →
              </span>
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}
