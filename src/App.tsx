/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { InventoryFilter } from './components/InventoryFilter';
import { VehicleCard } from './components/VehicleCard';
import { VehicleDetailModal } from './components/VehicleDetailModal';
import { QuickInquiryModal } from './components/QuickInquiryModal';
import { WhyChooseUs } from './components/WhyChooseUs';
import { AboutSection } from './components/AboutSection';
import { InquirySection } from './components/InquirySection';
import { Footer } from './components/Footer';
import { InquiriesPreviewModal } from './components/InquiriesPreviewModal';
import { INITIAL_INVENTORY } from './data/inventory';
import { Vehicle, VehicleFilter, InquiryFormData } from './types/inventory';
import { DEALERSHIP_CONFIG } from './config/contact';
import { Info, Instagram, SearchX, Mail, ArrowUpRight } from 'lucide-react';

export default function App() {
  const [inventory] = useState<Vehicle[]>(INITIAL_INVENTORY);
  const [selectedVehicleForDetail, setSelectedVehicleForDetail] = useState<Vehicle | null>(null);
  const [selectedVehicleForInquiry, setSelectedVehicleForInquiry] = useState<Vehicle | null>(null);
  const [isQuickInquiryOpen, setIsQuickInquiryOpen] = useState(false);
  const [isDemoInquiriesOpen, setIsDemoInquiriesOpen] = useState(false);
  const [inquiriesList, setInquiriesList] = useState<InquiryFormData[]>([]);
  const [prefilledInquiryVehicle, setPrefilledInquiryVehicle] = useState<string>('2012 BMW 535i');

  // Filter State
  const [filter, setFilter] = useState<VehicleFilter>({
    searchQuery: '',
    year: 'all',
    titleStatus: 'all',
    bodyStyle: 'all',
    sortBy: 'year-desc',
  });

  // Available filter options derived from inventory
  const availableYears = useMemo(() => {
    const years = Array.from(new Set(inventory.map((v) => v.year)));
    return years.sort((a, b) => b - a);
  }, [inventory]);

  const bodyStyles = useMemo(() => {
    return Array.from(new Set(inventory.map((v) => v.bodyStyle)));
  }, [inventory]);

  // Filtered & Sorted Inventory
  const filteredVehicles = useMemo(() => {
    let result = [...inventory];

    // Search query
    if (filter.searchQuery.trim()) {
      const q = filter.searchQuery.toLowerCase().trim();
      result = result.filter(
        (v) =>
          v.make.toLowerCase().includes(q) ||
          v.model.toLowerCase().includes(q) ||
          v.trim?.toLowerCase().includes(q) ||
          v.description.toLowerCase().includes(q) ||
          v.engine.toLowerCase().includes(q) ||
          v.year.toString().includes(q)
      );
    }

    // Year filter
    if (filter.year !== 'all') {
      result = result.filter((v) => v.year.toString() === filter.year);
    }

    // Title status filter
    if (filter.titleStatus !== 'all') {
      result = result.filter((v) => v.titleStatus === filter.titleStatus);
    }

    // Body style filter
    if (filter.bodyStyle !== 'all') {
      result = result.filter((v) => v.bodyStyle === filter.bodyStyle);
    }

    // Sort
    result.sort((a, b) => {
      if (filter.sortBy === 'year-desc') return b.year - a.year;
      if (filter.sortBy === 'year-asc') return a.year - b.year;
      if (filter.sortBy === 'make-asc') return a.make.localeCompare(b.make);
      return 0;
    });

    return result;
  }, [inventory, filter]);

  // Handlers
  const handleResetFilters = () => {
    setFilter({
      searchQuery: '',
      year: 'all',
      titleStatus: 'all',
      bodyStyle: 'all',
      sortBy: 'year-desc',
    });
  };

  const handleInquireFromCard = (vehicle: Vehicle) => {
    setSelectedVehicleForInquiry(vehicle);
    setIsQuickInquiryOpen(true);
  };

  const handleOpenGeneralInquiry = (vehicleName?: string) => {
    if (vehicleName) {
      setPrefilledInquiryVehicle(vehicleName);
    }
    const contactElem = document.getElementById('contact');
    if (contactElem) {
      contactElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleNavigateToInventory = () => {
    const el = document.getElementById('inventory');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleNavigate = (targetId: string) => {
    const el = document.querySelector(targetId);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleInquirySubmitted = (data: InquiryFormData) => {
    setInquiriesList((prev) => [data, ...prev]);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF9F6] text-[#121417]">
      {/* 3-Zone Top Navigation */}
      <Navbar
        onOpenInquiry={handleOpenGeneralInquiry}
        onNavigateToInventory={handleNavigateToInventory}
      />

      <main className="flex-1">
        {/* Cinematic Hero */}
        <Hero
          onExploreInventory={handleNavigateToInventory}
          onAskAboutVehicle={() => handleOpenGeneralInquiry()}
        />

        {/* Featured Vehicle Inventory Section */}
        <section id="inventory" className="py-20 lg:py-24 border-b border-[#E6E2D8]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            {/* Demonstration Inventory Notice Banner */}
            <div className="mb-10 p-4 sm:p-5 bg-white border border-[#E6E2D8] rounded-lg shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-start gap-3">
                <Info className="w-5 h-5 text-[#C5221F] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#121417]">
                    Demonstration Inventory Showcase
                  </h4>
                  <p className="text-xs text-[#4B5260] mt-0.5 leading-relaxed">
                    Initial vehicle entries are compiled directly from public details on Instagram (
                    <strong className="text-[#121417]">@isale.autos</strong>). Please confirm current availability and full specs with the seller.
                  </p>
                </div>
              </div>
              <a
                href={DEALERSHIP_CONFIG.instagram.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#121417] hover:text-[#C5221F] transition-colors whitespace-nowrap self-start sm:self-auto shrink-0"
              >
                <Instagram className="w-3.5 h-3.5 text-[#C5221F]" />
                <span>View Instagram Feed</span>
                <ArrowUpRight className="w-3 h-3 text-[#4B5260]" />
              </a>
            </div>

            {/* Inventory Section Header */}
            <div className="max-w-2xl mb-8">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#4B5260] mb-2">
                <span>Current Listings</span>
              </div>
              <h2 className="font-display font-bold text-3xl sm:text-4xl text-[#121417] tracking-tight">
                Featured Vehicles
              </h2>
              <p className="mt-2 text-sm sm:text-base text-[#4B5260]">
                Explore our current pre-owned selection. Each car includes stated title condition,
                known powertrain specifications, and direct access to the seller.
              </p>
            </div>

            {/* Interactive Filters Bar */}
            <InventoryFilter
              filter={filter}
              onFilterChange={setFilter}
              onReset={handleResetFilters}
              totalCount={inventory.length}
              filteredCount={filteredVehicles.length}
              availableYears={availableYears}
              bodyStyles={bodyStyles}
            />

            {/* Vehicles Showcase Grid */}
            {filteredVehicles.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 lg:gap-10">
                {filteredVehicles.map((vehicle) => (
                  <VehicleCard
                    key={vehicle.id}
                    vehicle={vehicle}
                    onSelect={(v) => setSelectedVehicleForDetail(v)}
                    onInquire={(v) => handleInquireFromCard(v)}
                  />
                ))}
              </div>
            ) : (
              /* Empty Search Results State */
              <div className="text-center py-16 px-4 bg-white border border-[#E6E2D8] rounded-xl space-y-4">
                <div className="w-14 h-14 rounded-full bg-[#FAF9F6] border border-[#E6E2D8] flex items-center justify-center mx-auto text-[#4B5260]">
                  <SearchX className="w-6 h-6 text-[#C5221F]" />
                </div>
                <h3 className="font-display font-bold text-xl text-[#121417]">
                  No Vehicles Match Your Search
                </h3>
                <p className="text-sm text-[#4B5260] max-w-md mx-auto">
                  We couldn't find any vehicles matching "{filter.searchQuery}". Try adjusting your keywords or clearing active filters.
                </p>
                <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                  <button
                    type="button"
                    onClick={handleResetFilters}
                    className="px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-white bg-[#121417] hover:bg-[#C5221F] rounded transition-colors"
                  >
                    Clear All Filters
                  </button>
                  <button
                    type="button"
                    onClick={() => handleOpenGeneralInquiry('Request Specific Model')}
                    className="px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-[#121417] bg-[#FAF9F6] hover:bg-[#F3F1EB] border border-[#D1D5DB] rounded transition-colors"
                  >
                    Request a Specific Model
                  </button>
                </div>
              </div>
            )}

          </div>
        </section>

        {/* Why Choose I SALE AUTOS Section */}
        <WhyChooseUs />

        {/* About the Business Section */}
        <AboutSection />

        {/* Vehicle Inquiry & Direct Contact Section */}
        <InquirySection
          selectedVehicleTitle={prefilledInquiryVehicle}
          onInquirySubmitted={handleInquirySubmitted}
        />
      </main>

      {/* Footer */}
      <Footer
        onNavigate={handleNavigate}
        onOpenInquiry={() => handleOpenGeneralInquiry()}
      />

      {/* Vehicle Detail Modal with Gallery & Full Specs */}
      <VehicleDetailModal
        vehicle={selectedVehicleForDetail}
        onClose={() => setSelectedVehicleForDetail(null)}
        onInquire={(v) => {
          setSelectedVehicleForDetail(null);
          handleInquireFromCard(v);
        }}
      />

      {/* Quick Inquiry Modal */}
      <QuickInquiryModal
        vehicle={selectedVehicleForInquiry}
        isOpen={isQuickInquiryOpen}
        onClose={() => setIsQuickInquiryOpen(false)}
        onSubmit={handleInquirySubmitted}
      />

      {/* Client Demo Inquiries Viewer Modal */}
      <InquiriesPreviewModal
        inquiries={inquiriesList}
        isOpen={isDemoInquiriesOpen}
        onClose={() => setIsDemoInquiriesOpen(false)}
        onClear={() => setInquiriesList([])}
      />

      {/* Floating Demo Lead Tracker Badge (Subtle helper for reviewing inquiries) */}
      <div className="fixed bottom-4 right-4 z-30">
        <button
          type="button"
          onClick={() => setIsDemoInquiriesOpen(true)}
          className="inline-flex items-center gap-2 px-3.5 py-2 bg-[#121417]/90 hover:bg-[#121417] text-white text-xs font-medium rounded-full shadow-lg border border-white/10 backdrop-blur-sm transition-all hover:scale-105 cursor-pointer"
          title="Review captured customer inquiries in this demo session"
        >
          <Mail className="w-3.5 h-3.5 text-[#C5221F]" />
          <span>Demo Inquiries</span>
          {inquiriesList.length > 0 && (
            <span className="w-4 h-4 rounded-full bg-[#C5221F] text-white text-[10px] font-bold flex items-center justify-center">
              {inquiriesList.length}
            </span>
          )}
        </button>
      </div>
    </div>
  );
}
