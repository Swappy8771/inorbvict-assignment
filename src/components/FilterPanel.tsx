import React from 'react';
import { Filter, X } from 'lucide-react';
import type { Filters } from '../types';

interface FilterPanelProps {
  categories: string[];
  filters: Filters;
  onFilterChange: (filterType: string, value: string | number | null) => void;
  isMobileOpen: boolean;
  onClose: () => void;
}

/**
 * FilterPanel Component - Modern styled filter sidebar
 * Features: Gradient styling, animated slider, smooth transitions
 */
export const FilterPanel: React.FC<FilterPanelProps> = ({ 
  categories, 
  filters, 
  onFilterChange, 
  isMobileOpen, 
  onClose 
}) => {
  return (
    <>
      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden animate-in fade-in duration-300"
          onClick={onClose}
        />
      )}

      {/* Filter Panel */}
      <div
        className={`fixed lg:sticky top-0 left-0 h-full lg:h-auto bg-white p-6 rounded-2xl shadow-2xl z-50 transform transition-all duration-500 ease-out lg:transform-none ${
          isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        } w-80 lg:w-full overflow-y-auto`}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-black bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent flex items-center gap-3">
            <div className="p-3 bg-gradient-to-br from-blue-100 to-purple-100 rounded-xl">
              <Filter size={24} className="text-blue-600" />
            </div>
            Filters
          </h2>
          <button 
            onClick={onClose} 
            className="lg:hidden p-3 hover:bg-gray-100 rounded-xl transition-colors"
            aria-label="Close filters"
          >
            <X size={24} className="text-gray-600" />
          </button>
        </div>

        {/* Category Filter */}
        <div className="mb-8">
          <label className="block text-sm font-bold text-gray-700 mb-3 uppercase tracking-wide">
            Category
          </label>
          <select
            value={filters.category}
            onChange={(e) => onFilterChange('category', e.target.value)}
            className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all font-medium bg-gray-50 hover:bg-white cursor-pointer"
          >
            <option value="">All Categories</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </option>
            ))}
          </select>
        </div>

        {/* Price Filter */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-3">
            <label className="text-sm font-bold text-gray-700 uppercase tracking-wide">
              Price Range
            </label>
            <span className="px-3 py-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm font-bold rounded-full">
              ${filters.maxPrice}
            </span>
          </div>
          <input
            type="range"
            min="0"
            max="1000"
            step="10"
            value={filters.maxPrice}
            onChange={(e) => onFilterChange('maxPrice', parseInt(e.target.value))}
            className="w-full h-3 bg-gradient-to-r from-blue-200 to-purple-200 rounded-full appearance-none cursor-pointer"
            style={{
              background: `linear-gradient(to right, rgb(59 130 246) 0%, rgb(147 51 234) ${(filters.maxPrice / 1000) * 100}%, rgb(229 231 235) ${(filters.maxPrice / 1000) * 100}%, rgb(229 231 235) 100%)`
            }}
          />
          <div className="flex justify-between text-xs font-semibold text-gray-500 mt-3">
            <span>$0</span>
            <span>$1000</span>
          </div>
        </div>

        {/* Reset Button */}
        <button
          onClick={() => onFilterChange('reset', null)}
          className="w-full px-5 py-4 bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 rounded-xl font-bold hover:from-gray-200 hover:to-gray-300 transition-all hover:shadow-lg active:scale-95"
        >
          Reset All Filters
        </button>
      </div>
    </>
  );
};