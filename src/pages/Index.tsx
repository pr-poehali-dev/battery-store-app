import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import AuthScreen from '@/components/sections/AuthScreen';
import HomeSection from '@/components/sections/HomeSection';
import CatalogSection from '@/components/sections/CatalogSection';
import CartSection from '@/components/sections/CartSection';
import ContactsSection from '@/components/sections/ContactsSection';
import ProfileSection from '@/components/sections/ProfileSection';
import AboutSection from '@/components/sections/AboutSection';
import AdminSection from '@/components/sections/AdminSection';
import LoadingScreen from '@/components/LoadingScreen';
import { useAuth } from '@/hooks/useAuth';
import { useCart } from '@/hooks/useCart';
import { usePWA } from '@/hooks/usePWA';
import { brands, stores, serviceCenter } from '@/data/products';

const Index = () => {
  const [activeSection, setActiveSection] = useState('home');

  const { user, isLoading, handleLogout, handleTelegramAuth, vibrate } = useAuth();
  
  const cart = useCart(vibrate);
  const { showInstallPrompt, setShowInstallPrompt, handleInstallApp } = usePWA();

  const userCashback = user ? user.cashback : 0;

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (!user) {
    return <AuthScreen handleTelegramAuth={handleTelegramAuth} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20 pb-20">
      <header className="sticky top-0 z-50 bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80 border-b border-border shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Icon name="Battery" size={24} className="text-primary" />
              </div>
              <div>
                <h1 className="text-lg md:text-xl font-bold text-primary">Мир Аккумуляторов</h1>
                <p className="text-xs text-muted-foreground">С 1998 года</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setActiveSection('cart')}
                className="relative"
              >
                <Icon name="ShoppingCart" size={18} />
                {cart.cartItemsCount > 0 && (
                  <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs">
                    {cart.cartItemsCount}
                  </Badge>
                )}
              </Button>
              <Badge variant="secondary" className="hidden md:flex items-center gap-1">
                <Icon name="Wallet" size={14} />
                {user.cashback} ₽
              </Badge>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 space-y-6">
        {showInstallPrompt && (
          <Card className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border-2 border-blue-500/20 animate-slide-up">
            <CardContent className="pt-4">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <Icon name="Download" size={24} className="text-blue-600" />
                  <div>
                    <p className="font-semibold">Установить приложение</p>
                    <p className="text-xs text-muted-foreground">Быстрый доступ с главного экрана</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" onClick={handleInstallApp}>
                    Установить
                  </Button>
                  <Button size="sm" variant="ghost" onClick={() => setShowInstallPrompt(false)}>
                    <Icon name="X" size={16} />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {activeSection === 'home' && (
          <HomeSection
            userCashback={userCashback}
            brands={brands}
            vibrate={vibrate}
            setActiveSection={setActiveSection}
          />
        )}

        {activeSection === 'catalog' && (
          <CatalogSection
            filteredProducts={cart.filteredProducts}
            searchQuery={cart.searchQuery}
            setSearchQuery={cart.setSearchQuery}
            priceRange={cart.priceRange}
            setPriceRange={cart.setPriceRange}
            selectedCategory={cart.selectedCategory}
            setSelectedCategory={cart.setSelectedCategory}
            selectedCar={cart.selectedCar}
            setSelectedCar={cart.setSelectedCar}
            categories={cart.categories}
            allCars={cart.allCars}
            resetFilters={cart.resetFilters}
            getCategoryBadge={cart.getCategoryBadge}
            addToCart={cart.addToCart}
          />
        )}

        {activeSection === 'cart' && (
          <CartSection
            cart={cart.cart}
            cartTotal={cart.cartTotal}
            cartCashback={cart.cartCashback}
            cartItemsCount={cart.cartItemsCount}
            selectedStore={cart.selectedStore}
            setSelectedStore={cart.setSelectedStore}
            stores={stores}
            removeFromCart={cart.removeFromCart}
            updateQuantity={cart.updateQuantity}
            setActiveSection={setActiveSection}
          />
        )}

        {activeSection === 'about' && (
          <AboutSection />
        )}

        {activeSection === 'contacts' && (
          <ContactsSection
            stores={stores}
            serviceCenter={serviceCenter}
          />
        )}

        {activeSection === 'profile' && (
          <ProfileSection
            user={user}
            handleLogout={handleLogout}
          />
        )}

        {activeSection === 'admin' && (
          <AdminSection />
        )}
      </main>

      <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border z-50">
        <div className="container mx-auto px-2">
          <div className="flex justify-around items-center h-16">
            <Button
              variant={activeSection === 'home' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setActiveSection('home')}
              className="flex flex-col h-auto py-2 px-2"
            >
              <Icon name="Home" size={18} />
              <span className="text-xs mt-1">Главная</span>
            </Button>
            <Button
              variant={activeSection === 'catalog' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setActiveSection('catalog')}
              className="flex flex-col h-auto py-2 px-2"
            >
              <Icon name="ShoppingBag" size={18} />
              <span className="text-xs mt-1">Каталог</span>
            </Button>
            <Button
              variant={activeSection === 'cart' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setActiveSection('cart')}
              className="flex flex-col h-auto py-2 px-2 relative"
            >
              <Icon name="ShoppingCart" size={18} />
              <span className="text-xs mt-1">Корзина</span>
              {cart.cartItemsCount > 0 && (
                <Badge className="absolute top-1 right-1 h-4 w-4 flex items-center justify-center p-0 text-xs">
                  {cart.cartItemsCount}
                </Badge>
              )}
            </Button>
            <Button
              variant={activeSection === 'about' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setActiveSection('about')}
              className="flex flex-col h-auto py-2 px-2"
            >
              <Icon name="Info" size={18} />
              <span className="text-xs mt-1">О нас</span>
            </Button>
            <Button
              variant={activeSection === 'admin' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setActiveSection('admin')}
              className="flex flex-col h-auto py-2 px-2"
            >
              <Icon name="ShieldCheck" size={18} />
              <span className="text-xs mt-1">Админ</span>
            </Button>
            <Button
              variant={activeSection === 'profile' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setActiveSection('profile')}
              className="flex flex-col h-auto py-2 px-2"
            >
              <Icon name="User" size={18} />
              <span className="text-xs mt-1">Профиль</span>
            </Button>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Index;