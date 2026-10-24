import React from 'react';
import { ArrowDown, ArrowRight, ShieldCheck, MessageCircle, FileCheck } from 'lucide-react';
import { SafeCarImage } from './SafeCarImage';

interface HeroProps {
  onExploreInventory: () => void;
  onAskAboutVehicle: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onExploreInventory,
  onAskAboutVehicle,
}) => {
  return (
    <section className="relative pt-28 pb-16 lg:pt-36 lg:pb-24 overflow-hidden border-b border-[#E6E2D8]">
      {/* Background Architectural Accent */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-[#F3F1EB]/80 to-transparent pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Editorial Headline & Actions */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            
            {/* Clean unboxed lead kicker (No pill badge!) */}
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#4B5260] mb-4">
              <span>Independent Pre-Owned Dealership</span>
              <span aria-hidden="true">·</span>
              <span>Direct Seller Access</span>
            </div>

            {/* Editorial Headline */}
            <h1 className="font-display font-bold text-4xl sm:text-5xl lg:text-6xl tracking-tight text-[#121417] leading-[1.08] mb-6 [text-wrap:balance]">
              Find Your Next Drive.
            </h1>

            {/* Supporting Copy */}
            <p className="text-base sm:text-lg text-[#292D35] font-normal leading-relaxed mb-8 max-w-xl">
              Explore our available vehicles and discover a car that fits your next chapter.
              Honest vehicle details, upfront title disclosures, and direct communication
              straight from our active inventory.
            </p>

            {/* Dual CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-10">
              <button
                type="button"
                onClick={onExploreInventory}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold text-white bg-[#C5221F] hover:bg-[#A91916] rounded transition-all duration-200 shadow-sm hover:shadow group cursor-pointer"
              >
                <span>Explore Inventory</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
              </button>

              <button
                type="button"
                onClick={onAskAboutVehicle}
                className="inline-flex items-center justify-center px-6 py-3.5 text-sm font-semibold text-[#121417] bg-white hover:bg-[#F3F1EB] border border-[#D1D5DB] hover:border-[#9CA3AF] rounded transition-all duration-200 cursor-pointer"
              >
                Ask About a Vehicle
              </button>
            </div>

            {/* Real Business Attributes (Unboxed clean metadata with icons) */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-[#E6E2D8] text-xs text-[#292D35]">
              <div className="flex items-start gap-2">
                <FileCheck className="w-4 h-4 text-[#C5221F] shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold block text-[#121417]">Stated Titles</span>
                  <span className="text-[#4B5260]">Transparent condition</span>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <MessageCircle className="w-4 h-4 text-[#C5221F] shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold block text-[#121417]">Direct Seller</span>
                  <span className="text-[#4B5260]">No sales middleman</span>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <ShieldCheck className="w-4 h-4 text-[#C5221F] shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold block text-[#121417]">Real Cars</span>
                  <span className="text-[#4B5260]">Instagram @isale.autos</span>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Cinematic Automotive Hero Frame */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-lg overflow-hidden border border-[#E6E2D8] bg-[#121417] shadow-xl group">
              <SafeCarImage
                src="https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=1600&q=85"
                fallbackSrc="https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1600&q=85"
                alt="I SALE AUTOS luxury performance vehicle showcase"
                aspectRatio="16/9"
                vehicleTitle="I SALE AUTOS Featured Collection"
                className="brightness-[0.92] group-hover:scale-[1.02] transition-transform duration-700"
              />

              {/* Cinematic Bottom Gradient Overlay */}
              <div className="absolute inset-x-0 bottom-0 p-5 bg-gradient-to-t from-black/85 via-black/40 to-transparent flex items-end justify-between">
                <div>
                  <span className="text-[11px] uppercase tracking-wider text-zinc-300 font-medium block">
                    Active Catalog
                  </span>
                  <span className="text-white font-display font-semibold text-base sm:text-lg">
                    Selected Pre-Owned Vehicles
                  </span>
                </div>
                <button
                  type="button"
                  onClick={onExploreInventory}
                  className="px-3 py-1.5 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 text-white text-xs font-medium rounded transition-colors"
                >
                  View Listings
                </button>
              </div>
            </div>

            {/* Subtle Metallic Corner Accent */}
            <div className="hidden sm:block absolute -bottom-3 -right-3 w-24 h-24 border-r-2 border-b-2 border-[#C5221F]/30 rounded-br-lg pointer-events-none" />
          </div>

        </div>

        {/* Scroll Cue */}
        <div className="mt-14 pt-4 flex justify-center">
          <button
            type="button"
            onClick={onExploreInventory}
            className="flex flex-col items-center gap-1.5 text-xs text-[#4B5260] hover:text-[#121417] transition-colors cursor-pointer group"
            aria-label="Scroll to vehicle inventory"
          >
            <span className="uppercase tracking-widest text-[10px] font-semibold">Scroll to inventory</span>
            <ArrowDown className="w-3.5 h-3.5 text-[#C5221F] animate-bounce" />
          </button>
        </div>

      </div>
    </section>
  );
};
