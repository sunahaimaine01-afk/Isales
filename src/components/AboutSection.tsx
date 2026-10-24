import React from 'react';
import { ArrowUpRight, Instagram, Check } from 'lucide-react';
import { DEALERSHIP_CONFIG } from '../config/contact';
import { SafeCarImage } from './SafeCarImage';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-20 lg:py-28 bg-[#FAF9F6] border-b border-[#E6E2D8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Split Layout: Image on Left / Editorial on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Visual Showcase Side */}
          <div className="lg:col-span-6 relative">
            <div className="rounded-lg overflow-hidden border border-[#E6E2D8] bg-[#121417] shadow-lg">
              <SafeCarImage
                src="https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&w=1400&q=80"
                fallbackSrc="https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=1400&q=80"
                alt="I SALE AUTOS automotive showroom and vehicle presentation"
                aspectRatio="4/3"
                vehicleTitle="I SALE AUTOS Automotive Presentation"
              />
            </div>

            {/* Subtle editorial card inset */}
            <div className="hidden sm:block absolute -bottom-6 -right-6 max-w-xs bg-white border border-[#E6E2D8] rounded p-4 shadow-md">
              <div className="flex items-center gap-2 mb-1">
                <Instagram className="w-4 h-4 text-[#C5221F]" />
                <span className="text-xs font-bold text-[#121417]">
                  {DEALERSHIP_CONFIG.instagram.handle}
                </span>
              </div>
              <p className="text-[11px] text-[#4B5260] leading-snug">
                Browse continuous vehicle updates, walkaround videos, and upcoming arrivals.
              </p>
            </div>
          </div>

          {/* Editorial Content Side */}
          <div className="lg:col-span-6 space-y-6">
            
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#4B5260]">
              <span>About the Business</span>
            </div>

            <h2 className="font-display font-bold text-3xl sm:text-4xl text-[#121417] tracking-tight leading-tight [text-wrap:balance]">
              Curating Quality Pre-Owned Drives with Direct Transparency.
            </h2>

            <div className="space-y-4 text-sm sm:text-base text-[#292D35] leading-relaxed">
              <p>
                <strong>I SALE AUTOS</strong> is an independent automotive business dedicated to
                connecting drivers with pre-owned vehicles that fit their needs, lifestyle, and
                next chapter.
              </p>
              <p>
                Rather than navigating traditional dealership pressure and hidden dealer fees,
                buyers work directly with the seller. Every listing is published with clear
                stated specifications, genuine photos, and straightforward disclosures on title
                status—whether clean in hand or coming in.
              </p>
            </div>

            {/* Editorial Commitments */}
            <div className="space-y-2.5 pt-2 border-t border-[#E6E2D8]">
              <div className="flex items-center gap-2 text-xs font-medium text-[#121417]">
                <Check className="w-4 h-4 text-[#C5221F] shrink-0" />
                <span>Upfront stated title status disclosure on every vehicle</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-medium text-[#121417]">
                <Check className="w-4 h-4 text-[#C5221F] shrink-0" />
                <span>Direct communication for rapid inquiries and walkarounds</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-medium text-[#121417]">
                <Check className="w-4 h-4 text-[#C5221F] shrink-0" />
                <span>Active digital inventory accessible via Instagram @isale.autos</span>
              </div>
            </div>

            {/* Direct Channel CTA */}
            <div className="pt-2">
              <a
                href={DEALERSHIP_CONFIG.instagram.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 text-xs font-semibold uppercase tracking-wider text-[#121417] bg-[#F3F1EB] hover:bg-[#E6E2D8] border border-[#D1D5DB] rounded transition-colors"
              >
                <Instagram className="w-4 h-4 text-[#C5221F]" />
                <span>Follow @isale.autos on Instagram</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-[#4B5260]" />
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
