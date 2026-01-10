import { useState } from 'react';
import { Product, CartItem } from '@/types';
import { products } from '@/data/products';

export const useCart = (vibrate: (pattern: number | number[]) => void) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [priceRange, setPriceRange] = useState([0, 50000]);
  const [selectedCar, setSelectedCar] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedStore, setSelectedStore] = useState('');
  const [sortBy, setSortBy] = useState('default');

  const allCars = Array.from(new Set(products.flatMap(p => p.compatible))).sort();
  const categories = Array.from(new Set(products.map(p => p.category))).sort();

  const filteredProducts = products
    .filter(product => {
      const matchesSearch = 
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.brand.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
      
      const matchesCar = !selectedCar || 
        selectedCar === 'all' || 
        product.compatible.includes(selectedCar) ||
        product.compatible.includes('Универсальное');
      
      const matchesCategory = !selectedCategory || product.category === selectedCategory;
      
      return matchesSearch && matchesPrice && matchesCar && matchesCategory;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'price-asc':
          return a.price - b.price;
        case 'price-desc':
          return b.price - a.price;
        case 'name-asc':
          return a.name.localeCompare(b.name);
        case 'name-desc':
          return b.name.localeCompare(a.name);
        case 'capacity':
          const capacityA = parseInt(a.capacity);
          const capacityB = parseInt(b.capacity);
          return capacityB - capacityA;
        default:
          return 0;
      }
    });

  const resetFilters = () => {
    setSearchQuery('');
    setPriceRange([0, 50000]);
    setSelectedCar('');
    setSelectedCategory('');
    setSortBy('default');
  };

  const getCategoryBadge = (category: string) => {
    const badges: Record<string, { icon: string; color: string; label: string }> = {
      'Азиатские': { icon: '🌏', color: 'bg-blue-500/10 text-blue-600 border-blue-500/20', label: 'Азия' },
      'Азиатские премиум': { icon: '⭐', color: 'bg-purple-500/10 text-purple-600 border-purple-500/20', label: 'Премиум' },
      'Европейские': { icon: '🇪🇺', color: 'bg-green-500/10 text-green-600 border-green-500/20', label: 'Европа' },
      'Российские': { icon: '🇷🇺', color: 'bg-red-500/10 text-red-600 border-red-500/20', label: 'Россия' },
      'AGM': { icon: '⚡', color: 'bg-yellow-500/10 text-yellow-600 border-yellow-500/20', label: 'AGM' },
      'EFB': { icon: '🔌', color: 'bg-orange-500/10 text-orange-600 border-orange-500/20', label: 'EFB' },
      'Грузовые': { icon: '🚛', color: 'bg-gray-500/10 text-gray-600 border-gray-500/20', label: 'Грузовые' },
      'Пусковые устройства': { icon: '🔧', color: 'bg-cyan-500/10 text-cyan-600 border-cyan-500/20', label: 'Пусковое' },
      'Зарядные устройства': { icon: '🔋', color: 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20', label: 'Зарядное' }
    };
    return badges[category] || { icon: '🔋', color: 'bg-gray-500/10 text-gray-600 border-gray-500/20', label: category };
  };

  const addToCart = (product: Product) => {
    vibrate(50);
    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: number) => {
    vibrate([30, 50]);
    setCart(prev => prev.filter(item => item.product.id !== productId));
  };

  const updateQuantity = (productId: number, quantity: number) => {
    vibrate(30);
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart(prev => prev.map(item =>
      item.product.id === productId
        ? { ...item, quantity }
        : item
    ));
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const cartCashback = Math.floor(cartTotal * 0.03);
  const cartItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return {
    cart,
    searchQuery,
    priceRange,
    selectedCar,
    selectedCategory,
    selectedStore,
    sortBy,
    allCars,
    categories,
    filteredProducts,
    cartTotal,
    cartCashback,
    cartItemsCount,
    setSearchQuery,
    setPriceRange,
    setSelectedCar,
    setSelectedCategory,
    setSelectedStore,
    setSortBy,
    resetFilters,
    getCategoryBadge,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart
  };
};