import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import HomeSection from '@/components/sections/HomeSection';
import CatalogSection from '@/components/sections/CatalogSection';
import CartSection from '@/components/sections/CartSection';
import ContactsSection from '@/components/sections/ContactsSection';
import ProfileSection from '@/components/sections/ProfileSection';
import AboutSection from '@/components/sections/AboutSection';
import StoresSection from '@/components/sections/StoresSection';
import PromotionsSection from '@/components/sections/PromotionsSection';
import WarrantySection from '@/components/sections/WarrantySection';
import BlogSection from '@/components/sections/BlogSection';
import FavoritesSection from '@/components/sections/FavoritesSection';
import HistorySection from '@/components/sections/HistorySection';

interface MainContentProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
  showInstallPrompt: boolean;
  setShowInstallPrompt: (value: boolean) => void;
  handleInstallApp: () => void;
  userPurchaseCount: number;
  brands: any[];
  stores: any[];
  serviceCenter: any;
  vibrate: (pattern: number | number[]) => void;
  user: any;
  handleLogout: () => void;
  cart: any;
}

const MainContent = ({
  activeSection,
  setActiveSection,
  showInstallPrompt,
  setShowInstallPrompt,
  handleInstallApp,
  userPurchaseCount,
  brands,
  stores,
  serviceCenter,
  vibrate,
  user,
  handleLogout,
  cart
}: MainContentProps) => {
  return (
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
          userPurchaseCount={userPurchaseCount}
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
          selectedCountry={cart.selectedCountry}
          setSelectedCountry={cart.setSelectedCountry}
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
          countries={cart.countries}
          bodyTypesJIS={cart.bodyTypesJIS}
          bodyTypesEN={cart.bodyTypesEN}
          technologies={cart.technologies}
          polarities={cart.polarities}
          allCars={cart.allCars}
          resetFilters={cart.resetFilters}
          getCategoryBadge={cart.getCategoryBadge}
          addToCart={cart.addToCart}
          favorites={cart.favorites}
          onToggleFavorite={cart.toggleFavorite}
          onViewProduct={cart.addToViewHistory}
        />
      )}

      {activeSection === 'cart' && (
        <CartSection
          cart={cart.cart}
          cartTotal={cart.cartTotal}
          cartDiscount={cart.cartDiscount}
          cartItemsCount={cart.cartItemsCount}
          selectedStore={cart.selectedStore}
          setSelectedStore={cart.setSelectedStore}
          stores={stores}
          removeFromCart={cart.removeFromCart}
          updateQuantity={cart.updateQuantity}
          setActiveSection={setActiveSection}
          userPurchaseCount={userPurchaseCount}
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

      {activeSection === 'blog' && (
        <BlogSection />
      )}

      {activeSection === 'favorites' && (
        <FavoritesSection
          favoriteProducts={cart.getFavoriteProducts()}
          favorites={cart.favorites}
          getCategoryBadge={cart.getCategoryBadge}
          addToCart={cart.addToCart}
          onToggleFavorite={cart.toggleFavorite}
          onViewProduct={cart.addToViewHistory}
        />
      )}

      {activeSection === 'history' && (
        <HistorySection
          historyProducts={cart.getViewHistoryProducts()}
          favorites={cart.favorites}
          getCategoryBadge={cart.getCategoryBadge}
          addToCart={cart.addToCart}
          onToggleFavorite={cart.toggleFavorite}
          onViewProduct={cart.addToViewHistory}
          onClearHistory={cart.clearViewHistory}
        />
      )}
    </main>
  );
};

export default MainContent;
