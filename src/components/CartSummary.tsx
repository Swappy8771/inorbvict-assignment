import React from 'react';
import { ShoppingCart, X, Plus, Minus, Trash2 } from 'lucide-react';
import type { CartItem } from '../types';

interface CartSummaryProps {
  cart: CartItem[];
  isOpen: boolean;
  onToggle: () => void;
  onUpdateQuantity: (id: number, change: number) => void;
  onRemoveItem: (id: number) => void;
}


export const CartSummary: React.FC<CartSummaryProps> = ({ 
  cart, 
  isOpen, 
  onToggle, 
  onUpdateQuantity, 
  onRemoveItem 
}) => {
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const savings = totalPrice * 0.1; // 10% discount simulation

  return (
    <>
      {/* Floating Cart Button */}
      <button
        onClick={onToggle}
        className="fixed top-6 right-6 p-5 bg-gradient-to-br from-blue-600 to-purple-600 text-white rounded-2xl shadow-2xl hover:shadow-blue-500/50 transition-all duration-300 hover:scale-110 z-30 group"
        aria-label="Open shopping cart"
      >
        <ShoppingCart size={24} className="group-hover:scale-110 transition-transform" />
        {totalItems > 0 && (
          <span className="absolute -top-2 -right-2 bg-gradient-to-br from-red-500 to-pink-500 text-white text-xs font-black rounded-full h-8 w-8 flex items-center justify-center shadow-lg animate-bounce">
            {totalItems}
          </span>
        )}
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 animate-in fade-in duration-300"
            onClick={onToggle}
          />

          {/* Cart Panel */}
          <div className="fixed top-0 right-0 h-full w-[450px] max-w-full bg-white shadow-2xl z-50 flex flex-col animate-in slide-in-from-right duration-500">
            {/* Header */}
            <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-blue-50 to-purple-50">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-2xl font-black bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Shopping Cart
                </h2>
                <button
                  onClick={onToggle}
                  className="p-3 hover:bg-white rounded-xl transition-all hover:rotate-90 duration-300"
                  aria-label="Close cart"
                >
                  <X size={24} className="text-gray-600" />
                </button>
              </div>
              <p className="text-sm text-gray-600 font-medium">
                {totalItems} {totalItems === 1 ? 'item' : 'items'} in your cart
              </p>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {cart.length === 0 ? (
                <div className="text-center py-20">
                  <div className="inline-block p-6 bg-gradient-to-br from-gray-100 to-gray-200 rounded-3xl mb-4">
                    <ShoppingCart size={64} className="text-gray-400" />
                  </div>
                  <p className="text-gray-500 font-medium text-lg">Your cart is empty</p>
                  <p className="text-gray-400 text-sm mt-2">Add some products to get started!</p>
                </div>
              ) : (
                // Cart Items
                cart.map((item) => (
                  <div
                    key={item.id}
                    className="group relative bg-gradient-to-br from-gray-50 to-white p-4 rounded-2xl border border-gray-100 hover:border-blue-200 hover:shadow-xl transition-all duration-300"
                  >
                    <div className="flex gap-4">
                      {/* Product Image */}
                      <div className="relative w-24 h-24 bg-white rounded-xl p-2 flex-shrink-0 border border-gray-100">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-contain"
                        />
                      </div>

                      {/* Product Details */}
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-gray-800 line-clamp-2 mb-2 group-hover:text-blue-600 transition-colors">
                          {item.title}
                        </h3>
                        <div className="text-xl font-black bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-3">
                          ${(item.price * item.quantity).toFixed(2)}
                        </div>

                        <div className="flex items-center gap-3">
                          <div className="flex items-center gap-2 bg-white rounded-xl border-2 border-gray-200 p-1">
                            <button
                              onClick={() => onUpdateQuantity(item.id, -1)}
                              className="p-2 hover:bg-blue-50 rounded-lg transition-colors active:scale-90"
                              aria-label="Decrease quantity"
                            >
                              <Minus size={18} className="text-blue-600" />
                            </button>
                            <span className="w-8 text-center font-bold text-gray-800">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => onUpdateQuantity(item.id, 1)}
                              className="p-2 hover:bg-blue-50 rounded-lg transition-colors active:scale-90"
                              aria-label="Increase quantity"
                            >
                              <Plus size={18} className="text-blue-600" />
                            </button>
                          </div>

                          {/* Remove Button */}
                          <button
                            onClick={() => onRemoveItem(item.id)}
                            className="p-3 hover:bg-red-50 rounded-xl transition-colors group/del"
                            aria-label="Remove item"
                          >
                            <Trash2 size={20} className="text-gray-400 group-hover/del:text-red-500 transition-colors" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {cart.length > 0 && (
              <div className="p-6 border-t border-gray-100 bg-gradient-to-br from-gray-50 to-white space-y-4">
                {/* Subtotal */}
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-semibold text-gray-800">${totalPrice.toFixed(2)}</span>
                </div>

                {/* Savings */}
                <div className="flex justify-between items-center text-sm">
                  <span className="text-green-600 font-medium">Savings (10%)</span>
                  <span className="font-semibold text-green-600">-${savings.toFixed(2)}</span>
                </div>
                
                <div className="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
                
                {/* Total */}
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold text-gray-800">Total</span>
                  <span className="text-3xl font-black bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    ${(totalPrice - savings).toFixed(2)}
                  </span>
                </div>

                {/* Checkout Button */}
                <button className="w-full px-6 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl font-bold text-lg hover:shadow-2xl hover:shadow-blue-500/50 transition-all duration-300 hover:scale-105 active:scale-95">
                  Proceed to Checkout
                </button>
                
                <button 
                  onClick={onToggle}
                  className="w-full px-4 py-3 text-gray-600 font-semibold hover:text-gray-800 transition-colors rounded-lg hover:bg-gray-50"
                >
                  Continue Shopping
                </button>
              </div>
            )}
          </div>
        </>
      )}
    </>
  );
};