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
import QRScannerSection from '@/components/sections/QRScannerSection';
import BlogSection from '@/components/sections/BlogSection';
import ReservationSection from '@/components/sections/ReservationSection';
import LoadingScreen from '@/components/LoadingScreen';
import ParallaxBackground from '@/components/ParallaxBackground';
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

  const userCashback = user ? user.cashback : 0;

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (!user) {
    return <AuthScreen handlePhoneAuth={handlePhoneAuth} />;
  }

  return (
    <div className="min-h-screen bg-background pb-20 relative overflow-hidden">
      <header className="sticky top-0 z-50 bg-[#3D6B8C] shadow-lg relative">
        <div className="container mx-auto px-4 py-6 relative">
          <div className="flex items-center justify-between">
            <button 
              className={`text-white p-2 hover:bg-white/10 rounded transition-all duration-300 relative group ${
                isMenuOpen ? 'menu-burger-open' : ''
              }`}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <div className="space-y-1.5">
                <div className="w-8 h-0.5 bg-white menu-burger-line"></div>
                <div className="w-8 h-0.5 bg-white menu-burger-line"></div>
                <div className="w-8 h-0.5 bg-white menu-burger-line"></div>
              </div>
              <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                <span className="text-xs bg-white/20 backdrop-blur-sm px-2 py-1 rounded shadow-lg">
                  Больше разделов
                </span>
              </div>
            </button>
            <div className="flex items-center gap-3 flex-1 justify-center">
              <span className="text-4xl">🍃</span>
              <h1 className="text-2xl md:text-3xl font-bold text-white italic">Мир Аккумуляторов</h1>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleTheme}
                className="text-white hover:bg-white/10"
                title={theme === 'dark' ? 'Светлая тема' : 'Темная тема'}
              >
                <Icon name={theme === 'dark' ? 'Sun' : 'Moon'} size={22} />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setActiveSection('cart')}
                className="relative text-white hover:bg-white/10"
              >
                <Icon name="ShoppingCart" size={22} />
                {cart.cartItemsCount > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs bg-red-500">
                    {cart.cartItemsCount}
                  </Badge>
                )}
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 space-y-6 relative z-10 bg-white">
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
            capacityRange={cart.capacityRange}
            setCapacityRange={cart.setCapacityRange}
            currentRange={cart.currentRange}
            setCurrentRange={cart.setCurrentRange}
            selectedCategory={cart.selectedCategory}
            setSelectedCategory={cart.setSelectedCategory}
            selectedBrand={cart.selectedBrand}
            setSelectedBrand={cart.setSelectedBrand}
            selectedManufacturer={cart.selectedManufacturer}
            setSelectedManufacturer={cart.setSelectedManufacturer}
            selectedBodyTypeJIS={cart.selectedBodyTypeJIS}
            setSelectedBodyTypeJIS={cart.setSelectedBodyTypeJIS}
            selectedBodyTypeEN={cart.selectedBodyTypeEN}
            setSelectedBodyTypeEN={cart.setSelectedBodyTypeEN}
            selectedTechnology={cart.selectedTechnology}
            setSelectedTechnology={cart.setSelectedTechnology}
            selectedPolarity={cart.selectedPolarity}
            setSelectedPolarity={cart.setSelectedPolarity}
            selectedCar={cart.selectedCar}
            setSelectedCar={cart.setSelectedCar}
            sortBy={cart.sortBy}
            setSortBy={cart.setSortBy}
            categories={cart.categories}
            brands={cart.brands}
            manufacturers={cart.manufacturers}
            bodyTypesJIS={cart.bodyTypesJIS}
            bodyTypesEN={cart.bodyTypesEN}
            technologies={cart.technologies}
            polarities={cart.polarities}
            allCars={cart.allCars}
            resetFilters={cart.resetFilters}
            getCategoryBadge={cart.getCategoryBadge}
            addToCart={cart.addToCart}
            user={user}
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

        {activeSection === 'qr-scanner' && (
          <QRScannerSection setActiveSection={setActiveSection} />
        )}

        {activeSection === 'blog' && (
          <BlogSection />
        )}

        {activeSection === 'reservations' && (
          <ReservationSection user={user} />
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
            <Button
              variant={activeSection === 'contacts' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setActiveSection('contacts')}
              className="flex flex-col h-auto py-2 px-2"
            >
              <Icon name="Phone" size={18} />
              <span className="text-xs mt-1">Контакты</span>
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
            <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
              <SheetContent side="left" className="w-[280px] sm:w-[320px] bg-[#3D6B8C] text-white border-r-0 animate-slide-in-left">
                <SheetHeader className="mb-6">
                  <SheetTitle className="flex items-center gap-3 text-white">
                    <span className="text-3xl">🍃</span>
                    <span className="text-xl italic">Мир Аккумуляторов</span>
                  </SheetTitle>
                </SheetHeader>
                <div className="space-y-1">
                  <Button
                    variant="ghost"
                    className={`w-full justify-start text-base h-12 text-white hover:bg-white/10 transition-all duration-200 ${
                      activeSection === 'home' ? 'bg-white/20 shadow-md' : ''
                    }`}
                    onClick={() => {
                      setActiveSection('home');
                      setIsMenuOpen(false);
                    }}
                  >
                    <Icon name="Home" size={20} className="mr-3" />
                    Главная
                  </Button>
                  <Button
                    variant="ghost"
                    className={`w-full justify-start text-base h-12 text-white hover:bg-white/10 transition-all duration-200 ${
                      activeSection === 'catalog' ? 'bg-white/20 shadow-md' : ''
                    }`}
                    onClick={() => {
                      setActiveSection('catalog');
                      setIsMenuOpen(false);
                    }}
                  >
                    <Icon name="ShoppingBag" size={20} className="mr-3" />
                    Каталог
                  </Button>
                  <Button
                    variant="ghost"
                    className={`w-full justify-start text-base h-12 text-white hover:bg-white/10 transition-all duration-200 ${
                      activeSection === 'stores' ? 'bg-white/20 shadow-md' : ''
                    }`}
                    onClick={() => {
                      setActiveSection('stores');
                      setIsMenuOpen(false);
                    }}
                  >
                    <Icon name="MapPin" size={20} className="mr-3" />
                    Магазины
                  </Button>
                  <Button
                    variant="ghost"
                    className={`w-full justify-start text-base h-12 text-white hover:bg-white/10 transition-all duration-200 ${
                      activeSection === 'promotions' ? 'bg-white/20 shadow-md' : ''
                    }`}
                    onClick={() => {
                      setActiveSection('promotions');
                      setIsMenuOpen(false);
                    }}
                  >
                    <Icon name="Sparkles" size={20} className="mr-3" />
                    Акции
                  </Button>
                  <Button
                    variant="ghost"
                    className={`w-full justify-start text-base h-12 text-white hover:bg-white/10 transition-all duration-200 ${
                      activeSection === 'warranty' ? 'bg-white/20 shadow-md' : ''
                    }`}
                    onClick={() => {
                      setActiveSection('warranty');
                      setIsMenuOpen(false);
                    }}
                  >
                    <Icon name="ShieldCheck" size={20} className="mr-3" />
                    Проверка гарантии
                  </Button>
                  <Button
                    variant="ghost"
                    className={`w-full justify-start text-base h-12 text-white hover:bg-white/10 transition-all duration-200 ${
                      activeSection === 'qr-scanner' ? 'bg-white/20 shadow-md' : ''
                    }`}
                    onClick={() => {
                      setActiveSection('qr-scanner');
                      setIsMenuOpen(false);
                    }}
                  >
                    <Icon name="QrCode" size={20} className="mr-3" />
                    QR-сканер
                  </Button>
                  <Button
                    variant="ghost"
                    className={`w-full justify-start text-base h-12 text-white hover:bg-white/10 transition-all duration-200 ${
                      activeSection === 'blog' ? 'bg-white/20 shadow-md' : ''
                    }`}
                    onClick={() => {
                      setActiveSection('blog');
                      setIsMenuOpen(false);
                    }}
                  >
                    <Icon name="Newspaper" size={20} className="mr-3" />
                    Блог
                  </Button>
                  <Button
                    variant="ghost"
                    className={`w-full justify-start text-base h-12 text-white hover:bg-white/10 transition-all duration-200 ${
                      activeSection === 'reservations' ? 'bg-white/20 shadow-md' : ''
                    }`}
                    onClick={() => {
                      setActiveSection('reservations');
                      setIsMenuOpen(false);
                    }}
                  >
                    <Icon name="Package" size={20} className="mr-3" />
                    Бронирования
                  </Button>
                  <Button
                    variant="ghost"
                    className={`w-full justify-start text-base h-12 text-white hover:bg-white/10 transition-all duration-200 ${
                      activeSection === 'about' ? 'bg-white/20 shadow-md' : ''
                    }`}
                    onClick={() => {
                      setActiveSection('about');
                      setIsMenuOpen(false);
                    }}
                  >
                    <Icon name="Info" size={20} className="mr-3" />
                    О нас
                  </Button>
                  <Button
                    variant="ghost"
                    className={`w-full justify-start text-base h-12 text-white hover:bg-white/10 transition-all duration-200 ${
                      activeSection === 'contacts' ? 'bg-white/20 shadow-md' : ''
                    }`}
                    onClick={() => {
                      setActiveSection('contacts');
                      setIsMenuOpen(false);
                    }}
                  >
                    <Icon name="Phone" size={20} className="mr-3" />
                    Контакты
                  </Button>
                  <div className="my-4 border-t border-white/20" />
                  <Button
                    variant="ghost"
                    className={`w-full justify-start text-base h-12 text-white hover:bg-white/10 transition-all duration-200 ${
                      activeSection === 'profile' ? 'bg-white/20 shadow-md' : ''
                    }`}
                    onClick={() => {
                      setActiveSection('profile');
                      setIsMenuOpen(false);
                    }}
                  >
                    <Icon name="User" size={20} className="mr-3" />
                    Профиль
                  </Button>
                  <Button
                    variant="ghost"
                    className="w-full justify-start text-base h-12 text-white hover:bg-white/10 hover:bg-red-500/20 transition-all duration-200"
                    onClick={() => {
                      handleLogout();
                      setIsMenuOpen(false);
                    }}
                  >
                    <Icon name="LogOut" size={20} className="mr-3" />
                    Выйти
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