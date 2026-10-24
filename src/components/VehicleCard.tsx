import React from 'react';
import { ArrowRight, Eye, Instagram, FileText } from 'lucide-react';
import { Vehicle } from '../types/inventory';
import { SafeCarImage } from './SafeCarImage';

interface VehicleCardProps {
  vehicle: Vehicle;
  onSelect: (vehicle: Vehicle) => void;
  onInquire: (vehicle: Vehicle) => void;
}

export const VehicleCard: React.FC<VehicleCardProps> = ({
  vehicle,
  onSelect,
  onInquire,
}) => {
  const primaryImage = vehicle.images[0];

  return (
    <article className="group bg-white border border-[#E6E2D8] hover:border-[#CBD0D8] rounded-lg overflow-hidden transition-all duration-300 hover:shadow-lg flex flex-col justify-between">
      
      {/* Top Media Area with subtle status ribbon */}
      <div className="relative overflow-hidden cursor-pointer" onClick={() => onSelect(vehicle)}>
        <SafeCarImage
          src={primaryImage.url}
          fallbackSrc={primaryImage.fallbackUrl}
          alt={primaryImage.alt}
          aspectRatio="4/3"
          vehicleTitle={`${vehicle.year} ${vehicle.make} ${vehicle.model}`}
          className="group-hover:scale-105 transition-transform duration-500 ease-out"
        />

        {/* Clean status overlay kicker (Unboxed, elegant contrast strip) */}
        <div className="absolute top-3 left-3 bg-black/75 backdrop-blur-xs text-white text-[11px] font-medium px-2.5 py-1 rounded">
          <span>{vehicle.titleStatus}</span>
        </div>

        {/* Photo count indicator */}
        <div className="absolute bottom-3 right-3 bg-black/70 backdrop-blur-xs text-white text-[10px] font-mono px-2 py-0.5 rounded flex items-center gap-1">
          <Eye className="w-3 h-3" />
          <span>{vehicle.images.length} Photos</span>
        </div>
      </div>

      {/* Card Content Area */}
      <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
        
        <div>
          {/* Metadata Row: Unboxed clean text with bullet separators */}
          <div className="flex items-center gap-2 text-xs text-[#4B5260] font-medium mb-1.5">
            <span>{vehicle.year}</span>
            <span aria-hidden="true">·</span>
            <span>{vehicle.bodyStyle}</span>
            <span aria-hidden="true">·</span>
            <span>{vehicle.engine}</span>
          </div>

          {/* Vehicle Title */}
          <h3
            onClick={() => onSelect(vehicle)}
            className="font-display font-bold text-xl sm:text-2xl text-[#121417] group-hover:text-[#C5221F] transition-colors cursor-pointer mb-2"
          >
            {vehicle.year} {vehicle.make} {vehicle.model}
          </h3>

          {/* Description Excerpt */}
          <p className="text-xs sm:text-sm text-[#4B5260] leading-relaxed line-clamp-2 mb-4">
            {vehicle.description}
          </p>

          {/* Key Specifications Grid (Strictly using verified prompt details) */}
          <div className="grid grid-cols-2 gap-x-4 gap-y-2 py-3 px-3.5 bg-[#FAF9F6] border border-[#F3F1EB] rounded text-xs mb-5">
            <div>
              <span className="text-[#4B5260] block text-[11px]">Title Status</span>
              <span className="font-semibold text-[#121417]">{vehicle.titleStatus}</span>
            </div>
            <div>
              <span className="text-[#4B5260] block text-[11px]">Availability</span>
              <span className="font-semibold text-[#121417]">{vehicle.availability}</span>
            </div>
            <div>
              <span className="text-[#4B5260] block text-[11px]">Price</span>
              <span className="font-medium text-[#292D35]">{vehicle.price}</span>
            </div>
            <div>
              <span className="text-[#4B5260] block text-[11px]">Mileage</span>
              <span className="font-medium text-[#292D35]">{vehicle.mileage}</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-2 pt-2 border-t border-[#F3F1EB]">
          {/* Primary Inquiry CTA */}
          <button
            type="button"
            onClick={() => onInquire(vehicle)}
            className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 text-xs font-semibold uppercase tracking-wider text-white bg-[#C5221F] hover:bg-[#A91916] rounded transition-colors duration-200 shadow-xs cursor-pointer"
          >
            <span>{vehicle.ctaText}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>

          {/* Secondary Details & Instagram Source Link */}
          <div className="flex items-center justify-between text-xs text-[#4B5260] pt-1">
            <button
              type="button"
              onClick={() => onSelect(vehicle)}
              className="inline-flex items-center gap-1 font-medium text-[#121417] hover:text-[#C5221F] transition-colors cursor-pointer py-1"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>View Full Specs & Gallery</span>
            </button>

            <a
              href={vehicle.instagramReference.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-[#4B5260] hover:text-[#121417] transition-colors"
              title="Verified on Instagram @isale.autos"
            >
              <Instagram className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Instagram</span>
            </a>
          </div>
        </div>

      </div>
    </article>
  );
};
