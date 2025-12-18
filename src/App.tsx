import React, { useState, useEffect, useMemo } from 'react';
import { Filter, ShoppingCart } from 'lucide-react';
import { ProductCard } from './components/ProductCard';
import { FilterPanel } from './components/FilterPanel';
import { CartSummary } from './components/CartSummary';
import type { Product, CartItem, Filters } from './types';

const App: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [filters, setFilters] = useState<Filters>({ category: '', maxPrice: 1000 });
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const filteredProducts = useMemo(() => {
    let filtered = products;
    if (filters.category) {
      filtered = filtered.filter((p) => p.category === filters.category);
    }
    return filtered.filter((p) => p.price <= filters.maxPrice);
  }, [filters, products]);

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then((res) => res.json())
      .then((data: Product[]) => {
        setProducts(data);
        setCategories([...new Set(data.map((p) => p.category))]);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching products:', error);
        setLoading(false);
      });
  }, []);

  const handleFilterChange = (filterType: string, value: string | number | null) => {
    if (filterType === 'reset') {
      setFilters({ category: '', maxPrice: 1000 });
    } else {
      setFilters((prev) => ({ ...prev, [filterType]: value }));
    }
  };

  const handleAddToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const handleUpdateQuantity = (id: number, change: number) => {
    setCart((prev) => {
      const updated = prev.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(0, item.quantity + change) } : item
      );
      return updated.filter((item) => item.quantity > 0);
    });
  };

  const handleRemoveItem = (id: number) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
        <div className="text-center">
          <div className="inline-block p-4 bg-white rounded-2xl shadow-2xl mb-4 animate-bounce">
            <ShoppingCart size={48} className="text-blue-600" />
          </div>
          <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Loading amazing products...
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* Header */}
      <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-xl border-b border-gray-100 shadow-lg">
        <div className="container mx-auto px-4 sm:px-6 py-5 flex items-center justify-between">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-black bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            ShopHub
          </h1>
          <button
            onClick={() => setIsFilterOpen(true)}
            className="lg:hidden flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-bold shadow-lg hover:shadow-xl transition-all text-sm"
          >
            <Filter size={20} />
            Filters
          </button>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-10">
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
          {/* Desktop Filter Sidebar - Only shown on large screens */}
          <aside className="hidden lg:block w-72 flex-shrink-0">
            <div className="sticky top-24">
              <FilterPanel
                categories={categories}
                filters={filters}
                onFilterChange={handleFilterChange}
                isMobileOpen={false}
                onClose={() => {}}
              />
            </div>
          </aside>

          {isFilterOpen && (
            <FilterPanel
              categories={categories}
              filters={filters}
              onFilterChange={handleFilterChange}
              isMobileOpen={isFilterOpen}
              onClose={() => setIsFilterOpen(false)}
            />
          )}

          <main className="flex-1 min-w-0">
            <div className="mb-6 sm:mb-8">
              <h2 className="text-2xl sm:text-3xl font-black text-gray-800 mb-2">
                Discover Products
              </h2>
              <p className="text-sm sm:text-base text-gray-600 font-medium">
                {filteredProducts.length} amazing {filteredProducts.length === 1 ? 'product' : 'products'} available
              </p>
            </div>

            {filteredProducts.length === 0 ? (
              <div className="text-center py-20 sm:py-32">
                <div className="inline-block p-6 sm:p-8 bg-white rounded-3xl shadow-xl mb-6">
                  <Filter size={48} className="text-gray-300 sm:w-16 sm:h-16" />
                </div>
                <p className="text-gray-500 text-lg sm:text-xl font-semibold mb-4">No products match your filters</p>
                <button
                  onClick={() => handleFilterChange('reset', null)}
                  className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-bold hover:shadow-xl transition-all text-lg"
                >
                  Reset Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} onAddToCart={handleAddToCart} />
                ))}
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Shopping Cart */}
      <CartSummary
        cart={cart}
        isOpen={isCartOpen}
        onToggle={() => setIsCartOpen(!isCartOpen)}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
      />
    </div>
  );
};

export default App;