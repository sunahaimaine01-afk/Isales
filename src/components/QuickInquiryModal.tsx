import React, { useState, useEffect } from 'react';
import { X, Send, CheckCircle, Instagram, ArrowUpRight } from 'lucide-react';
import { InquiryFormData, Vehicle } from '../types/inventory';
import { DEALERSHIP_CONFIG } from '../config/contact';

interface QuickInquiryModalProps {
  vehicle: Vehicle | null;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: InquiryFormData) => void;
}

export const QuickInquiryModal: React.FC<QuickInquiryModalProps> = ({
  vehicle,
  isOpen,
  onClose,
  onSubmit,
}) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const vehicleName = vehicle
    ? `${vehicle.year} ${vehicle.make} ${vehicle.model}`
    : 'Selected Vehicle';

  useEffect(() => {
    if (vehicle) {
      setMessage(
        `Hi, I am interested in the ${vehicle.year} ${vehicle.make} ${vehicle.model} (${vehicle.titleStatus}). Please let me know current availability and details.`
      );
    } else {
      setMessage('Hi, I would like more information on your current vehicle inventory.');
    }
    setIsSubmitted(false);
    setErrors({});
  }, [vehicle, isOpen]);

  if (!isOpen) return null;

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!fullName.trim() || fullName.trim().length < 2) {
      errs.fullName = 'Please enter your full name.';
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim() || !emailRegex.test(email.trim())) {
      errs.email = 'Please provide a valid email address.';
    }
    if (!message.trim() || message.trim().length < 10) {
      errs.message = 'Please provide a message with at least 10 characters.';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      const submission: InquiryFormData = {
        id: `inq-${Date.now()}`,
        fullName,
        email,
        phone,
        vehicleOfInterest: vehicleName,
        message,
        submittedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      onSubmit(submission);
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 350);
  };

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-xs flex items-center justify-center p-4 animate-fade-in"
      onClick={onClose}
    >
      <div
        className="relative bg-white w-full max-w-lg rounded-xl shadow-2xl overflow-hidden border border-[#D1D5DB]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#E6E2D8] bg-[#FAF9F6]">
          <div>
            <h3 className="font-display font-bold text-lg text-[#121417]">
              Inquire About Vehicle
            </h3>
            <p className="text-xs text-[#4B5260] font-medium line-clamp-1">
              {vehicleName}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-[#4B5260] hover:text-[#121417] rounded transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {!isSubmitted ? (
            <form onSubmit={handleSubmit} noValidate className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#121417] mb-1">
                  Full Name <span className="text-[#C5221F]">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Your full name"
                  className="w-full px-3 py-2 text-sm bg-[#FAF9F6] border border-[#D1D5DB] rounded text-[#121417] focus:outline-none focus:border-[#C5221F]"
                />
                {errors.fullName && <p className="text-xs text-red-600 mt-1">{errors.fullName}</p>}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#121417] mb-1">
                    Email <span className="text-[#C5221F]">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="email@example.com"
                    className="w-full px-3 py-2 text-sm bg-[#FAF9F6] border border-[#D1D5DB] rounded text-[#121417] focus:outline-none focus:border-[#C5221F]"
                  />
                  {errors.email && <p className="text-xs text-red-600 mt-1">{errors.email}</p>}
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#121417] mb-1">
                    Phone <span className="text-[#4B5260] font-normal lowercase">(optional)</span>
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="(555) 000-0000"
                    className="w-full px-3 py-2 text-sm bg-[#FAF9F6] border border-[#D1D5DB] rounded text-[#121417] focus:outline-none focus:border-[#C5221F]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#121417] mb-1">
                  Vehicle of Interest
                </label>
                <input
                  type="text"
                  readOnly
                  value={vehicleName}
                  className="w-full px-3 py-2 text-sm bg-[#F3F1EB] border border-[#E6E2D8] rounded text-[#4B5260] cursor-not-allowed font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#121417] mb-1">
                  Message <span className="text-[#C5221F]">*</span>
                </label>
                <textarea
                  required
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-[#FAF9F6] border border-[#D1D5DB] rounded text-[#121417] focus:outline-none focus:border-[#C5221F]"
                />
                {errors.message && <p className="text-xs text-red-600 mt-1">{errors.message}</p>}
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 text-xs font-semibold uppercase tracking-wider text-white bg-[#C5221F] hover:bg-[#A91916] rounded transition-colors shadow-xs cursor-pointer"
                >
                  <span>{vehicle ? vehicle.ctaText : 'Send Vehicle Inquiry'}</span>
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
            </form>
          ) : (
            <div className="text-center py-4 space-y-4">
              <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center mx-auto text-emerald-600">
                <CheckCircle className="w-6 h-6" />
              </div>
              <h4 className="font-display font-bold text-lg text-[#121417]">
                Inquiry Recorded (Demo)
              </h4>
              <p className="text-xs text-[#4B5260] leading-relaxed max-w-sm mx-auto">
                Your message regarding the <strong className="text-[#121417]">{vehicleName}</strong> has been received in this demonstration showcase.
              </p>
              <div className="p-3 bg-[#FAF9F6] border border-[#E6E2D8] rounded text-xs space-y-2">
                <p className="text-[#4B5260]">
                  Want an immediate answer directly from the owner?
                </p>
                <a
                  href={DEALERSHIP_CONFIG.instagram.dmUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-1.5 w-full py-2 bg-[#121417] hover:bg-[#C5221F] text-white font-semibold rounded text-xs transition-colors"
                >
                  <Instagram className="w-3.5 h-3.5" />
                  <span>Send Direct Message to @isale.autos</span>
                  <ArrowUpRight className="w-3 h-3" />
                </a>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="text-xs font-semibold text-[#121417] hover:text-[#C5221F]"
              >
                Done
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
