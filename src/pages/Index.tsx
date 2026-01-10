import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import AuthScreen from '@/components/sections/AuthScreen';
import HomeSection from '@/components/sections/HomeSection';
import CatalogSection from '@/components/sections/CatalogSection';
import CartSection from '@/components/sections/CartSection';
import ContactsSection from '@/components/sections/ContactsSection';
import ProfileSection from '@/components/sections/ProfileSection';
import AboutSection from '@/components/sections/AboutSection';
import StoresSection from '@/components/sections/StoresSection';
import PromotionsSection from '@/components/sections/PromotionsSection';
import WarrantySection from '@/components/sections/WarrantySection';
import LoadingScreen from '@/components/LoadingScreen';
import Favorites from '@/components/Favorites';
import ParallaxBackground from '@/components/ParallaxBackground';
import { useAuth } from '@/hooks/useAuth';
import { useCart } from '@/hooks/useCart';
import { usePWA } from '@/hooks/usePWA';
import { brands, stores, serviceCenter } from '@/data/products';

const Index = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 pb-20 relative overflow-hidden">
      <ParallaxBackground />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.05),transparent_50%),radial-gradient(circle_at_70%_80%,rgba(147,197,253,0.08),transparent_50%)] pointer-events-none" />
      <div className="absolute top-10 left-10 w-20 h-20 bg-blue-200/20 rounded-full blur-3xl animate-float pointer-events-none" />
      <div className="absolute bottom-20 right-10 w-32 h-32 bg-blue-300/15 rounded-full blur-3xl animate-float pointer-events-none" style={{ animationDelay: '1.5s' }} />
      
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-xl border-b border-blue-100 shadow-sm relative">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-transparent to-blue-500/5" />
        <div className="container mx-auto px-4 py-4 relative">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg shadow-blue-500/30">
                <Icon name="Battery" size={24} className="text-white" />
              </div>
              <div>
                <h1 className="text-lg md:text-xl font-bold bg-gradient-to-r from-blue-600 to-blue-500 bg-clip-text text-transparent">Мир Аккумуляторов</h1>
                <p className="text-xs text-blue-600/70">С 1998 года</p>
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

      <main className="container mx-auto px-4 py-6 space-y-6 relative z-10">
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

        {activeSection === 'stores' && (
          <StoresSection />
        )}

        {activeSection === 'promotions' && (
          <PromotionsSection />
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

        {activeSection === 'warranty' && (
          <WarrantySection />
        )}

        {activeSection === 'favorites' && (
          <Favorites setActiveSection={setActiveSection} />
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
              variant={activeSection === 'stores' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setActiveSection('stores')}
              className="flex flex-col h-auto py-2 px-2"
            >
              <Icon name="MapPin" size={18} />
              <span className="text-xs mt-1">Магазины</span>
            </Button>
            <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="flex flex-col h-auto py-2 px-2"
                >
                  <Icon name="Menu" size={18} />
                  <span className="text-xs mt-1">Ещё</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[280px] sm:w-[320px]">
                <SheetHeader className="mb-6">
                  <SheetTitle className="flex items-center gap-2">
                    <Icon name="Menu" size={24} className="text-primary" />
                    Меню
                  </SheetTitle>
                </SheetHeader>
                <div className="space-y-2">
                  <Button
                    variant={activeSection === 'favorites' ? 'default' : 'ghost'}
                    className="w-full justify-start text-base h-12"
                    onClick={() => {
                      setActiveSection('favorites');
                      setIsMenuOpen(false);
                    }}
                  >
                    <Icon name="Heart" size={20} className="mr-3" />
                    Избранное
                  </Button>
                  <div className="my-4 border-t border-border" />
                  <Button
                    variant={activeSection === 'promotions' ? 'default' : 'ghost'}
                    className="w-full justify-start text-base h-12"
                    onClick={() => {
                      setActiveSection('promotions');
                      setIsMenuOpen(false);
                    }}
                  >
                    <Icon name="Sparkles" size={20} className="mr-3" />
                    Акции
                  </Button>
                  <Button
                    variant={activeSection === 'warranty' ? 'default' : 'ghost'}
                    className="w-full justify-start text-base h-12"
                    onClick={() => {
                      setActiveSection('warranty');
                      setIsMenuOpen(false);
                    }}
                  >
                    <Icon name="ShieldCheck" size={20} className="mr-3" />
                    Проверка гарантии
                  </Button>
                  <Button
                    variant={activeSection === 'about' ? 'default' : 'ghost'}
                    className="w-full justify-start text-base h-12"
                    onClick={() => {
                      setActiveSection('about');
                      setIsMenuOpen(false);
                    }}
                  >
                    <Icon name="Info" size={20} className="mr-3" />
                    О нас
                  </Button>
                  <Button
                    variant={activeSection === 'contacts' ? 'default' : 'ghost'}
                    className="w-full justify-start text-base h-12"
                    onClick={() => {
                      setActiveSection('contacts');
                      setIsMenuOpen(false);
                    }}
                  >
                    <Icon name="Phone" size={20} className="mr-3" />
                    Контакты
                  </Button>
                  <div className="my-4 border-t border-border" />
                  <Button
                    variant={activeSection === 'profile' ? 'default' : 'ghost'}
                    className="w-full justify-start text-base h-12"
                    onClick={() => {
                      setActiveSection('profile');
                      setIsMenuOpen(false);
                    }}
                  >
                    <Icon name="User" size={20} className="mr-3" />
                    Профиль
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Index;