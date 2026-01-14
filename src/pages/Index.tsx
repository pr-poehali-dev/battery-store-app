import { useState, useEffect } from 'react';
import AuthScreen from '@/components/sections/AuthScreen';
import LoadingScreen from '@/components/LoadingScreen';
import ParallaxBackground from '@/components/ParallaxBackground';
import AppHeader from '@/components/layout/AppHeader';
import SideMenu from '@/components/layout/SideMenu';
import BottomNavigation from '@/components/layout/BottomNavigation';
import MainContent from '@/components/layout/MainContent';
import { useAuth } from '@/hooks/useAuth';
import { useCart } from '@/hooks/useCart';
import { usePWA } from '@/hooks/usePWA';
import { useTheme } from '@/hooks/useTheme';
import { brands, stores, serviceCenter } from '@/data/products';

const Index = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { user, isLoading, handleLogout, handlePhoneAuth, vibrate } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const cart = useCart(vibrate);
  const { showInstallPrompt, setShowInstallPrompt, handleInstallApp } = usePWA();

  const userPurchaseCount = user ? (user.purchaseCount || 0) : 0;

  useEffect(() => {
    const handleBrandFilter = (event: CustomEvent) => {
      const brand = event.detail;
      cart.setSelectedBrand(brand);
      cart.resetFilters();
      setTimeout(() => cart.setSelectedBrand(brand), 0);
    };

    window.addEventListener('filterByBrand', handleBrandFilter as EventListener);
    return () => window.removeEventListener('filterByBrand', handleBrandFilter as EventListener);
  }, [cart]);

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (!user) {
    return <AuthScreen handlePhoneAuth={handlePhoneAuth} />;
  }

  return (
    <div className="min-h-screen bg-background pb-20 relative overflow-hidden">
      <AppHeader
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        theme={theme}
        toggleTheme={toggleTheme}
        cartItemsCount={cart.cartItemsCount}
        setActiveSection={setActiveSection}
      />

      <MainContent
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        showInstallPrompt={showInstallPrompt}
        setShowInstallPrompt={setShowInstallPrompt}
        handleInstallApp={handleInstallApp}
        userPurchaseCount={userPurchaseCount}
        brands={brands}
        stores={stores}
        serviceCenter={serviceCenter}
        vibrate={vibrate}
        user={user}
        handleLogout={handleLogout}
        cart={cart}
      />

      <BottomNavigation
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        cartItemsCount={cart.cartItemsCount}
      />

      <SideMenu
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        favoritesCount={cart.favorites.length}
      />

      <ParallaxBackground />
    </div>
  );
};

export default Index;
