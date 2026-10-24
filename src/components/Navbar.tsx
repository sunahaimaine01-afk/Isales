import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { DEALERSHIP_CONFIG } from '../config/contact';

interface NavbarProps {
  onOpenInquiry: (vehicleName?: string) => void;
  onNavigateToInventory: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenInquiry,
  onNavigateToInventory,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 24);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    if (href === '#inventory') {
      onNavigateToInventory();
      return;
    }
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#FAF9F6]/95 backdrop-blur-md border-b border-[#E6E2D8] py-3.5 shadow-sm'
            : 'bg-[#FAF9F6]/80 backdrop-blur-sm border-b border-[#E6E2D8]/60 py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Top Bar 3-Zone Contract: Brand — 4-5 Nav Links — 1 Primary Action */}
          <div className="flex items-center justify-between gap-8">
            
            {/* Zone 1: Brand Wordmark (Single text element wordmark, no decorative subtext tags) */}
            <a
              href="#"
              className="group flex items-center gap-2 whitespace-nowrap shrink-0 text-decoration-none"
            >
              <span className="font-display font-extrabold text-xl sm:text-2xl tracking-tight text-[#121417] transition-colors group-hover:text-[#C5221F]">
                I SALE AUTOS
              </span>
            </a>

            {/* Zone 2: Navigation Links (Clean single-line text links with subtle hover feedback) */}
            <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-[#292D35]">
              <a
                href="#inventory"
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick('#inventory');
                }}
                className="hover:text-[#C5221F] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                Inventory
              </a>
              <a
                href="#why-choose-us"
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick('#why-choose-us');
                }}
                className="hover:text-[#C5221F] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                Why Choose Us
              </a>
              <a
                href="#about"
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick('#about');
                }}
                className="hover:text-[#C5221F] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                About
              </a>
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick('#contact');
                }}
                className="hover:text-[#C5221F] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                Contact
              </a>
            </nav>

            {/* Zone 3: 1 Primary Action */}
            <div className="hidden sm:flex items-center gap-3 shrink-0">
              <button
                type="button"
                onClick={() => onOpenInquiry()}
                className="inline-flex items-center justify-center px-4 py-2 text-xs font-semibold uppercase tracking-wider text-white bg-[#121417] hover:bg-[#C5221F] rounded transition-all duration-200 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C5221F]"
              >
                Ask About a Vehicle
              </button>
            </div>

            {/* Mobile Hamburger Button */}
            <div className="flex md:hidden items-center gap-2">
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-[#121417] hover:text-[#C5221F] hover:bg-[#F3F1EB] rounded transition-colors focus-visible:outline-none"
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

          </div>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden bg-black/60 backdrop-blur-xs flex justify-end">
          <div className="w-4/5 max-w-sm bg-[#FAF9F6] h-full shadow-2xl flex flex-col justify-between p-6 overflow-y-auto">
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-[#E6E2D8]">
                <span className="font-display font-bold text-lg text-[#121417]">
                  I SALE AUTOS
                </span>
                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 text-[#4B5260] hover:text-[#121417]"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <nav className="flex flex-col gap-4 mt-8">
                <a
                  href="#inventory"
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick('#inventory');
                  }}
                  className="text-base font-medium text-[#121417] hover:text-[#C5221F] py-2 border-b border-[#F3F1EB]"
                >
                  Current Inventory
                </a>
                <a
                  href="#why-choose-us"
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick('#why-choose-us');
                  }}
                  className="text-base font-medium text-[#121417] hover:text-[#C5221F] py-2 border-b border-[#F3F1EB]"
                >
                  Why Choose Us
                </a>
                <a
                  href="#about"
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick('#about');
                  }}
                  className="text-base font-medium text-[#121417] hover:text-[#C5221F] py-2 border-b border-[#F3F1EB]"
                >
                  About the Business
                </a>
                <a
                  href="#contact"
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick('#contact');
                  }}
                  className="text-base font-medium text-[#121417] hover:text-[#C5221F] py-2 border-b border-[#F3F1EB]"
                >
                  Contact & Instagram
                </a>
              </nav>

              <div className="mt-8 pt-6 border-t border-[#E6E2D8]">
                <a
                  href={DEALERSHIP_CONFIG.instagram.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-between w-full p-3 bg-[#F3F1EB] rounded text-sm font-semibold text-[#121417] hover:bg-[#E6E2D8] transition-colors"
                >
                  <span>Follow @isale.autos</span>
                  <ArrowUpRight className="w-4 h-4 text-[#4B5260]" />
                </a>
              </div>
            </div>

            <div className="pt-6 border-t border-[#E6E2D8]">
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenInquiry();
                }}
                className="w-full py-3 px-4 text-xs font-semibold uppercase tracking-wider text-white bg-[#C5221F] hover:bg-[#A91916] rounded text-center transition-colors shadow-sm"
              >
                Send Vehicle Inquiry
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
