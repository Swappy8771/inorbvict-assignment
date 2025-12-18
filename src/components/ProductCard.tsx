import React, { useState } from 'react';
import { ShoppingCart, Heart, Star } from 'lucide-react';
import type { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  const [isAdding, setIsAdding] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleAddToCart = () => {
    setIsAdding(true);
    onAddToCart(product);
    setTimeout(() => setIsAdding(false), 800);
  };

  return (
    <div 
      className="group relative bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-blue-200 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 flex flex-col h-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container */}
      <div className="relative h-56 sm:h-64 bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden flex-shrink-0">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-full object-contain p-4 sm:p-6 transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />
        
        {/* Wishlist Button */}
        <button 
          className="absolute top-4 right-4 p-2.5 bg-white/90 backdrop-blur-sm rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-red-50 hover:scale-110"
          aria-label="Add to wishlist"
        >
          <Heart size={18} className="text-gray-600 hover:text-red-500" />
        </button>

        {/* Category Badge */}
        <div className="absolute top-4 left-4">
          <span className="px-3.5 py-1.5 bg-blue-600/90 backdrop-blur-sm text-white text-xs font-semibold rounded-full shadow-lg capitalize">
            {product.category}
          </span>
        </div>

        {/* Quick View Overlay */}
        <div className={`absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
          <div className="absolute bottom-3 left-3 right-3">
            <p className="text-white text-xs sm:text-sm line-clamp-2 font-medium">
              {product.description}
            </p>
          </div>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-4 sm:p-5 flex flex-col flex-1">
        {/* Rating */}
        <div className="flex items-center gap-2 mb-2">
          <div className="flex items-center gap-1">
            <Star size={14} className="fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-semibold text-gray-700">{product.rating.rate}</span>
          </div>
          <span className="text-xs text-gray-400">({product.rating.count})</span>
        </div>

        {/* Title */}
        <h3 className="text-base sm:text-lg font-bold text-gray-800 line-clamp-2 mb-3 min-h-[3rem] group-hover:text-blue-600 transition-colors">
          {product.title}
        </h3>

        {/* Price and Action */}
        <div className="flex items-center justify-between gap-3 mt-auto">
          <div className="text-2xl sm:text-3xl font-black bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            ${product.price.toFixed(2)}
          </div>
          
          <button
            onClick={handleAddToCart}
            disabled={isAdding}
            className={`relative px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl font-bold transition-all duration-300 overflow-hidden text-sm sm:text-base whitespace-nowrap ${
              isAdding
                ? 'bg-green-500 text-white scale-95'
                : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-xl hover:scale-105'
            }`}
          >
            <span className={`flex items-center gap-2 transition-transform duration-300 ${isAdding ? 'scale-0' : 'scale-100'}`}>
              <ShoppingCart size={20} />
              <span className="hidden sm:inline">Add to Cart</span>
            </span>
            <span className={`absolute inset-0 flex items-center justify-center transition-transform duration-300 ${isAdding ? 'scale-100' : 'scale-0'}`}>
              ✓ Added
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};