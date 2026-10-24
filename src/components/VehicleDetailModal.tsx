import React, { useState, useEffect } from 'react';
import { X, ArrowRight, Instagram, CheckCircle2, AlertCircle, ChevronLeft, ChevronRight, Share2, Copy } from 'lucide-react';
import { Vehicle } from '../types/inventory';
import { SafeCarImage } from './SafeCarImage';

interface VehicleDetailModalProps {
  vehicle: Vehicle | null;
  onClose: () => void;
  onInquire: (vehicle: Vehicle) => void;
}

export const VehicleDetailModal: React.FC<VehicleDetailModalProps> = ({
  vehicle,
  onClose,
  onInquire,
}) => {
  const [activePhotoIndex, setActivePhotoIndex] = useState(0);
  const [copiedLink, setCopiedLink] = useState(false);

  useEffect(() => {
    setActivePhotoIndex(0);
  }, [vehicle]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!vehicle) return null;

  const currentImage = vehicle.images[activePhotoIndex] || vehicle.images[0];

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const isCleanTitle = vehicle.titleStatus.toLowerCase().includes('clean');

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-fade-in"
      onClick={onClose}
    >
      <div
        className="relative bg-white w-full max-w-4xl rounded-xl shadow-2xl overflow-hidden border border-[#D1D5DB] my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#E6E2D8] bg-[#FAF9F6]">
          <div className="flex items-center gap-3">
            <span className="text-xs font-semibold uppercase tracking-widest text-[#4B5260]">
              Vehicle Specification
            </span>
            <span aria-hidden="true" className="text-[#D1D5DB]">·</span>
            <span className="text-xs font-mono text-[#C5221F] font-medium">
              REF #{vehicle.id}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleCopyLink}
              className="p-2 text-[#4B5260] hover:text-[#121417] hover:bg-[#E6E2D8] rounded transition-colors"
              title="Copy link"
            >
              {copiedLink ? <Copy className="w-4 h-4 text-emerald-600" /> : <Share2 className="w-4 h-4" />}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="p-2 text-[#4B5260] hover:text-[#121417] hover:bg-[#E6E2D8] rounded transition-colors"
              aria-label="Close vehicle details"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 max-h-[80vh] overflow-y-auto">
          
          {/* Main Gallery Area */}
          <div className="space-y-4 mb-8">
            <div className="relative rounded-lg overflow-hidden border border-[#E6E2D8] bg-[#121417]">
              <SafeCarImage
                src={currentImage.url}
                fallbackSrc={currentImage.fallbackUrl}
                alt={currentImage.alt}
                aspectRatio="16/9"
                vehicleTitle={`${vehicle.year} ${vehicle.make} ${vehicle.model}`}
              />

              {/* Prev / Next photo buttons if multiple images */}
              {vehicle.images.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={() =>
                      setActivePhotoIndex((prev) =>
                        prev === 0 ? vehicle.images.length - 1 : prev - 1
                      )
                    }
                    className="absolute left-3 top-1/2 -translate-y-1/2 p-2 bg-black/60 hover:bg-black/90 text-white rounded-full transition-colors"
                    aria-label="Previous photo"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      setActivePhotoIndex((prev) =>
                        prev === vehicle.images.length - 1 ? 0 : prev + 1
                      )
                    }
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-2 bg-black/60 hover:bg-black/90 text-white rounded-full transition-colors"
                    aria-label="Next photo"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}

              {/* Photo Caption Overlay */}
              {currentImage.caption && (
                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 to-transparent p-4 text-xs text-zinc-300">
                  {currentImage.caption} ({activePhotoIndex + 1} of {vehicle.images.length})
                </div>
              )}
            </div>

            {/* Thumbnail Navigation */}
            {vehicle.images.length > 1 && (
              <div className="flex gap-2.5 overflow-x-auto pb-1">
                {vehicle.images.map((img, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActivePhotoIndex(idx)}
                    className={`relative w-24 h-16 rounded overflow-hidden border-2 shrink-0 transition-all ${
                      activePhotoIndex === idx
                        ? 'border-[#C5221F] ring-1 ring-[#C5221F]'
                        : 'border-[#E6E2D8] opacity-70 hover:opacity-100'
                    }`}
                  >
                    <SafeCarImage
                      src={img.url}
                      fallbackSrc={img.fallbackUrl}
                      alt={img.alt}
                      aspectRatio="4/3"
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Title & Stated Specs Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Column: Title, Description, and Instagram Source */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#4B5260] mb-1">
                  <span>{vehicle.year}</span>
                  <span aria-hidden="true">·</span>
                  <span>{vehicle.make}</span>
                  <span aria-hidden="true">·</span>
                  <span>{vehicle.bodyStyle}</span>
                </div>
                <h2 className="font-display font-bold text-2xl sm:text-3xl text-[#121417]">
                  {vehicle.year} {vehicle.make} {vehicle.model}
                </h2>
                {vehicle.trim && (
                  <p className="text-sm font-medium text-[#4B5260] mt-0.5">
                    {vehicle.trim}
                  </p>
                )}
              </div>

              {/* Title Status Verification Banner */}
              <div className={`p-4 rounded-lg border flex items-start gap-3 ${
                isCleanTitle
                  ? 'bg-emerald-50/70 border-emerald-200 text-emerald-950'
                  : 'bg-amber-50/70 border-amber-200 text-amber-950'
              }`}>
                {isCleanTitle ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                ) : (
                  <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                )}
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider">
                    Title Status: {vehicle.titleStatus}
                  </h4>
                  <p className="text-xs mt-1 text-[#292D35] leading-relaxed">
                    {isCleanTitle
                      ? 'As specified in the dealership post caption, this vehicle is listed with a clean title. Contact the seller directly to review title documentation.'
                      : 'As specified in the dealership post caption, the title is currently coming in. Contact the seller directly for updated documentation timing.'}
                  </p>
                </div>
              </div>

              {/* Description Prose */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#121417] mb-2">
                  Seller Description
                </h4>
                <p className="text-sm text-[#292D35] leading-relaxed">
                  {vehicle.description}
                </p>
              </div>

              {/* Instagram Reference Card */}
              <div className="p-4 bg-[#FAF9F6] border border-[#E6E2D8] rounded-lg">
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="font-semibold text-[#121417] flex items-center gap-1.5">
                    <Instagram className="w-4 h-4 text-[#C5221F]" />
                    <span>Instagram Source</span>
                  </span>
                  <a
                    href={vehicle.instagramReference.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-[#C5221F] hover:underline"
                  >
                    {vehicle.instagramReference.account}
                  </a>
                </div>
                <p className="text-xs text-[#4B5260] italic">
                  "{vehicle.instagramReference.postCaptionExcerpt}"
                </p>
              </div>
            </div>

            {/* Right Column: Known Specifications Table & CTAs */}
            <div className="lg:col-span-5 bg-[#FAF9F6] border border-[#E6E2D8] rounded-xl p-5 sm:p-6 space-y-6">
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#121417] mb-3 pb-2 border-b border-[#E6E2D8]">
                  Known Vehicle Data
                </h4>
                <dl className="space-y-2.5 text-xs">
                  <div className="flex justify-between py-1 border-b border-[#F3F1EB]">
                    <dt className="text-[#4B5260]">Year</dt>
                    <dd className="font-medium text-[#121417] font-mono tabular-nums">{vehicle.year}</dd>
                  </div>
                  <div className="flex justify-between py-1 border-b border-[#F3F1EB]">
                    <dt className="text-[#4B5260]">Make & Model</dt>
                    <dd className="font-medium text-[#121417]">{vehicle.make} {vehicle.model}</dd>
                  </div>
                  <div className="flex justify-between py-1 border-b border-[#F3F1EB]">
                    <dt className="text-[#4B5260]">Engine</dt>
                    <dd className="font-medium text-[#121417] text-right">{vehicle.engine}</dd>
                  </div>
                  <div className="flex justify-between py-1 border-b border-[#F3F1EB]">
                    <dt className="text-[#4B5260]">Title Status</dt>
                    <dd className="font-semibold text-[#121417]">{vehicle.titleStatus}</dd>
                  </div>
                  <div className="flex justify-between py-1 border-b border-[#F3F1EB]">
                    <dt className="text-[#4B5260]">Price</dt>
                    <dd className="font-medium text-[#292D35]">{vehicle.price}</dd>
                  </div>
                  <div className="flex justify-between py-1 border-b border-[#F3F1EB]">
                    <dt className="text-[#4B5260]">Mileage</dt>
                    <dd className="font-medium text-[#292D35]">{vehicle.mileage}</dd>
                  </div>
                  <div className="flex justify-between py-1 border-b border-[#F3F1EB]">
                    <dt className="text-[#4B5260]">Transmission</dt>
                    <dd className="font-medium text-[#292D35]">{vehicle.transmission}</dd>
                  </div>
                  <div className="flex justify-between py-1">
                    <dt className="text-[#4B5260]">Availability</dt>
                    <dd className="font-semibold text-[#C5221F]">{vehicle.availability}</dd>
                  </div>
                </dl>
              </div>

              {/* Inquiry Action Buttons */}
              <div className="space-y-3 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onInquire(vehicle);
                  }}
                  className="w-full inline-flex items-center justify-center gap-2 px-5 py-3.5 text-xs font-semibold uppercase tracking-wider text-white bg-[#C5221F] hover:bg-[#A91916] rounded transition-colors shadow-sm cursor-pointer"
                >
                  <span>{vehicle.ctaText}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <a
                  href={`https://ig.me/m/isale.autos`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 text-xs font-semibold uppercase tracking-wider text-[#121417] bg-white hover:bg-[#F3F1EB] border border-[#D1D5DB] rounded transition-colors text-center"
                >
                  <Instagram className="w-4 h-4 text-[#C5221F]" />
                  <span>DM @isale.autos on Instagram</span>
                </a>
              </div>

              <p className="text-[11px] text-[#4B5260] text-center leading-normal">
                Demo entry matching @isale.autos. Inquiries connect directly to the seller.
              </p>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};
