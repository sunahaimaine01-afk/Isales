import React, { useState } from 'react';
import { Send, Instagram, ArrowUpRight, CheckCircle, AlertCircle, Copy, Check } from 'lucide-react';
import { DEALERSHIP_CONFIG } from '../config/contact';
import { InquiryFormData } from '../types/inventory';

interface InquirySectionProps {
  selectedVehicleTitle?: string;
  onInquirySubmitted: (data: InquiryFormData) => void;
}

export const InquirySection: React.FC<InquirySectionProps> = ({
  selectedVehicleTitle = '',
  onInquirySubmitted,
}) => {
  const [formData, setFormData] = useState<InquiryFormData>({
    fullName: '',
    email: '',
    phone: '',
    vehicleOfInterest: selectedVehicleTitle || '2012 BMW 535i',
    message: selectedVehicleTitle
      ? `Hi, I am interested in learning more about the ${selectedVehicleTitle} listed at I SALE AUTOS. Please share current availability and details.`
      : 'Hi, I would like more information about your available vehicles and upcoming inventory.',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [copiedDraft, setCopiedDraft] = useState(false);

  // Sync when prop changes
  React.useEffect(() => {
    if (selectedVehicleTitle) {
      setFormData((prev) => ({
        ...prev,
        vehicleOfInterest: selectedVehicleTitle,
        message: `Hi, I am interested in learning more about the ${selectedVehicleTitle} listed at I SALE AUTOS. Please share current availability and details.`,
      }));
    }
  }, [selectedVehicleTitle]);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.fullName.trim() || formData.fullName.trim().length < 2) {
      newErrors.fullName = 'Please enter your full name.';
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email.trim())) {
      newErrors.email = 'Please provide a valid email address.';
    }
    if (!formData.message.trim() || formData.message.trim().length < 10) {
      newErrors.message = 'Please provide a message with at least 10 characters.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    setTimeout(() => {
      const submission: InquiryFormData = {
        ...formData,
        id: `inq-${Date.now()}`,
        submittedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      onInquirySubmitted(submission);
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 400);
  };

  const handleCopyMessage = () => {
    const textToCopy = `Vehicle Inquiry: ${formData.vehicleOfInterest}\nFrom: ${formData.fullName} (${formData.email}${formData.phone ? `, ` + formData.phone : ''})\n\n${formData.message}`;
    navigator.clipboard.writeText(textToCopy);
    setCopiedDraft(true);
    setTimeout(() => setCopiedDraft(false), 2500);
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      vehicleOfInterest: 'General Inventory Inquiry',
      message: 'Hi, I would like to ask about vehicle availability.',
    });
    setErrors({});
  };

  return (
    <section id="contact" className="py-20 lg:py-28 bg-[#FAF9F6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          
          {/* Left Column: Context, Instagram Callout, Honest Transparency */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#4B5260]">
              <span>Direct Inquiries</span>
            </div>

            <h2 className="font-display font-bold text-3xl sm:text-4xl text-[#121417] tracking-tight leading-tight">
              Have a Vehicle in Mind?
            </h2>

            <p className="text-sm sm:text-base text-[#292D35] leading-relaxed">
              Ask about current vehicle availability, request specific vehicle walkaround photos,
              or discuss an upcoming purchase. Connect with us directly on our official Instagram
              or send a message through the vehicle inquiry form.
            </p>

            {/* Prominent Instagram Connection Box */}
            <div className="p-6 bg-white border border-[#E6E2D8] rounded-xl shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#121417] flex items-center justify-center text-white">
                    <Instagram className="w-5 h-5 text-[#FAF9F6]" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-[#121417]">
                      {DEALERSHIP_CONFIG.instagram.handle}
                    </h3>
                    <span className="text-xs text-[#4B5260]">Official Dealership Profile</span>
                  </div>
                </div>
              </div>

              <p className="text-xs text-[#4B5260] leading-relaxed">
                Our Instagram is the active hub for real-time inventory drops, vehicle stories,
                and direct direct message inquiries.
              </p>

              <div className="pt-2 flex flex-col sm:flex-row gap-2">
                <a
                  href={DEALERSHIP_CONFIG.instagram.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-white bg-[#121417] hover:bg-[#C5221F] rounded transition-colors text-center"
                >
                  <span>Visit Instagram Profile</span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>

                <a
                  href={DEALERSHIP_CONFIG.instagram.dmUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-[#121417] bg-[#F3F1EB] hover:bg-[#E6E2D8] border border-[#D1D5DB] rounded transition-colors text-center"
                >
                  <span>Send Direct Message</span>
                </a>
              </div>
            </div>

            {/* Technical Integration Notice for Client Demo */}
            <div className="p-4 bg-[#F3F1EB]/80 border border-[#E6E2D8] rounded text-xs text-[#4B5260] space-y-1">
              <div className="flex items-center gap-1.5 font-semibold text-[#121417]">
                <AlertCircle className="w-4 h-4 text-[#C5221F]" />
                <span>Client Demo Integration Ready</span>
              </div>
              <p className="leading-relaxed">
                This demonstration form validates customer submissions in real-time. Contact routing is
                configured in <code className="font-mono text-[#121417] bg-white px-1 py-0.5 rounded">src/config/contact.ts</code> ready
                for your CRM or email provider.
              </p>
            </div>

          </div>

          {/* Right Column: Inquiry Form Card */}
          <div className="lg:col-span-7 bg-white border border-[#E6E2D8] rounded-xl p-6 sm:p-10 shadow-sm">
            
            {!isSubmitted ? (
              <form onSubmit={handleSubmit} noValidate className="space-y-5">
                
                <div className="pb-2 border-b border-[#F3F1EB]">
                  <h3 className="font-display font-bold text-xl text-[#121417]">
                    Vehicle Inquiry Form
                  </h3>
                  <p className="text-xs text-[#4B5260] mt-0.5">
                    Submit your interest and connect directly with the seller.
                  </p>
                </div>

                {/* Full Name */}
                <div>
                  <label htmlFor="fullName" className="block text-xs font-semibold uppercase tracking-wider text-[#121417] mb-1.5">
                    Full Name <span className="text-[#C5221F]">*</span>
                  </label>
                  <input
                    id="fullName"
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => {
                      setFormData({ ...formData, fullName: e.target.value });
                      if (errors.fullName) setErrors({ ...errors, fullName: '' });
                    }}
                    placeholder="Enter your name"
                    className={`w-full px-3.5 py-2.5 text-sm bg-[#FAF9F6] border rounded text-[#121417] focus:outline-none focus:ring-1 transition-colors ${
                      errors.fullName
                        ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                        : 'border-[#D1D5DB] focus:border-[#C5221F] focus:ring-[#C5221F]'
                    }`}
                  />
                  {errors.fullName && (
                    <p className="text-xs text-red-600 mt-1">{errors.fullName}</p>
                  )}
                </div>

                {/* Email Address & Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="email" className="block text-xs font-semibold uppercase tracking-wider text-[#121417] mb-1.5">
                      Email Address <span className="text-[#C5221F]">*</span>
                    </label>
                    <input
                      id="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => {
                        setFormData({ ...formData, email: e.target.value });
                        if (errors.email) setErrors({ ...errors, email: '' });
                      }}
                      placeholder="your.email@example.com"
                      className={`w-full px-3.5 py-2.5 text-sm bg-[#FAF9F6] border rounded text-[#121417] focus:outline-none focus:ring-1 transition-colors ${
                        errors.email
                          ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                          : 'border-[#D1D5DB] focus:border-[#C5221F] focus:ring-[#C5221F]'
                      }`}
                    />
                    {errors.email && (
                      <p className="text-xs text-red-600 mt-1">{errors.email}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-xs font-semibold uppercase tracking-wider text-[#121417] mb-1.5">
                      Phone Number <span className="text-[#4B5260] font-normal lowercase">(optional)</span>
                    </label>
                    <input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                      placeholder="(555) 000-0000"
                      className="w-full px-3.5 py-2.5 text-sm bg-[#FAF9F6] border border-[#D1D5DB] rounded text-[#121417] focus:outline-none focus:border-[#C5221F] focus:ring-1 focus:ring-[#C5221F] transition-colors"
                    />
                  </div>
                </div>

                {/* Vehicle of Interest */}
                <div>
                  <label htmlFor="vehicleOfInterest" className="block text-xs font-semibold uppercase tracking-wider text-[#121417] mb-1.5">
                    Vehicle of Interest
                  </label>
                  <select
                    id="vehicleOfInterest"
                    value={formData.vehicleOfInterest}
                    onChange={(e) =>
                      setFormData({ ...formData, vehicleOfInterest: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 text-sm bg-[#FAF9F6] border border-[#D1D5DB] rounded text-[#121417] focus:outline-none focus:border-[#C5221F] focus:ring-1 focus:ring-[#C5221F] cursor-pointer"
                  >
                    <option value="2012 BMW 535i">2012 BMW 535i (Clean Title · Twin Turbo V6)</option>
                    <option value="2012 Kia Sorento EX">2012 Kia Sorento EX (Title Coming In)</option>
                    <option value="General Inventory Inquiry">General Inventory Inquiry</option>
                    <option value="Request Specific Vehicle">Request a Specific Make / Model</option>
                  </select>
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="message" className="block text-xs font-semibold uppercase tracking-wider text-[#121417] mb-1.5">
                    Message <span className="text-[#C5221F]">*</span>
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => {
                      setFormData({ ...formData, message: e.target.value });
                      if (errors.message) setErrors({ ...errors, message: '' });
                    }}
                    placeholder="Tell us what questions you have about this vehicle..."
                    className={`w-full px-3.5 py-2.5 text-sm bg-[#FAF9F6] border rounded text-[#121417] focus:outline-none focus:ring-1 transition-colors ${
                      errors.message
                        ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                        : 'border-[#D1D5DB] focus:border-[#C5221F] focus:ring-[#C5221F]'
                    }`}
                  />
                  {errors.message && (
                    <p className="text-xs text-red-600 mt-1">{errors.message}</p>
                  )}
                </div>

                {/* Submit Action */}
                <div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 text-xs font-semibold uppercase tracking-wider text-white bg-[#C5221F] hover:bg-[#A91916] disabled:opacity-75 rounded transition-all duration-200 shadow-xs cursor-pointer"
                  >
                    {isSubmitting ? (
                      <span>Validating & Recording...</span>
                    ) : (
                      <>
                        <span>Send Vehicle Inquiry</span>
                        <Send className="w-3.5 h-3.5" />
                      </>
                    )}
                  </button>
                </div>

              </form>
            ) : (
              /* Honest Success / Recorded State (Zero False Email Delivery Claims) */
              <div className="space-y-6 py-4 animate-fade-in">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
                    <CheckCircle className="w-6 h-6 text-emerald-600" />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-xl text-[#121417]">
                      Inquiry Captured (Client Demo)
                    </h3>
                    <p className="text-xs text-[#4B5260] mt-1 leading-relaxed">
                      Thank you, <strong className="text-[#121417]">{formData.fullName}</strong>. Your inquiry regarding the{' '}
                      <strong className="text-[#121417]">{formData.vehicleOfInterest}</strong> has been validated and recorded in this demo showcase.
                    </p>
                  </div>
                </div>

                {/* Summary Box */}
                <div className="bg-[#FAF9F6] border border-[#E6E2D8] rounded-lg p-4 text-xs space-y-2">
                  <div className="flex justify-between text-[#4B5260]">
                    <span>Vehicle:</span>
                    <span className="font-medium text-[#121417]">{formData.vehicleOfInterest}</span>
                  </div>
                  <div className="flex justify-between text-[#4B5260]">
                    <span>Contact Email:</span>
                    <span className="font-medium text-[#121417]">{formData.email}</span>
                  </div>
                  {formData.phone && (
                    <div className="flex justify-between text-[#4B5260]">
                      <span>Phone:</span>
                      <span className="font-medium text-[#121417]">{formData.phone}</span>
                    </div>
                  )}
                  <div className="pt-2 border-t border-[#F3F1EB] text-[#4B5260]">
                    <span className="block font-medium text-[#121417] mb-1">Your Note:</span>
                    <p className="italic bg-white p-2.5 rounded border border-[#E6E2D8]">{formData.message}</p>
                  </div>
                </div>

                {/* Direct Instagram Action Fallback */}
                <div className="p-4 bg-zinc-900 text-white rounded-lg space-y-3">
                  <div className="flex items-center gap-2 text-xs font-semibold text-zinc-300">
                    <Instagram className="w-4 h-4 text-[#C5221F]" />
                    <span>Send Directly via Instagram DM:</span>
                  </div>
                  <p className="text-xs text-zinc-400 leading-relaxed">
                    Until the dealership backend is connected to live email forwarding, the owner receives inquiries directly on Instagram:
                  </p>
                  <div className="flex flex-col sm:flex-row gap-2.5 pt-1">
                    <a
                      href={DEALERSHIP_CONFIG.instagram.dmUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 bg-[#C5221F] hover:bg-[#A91916] text-white text-xs font-semibold rounded uppercase tracking-wider transition-colors text-center"
                    >
                      <span>Open Instagram DM @isale.autos</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>

                    <button
                      type="button"
                      onClick={handleCopyMessage}
                      className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-medium rounded transition-colors cursor-pointer"
                    >
                      {copiedDraft ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          <span>Copied to Clipboard!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy Message Text</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                <div>
                  <button
                    type="button"
                    onClick={handleReset}
                    className="text-xs font-semibold text-[#121417] hover:text-[#C5221F] transition-colors cursor-pointer"
                  >
                    ← Submit Another Inquiry
                  </button>
                </div>

              </div>
            )}

          </div>

        </div>

      </div>
    </section>
  );
};
