import React from 'react';
import { Eye, MessageSquare, FileSpreadsheet, Send } from 'lucide-react';

export const WhyChooseUs: React.FC = () => {
  const pillars = [
    {
      index: '01',
      icon: Eye,
      title: 'Browse Available Vehicles',
      description:
        'Explore real, active listings with exterior photography, honest condition disclosures, and known mechanical details right on the page.',
    },
    {
      index: '02',
      icon: MessageSquare,
      title: 'Ask Questions Directly',
      description:
        'Talk directly with the seller about vehicle history, title status, and driving dynamics without high-pressure sales pitches or dealership runarounds.',
    },
    {
      index: '03',
      icon: FileSpreadsheet,
      title: 'Get Details Before Deciding',
      description:
        'We lay out what we know—from engine specifications to title statuses (clean or coming in)—so you can evaluate every vehicle with clear eyes.',
    },
    {
      index: '04',
      icon: Send,
      title: 'Connect on Your Preferred Channel',
      description:
        'Reach out through our online inquiry form or send a fast direct message on Instagram (@isale.autos) for prompt replies and availability checks.',
    },
  ];

  return (
    <section id="why-choose-us" className="py-20 bg-[#F3F1EB]/60 border-b border-[#E6E2D8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-2xl mb-14">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#4B5260] mb-2">
            <span>Direct Dealership Experience</span>
          </div>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-[#121417] tracking-tight">
            Why Choose I SALE AUTOS
          </h2>
          <p className="mt-3 text-base text-[#292D35] leading-relaxed">
            A straightforward way to purchase your next car. We prioritize direct buyer
            communication, transparent title status disclosure, and genuine customer care.
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.index}
                className="bg-white border border-[#E6E2D8] rounded-lg p-6 flex flex-col justify-between hover:border-[#CBD0D8] transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <span className="font-mono text-xs font-bold text-[#C5221F]">
                      {pillar.index}
                    </span>
                    <div className="w-9 h-9 rounded bg-[#FAF9F6] border border-[#E6E2D8] flex items-center justify-center text-[#121417]">
                      <Icon className="w-4 h-4 text-[#C5221F]" />
                    </div>
                  </div>

                  <h3 className="font-display font-bold text-lg text-[#121417] mb-2.5">
                    {pillar.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#4B5260] leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
