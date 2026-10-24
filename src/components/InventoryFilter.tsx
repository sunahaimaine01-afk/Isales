import React from 'react';
import { Search, RotateCcw, SlidersHorizontal } from 'lucide-react';
import { VehicleFilter } from '../types/inventory';

interface InventoryFilterProps {
  filter: VehicleFilter;
  onFilterChange: (newFilter: VehicleFilter) => void;
  onReset: () => void;
  totalCount: number;
  filteredCount: number;
  availableYears: number[];
  bodyStyles: string[];
}

export const InventoryFilter: React.FC<InventoryFilterProps> = ({
  filter,
  onFilterChange,
  onReset,
  totalCount,
  filteredCount,
  availableYears,
  bodyStyles,
}) => {
  const isFiltered =
    filter.searchQuery.trim() !== '' ||
    filter.year !== 'all' ||
    filter.titleStatus !== 'all' ||
    filter.bodyStyle !== 'all' ||
    filter.sortBy !== 'year-desc';

  return (
    <div className="bg-white border border-[#E6E2D8] rounded-lg p-4 sm:p-6 mb-8 shadow-xs">
      {/* Top Bar of Filter: Title & Results Count */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#F3F1EB]">
        <div className="flex items-center gap-3">
          <SlidersHorizontal className="w-4 h-4 text-[#C5221F]" />
          <h2 className="text-base font-semibold text-[#121417]">
            Filter Inventory
          </h2>
          <span className="text-xs text-[#4B5260] font-mono tabular-nums">
            Showing {filteredCount} of {totalCount} vehicles
          </span>
        </div>

        {isFiltered && (
          <button
            type="button"
            onClick={onReset}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#C5221F] hover:text-[#A91916] transition-colors self-start sm:self-auto cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Filters</span>
          </button>
        )}
      </div>

      {/* Filter Controls Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5 mt-4">
        
        {/* Search Input */}
        <div className="lg:col-span-2 relative">
          <label htmlFor="vehicle-search" className="sr-only">
            Search make or model
          </label>
          <div className="relative">
            <Search className="w-4 h-4 text-[#9CA3AF] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              id="vehicle-search"
              type="text"
              value={filter.searchQuery}
              onChange={(e) =>
                onFilterChange({ ...filter, searchQuery: e.target.value })
              }
              placeholder="Search make or model (e.g. BMW, Kia)..."
              className="w-full pl-10 pr-3.5 py-2.5 text-xs text-[#121417] bg-[#FAF9F6] border border-[#D1D5DB] rounded focus:outline-none focus:border-[#C5221F] focus:ring-1 focus:ring-[#C5221F] placeholder:text-[#9CA3AF] transition-colors"
            />
          </div>
        </div>

        {/* Year Filter */}
        <div>
          <label htmlFor="filter-year" className="sr-only">
            Year
          </label>
          <select
            id="filter-year"
            value={filter.year}
            onChange={(e) => onFilterChange({ ...filter, year: e.target.value })}
            className="w-full py-2.5 px-3 text-xs text-[#121417] bg-[#FAF9F6] border border-[#D1D5DB] rounded focus:outline-none focus:border-[#C5221F] cursor-pointer"
          >
            <option value="all">All Years</option>
            {availableYears.map((yr) => (
              <option key={yr} value={yr.toString()}>
                {yr}
              </option>
            ))}
          </select>
        </div>

        {/* Body Style Filter */}
        <div>
          <label htmlFor="filter-style" className="sr-only">
            Body Style
          </label>
          <select
            id="filter-style"
            value={filter.bodyStyle}
            onChange={(e) =>
              onFilterChange({ ...filter, bodyStyle: e.target.value })
            }
            className="w-full py-2.5 px-3 text-xs text-[#121417] bg-[#FAF9F6] border border-[#D1D5DB] rounded focus:outline-none focus:border-[#C5221F] cursor-pointer"
          >
            <option value="all">All Body Styles</option>
            {bodyStyles.map((style) => (
              <option key={style} value={style}>
                {style}
              </option>
            ))}
          </select>
        </div>

        {/* Sort Dropdown */}
        <div>
          <label htmlFor="sort-by" className="sr-only">
            Sort Order
          </label>
          <select
            id="sort-by"
            value={filter.sortBy}
            onChange={(e) =>
              onFilterChange({
                ...filter,
                sortBy: e.target.value as VehicleFilter['sortBy'],
              })
            }
            className="w-full py-2.5 px-3 text-xs text-[#121417] bg-[#FAF9F6] border border-[#D1D5DB] rounded focus:outline-none focus:border-[#C5221F] cursor-pointer"
          >
            <option value="year-desc">Sort: Newest Model Year</option>
            <option value="year-asc">Sort: Oldest Model Year</option>
            <option value="make-asc">Sort: Make (A-Z)</option>
          </select>
        </div>

      </div>
    </div>
  );
};
