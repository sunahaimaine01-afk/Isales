import React from 'react';
import { X, Mail, Phone, Calendar, Car, Trash2, ArrowUpRight } from 'lucide-react';
import { InquiryFormData } from '../types/inventory';
import { DEALERSHIP_CONFIG } from '../config/contact';

interface InquiriesPreviewModalProps {
  inquiries: InquiryFormData[];
  isOpen: boolean;
  onClose: () => void;
  onClear: () => void;
}

export const InquiriesPreviewModal: React.FC<InquiriesPreviewModalProps> = ({
  inquiries,
  isOpen,
  onClose,
  onClear,
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="relative bg-white w-full max-w-2xl rounded-xl shadow-2xl overflow-hidden border border-[#D1D5DB]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#E6E2D8] bg-[#FAF9F6]">
          <div>
            <h3 className="font-display font-bold text-base text-[#121417]">
              Demo Inquiries Lead Viewer
            </h3>
            <p className="text-xs text-[#4B5260]">
              Captured inquiries in this client demonstration session ({inquiries.length})
            </p>
          </div>
          <div className="flex items-center gap-2">
            {inquiries.length > 0 && (
              <button
                type="button"
                onClick={onClear}
                className="p-2 text-[#4B5260] hover:text-red-600 rounded transition-colors"
                title="Clear demo inquiries"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
            <button
              type="button"
              onClick={onClose}
              className="p-2 text-[#4B5260] hover:text-[#121417] rounded transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Inquiries List */}
        <div className="p-6 max-h-[65vh] overflow-y-auto space-y-4">
          {inquiries.length === 0 ? (
            <div className="text-center py-10 space-y-3">
              <div className="w-12 h-12 rounded-full bg-[#FAF9F6] border border-[#E6E2D8] flex items-center justify-center mx-auto text-[#4B5260]">
                <Mail className="w-5 h-5" />
              </div>
              <p className="text-sm font-semibold text-[#121417]">No inquiries submitted yet</p>
              <p className="text-xs text-[#4B5260] max-w-sm mx-auto">
                Test the "Send Vehicle Inquiry" form on any vehicle card or in the contact section to see how buyer inquiries are organized.
              </p>
            </div>
          ) : (
            inquiries.map((inq, idx) => (
              <div
                key={inq.id || idx}
                className="p-4 bg-[#FAF9F6] border border-[#E6E2D8] rounded-lg space-y-2 text-xs"
              >
                <div className="flex items-center justify-between pb-2 border-b border-[#E6E2D8]">
                  <span className="font-bold text-sm text-[#121417]">{inq.fullName}</span>
                  <span className="text-[11px] text-[#4B5260] font-mono flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {inq.submittedAt || 'Just now'}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[#4B5260]">
                  <div className="flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-[#C5221F]" />
                    <span className="text-[#121417]">{inq.email}</span>
                  </div>
                  {inq.phone && (
                    <div className="flex items-center gap-1.5">
                      <Phone className="w-3.5 h-3.5 text-[#C5221F]" />
                      <span className="text-[#121417]">{inq.phone}</span>
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-1.5 text-[#121417] font-medium pt-1">
                  <Car className="w-3.5 h-3.5 text-[#C5221F]" />
                  <span>Vehicle: {inq.vehicleOfInterest}</span>
                </div>

                <div className="pt-2 bg-white p-3 rounded border border-[#E6E2D8] text-[#292D35] leading-relaxed">
                  <p className="italic">"{inq.message}"</p>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Integration Note in Drawer */}
        <div className="p-4 bg-[#FAF9F6] border-t border-[#E6E2D8] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#4B5260]">
          <span>
            Integration endpoint ready in <code className="font-mono text-[#121417]">src/config/contact.ts</code>
          </span>
          <a
            href={DEALERSHIP_CONFIG.instagram.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 font-semibold text-[#121417] hover:text-[#C5221F]"
          >
            <span>Instagram: @isale.autos</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </div>
  );
};
