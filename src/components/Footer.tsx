import React from 'react';
import { Instagram, ArrowUpRight } from 'lucide-react';
import { DEALERSHIP_CONFIG } from '../config/contact';

interface FooterProps {
  onNavigate: (targetId: string) => void;
  onOpenInquiry: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenInquiry }) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#121417] text-white border-t border-[#292D35] pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 pb-14 border-b border-[#292D35]">
          
          {/* Brand Column (lg:col-span-5) */}
          <div className="lg:col-span-5 space-y-4">
            <span className="font-display font-extrabold text-2xl tracking-tight text-white block">
              I SALE AUTOS
            </span>
            <p className="text-xs sm:text-sm text-zinc-400 max-w-sm leading-relaxed">
              Curated pre-owned vehicle sales with transparent title disclosures and direct seller communication.
              Discover a vehicle that fits your next drive.
            </p>
            <div className="pt-2">
              <a
                href={DEALERSHIP_CONFIG.instagram.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs font-semibold text-zinc-300 hover:text-white transition-colors group"
              >
                <Instagram className="w-4 h-4 text-[#C5221F]" />
                <span>{DEALERSHIP_CONFIG.instagram.handle} on Instagram</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-zinc-500 group-hover:text-white transition-colors" />
              </a>
            </div>
          </div>

          {/* Navigation Links Column (lg:col-span-3) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-300">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs text-zinc-400">
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('#inventory')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Current Inventory
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('#why-choose-us')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Why Choose Us
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('#about')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  About the Business
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('#contact')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Contact & Inquiries
                </button>
              </li>
            </ul>
          </div>

          {/* Demonstration Notice & Inquiries (lg:col-span-4) */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-300">
              Demonstration Showcase
            </h4>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Custom demo created for I SALE AUTOS to demonstrate how a modern, conversion-focused
              automotive website elevates inventory presentation and buyer trust.
            </p>
            <div className="pt-1">
              <button
                type="button"
                onClick={onOpenInquiry}
                className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold uppercase tracking-wider text-white bg-[#C5221F] hover:bg-[#A91916] rounded transition-colors"
              >
                <span>Ask About a Vehicle</span>
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Copyright & Disclaimer Row */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-zinc-400">
          <div>
            <span>© {currentYear} I SALE AUTOS. All rights reserved.</span>
          </div>
          <div className="text-center sm:text-right">
            <span>Official digital profile reference: instagram.com/isale.autos</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
