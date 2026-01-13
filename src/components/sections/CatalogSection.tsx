import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import FooterInfo from '@/components/ui/FooterInfo';
import CatalogHeader from '@/components/catalog/CatalogHeader';
import CatalogFilters from '@/components/catalog/CatalogFilters';
import ProductCard from '@/components/catalog/ProductCard';

interface Product {
  id: number;
  name: string;
  brand: string;
  price: number;
  voltage: string;
  capacity: string;
  current: string;
  category: string;
  compatible: string[];
  image: string;
  manufacturer?: string;
  bodyTypeJIS?: string;
  bodyTypeEN?: string;
  technology?: string;
  polarity?: string;
}

interface CatalogSectionProps {
  filteredProducts: Product[];
  searchQuery: string;
  setSearchQuery: (value: string) => void;
  priceRange: number[];
  setPriceRange: (value: number[]) => void;
  capacityRange: number[];
  setCapacityRange: (value: number[]) => void;
  currentRange: number[];
  setCurrentRange: (value: number[]) => void;
  selectedCategory: string;
  setSelectedCategory: (value: string) => void;
  selectedBrand: string;
  setSelectedBrand: (value: string) => void;
  selectedManufacturer: string;
  setSelectedManufacturer: (value: string) => void;
  selectedCountry: string;
  setSelectedCountry: (value: string) => void;
  selectedBodyTypeJIS: string;
  setSelectedBodyTypeJIS: (value: string) => void;
  selectedBodyTypeEN: string;
  setSelectedBodyTypeEN: (value: string) => void;
  selectedTechnology: string;
  setSelectedTechnology: (value: string) => void;
  selectedPolarity: string;
  setSelectedPolarity: (value: string) => void;
  selectedCar: string;
  setSelectedCar: (value: string) => void;
  sortBy: string;
  setSortBy: (value: string) => void;
  categories: string[];
  brands: string[];
  manufacturers: string[];
  countries: string[];
  bodyTypesJIS: string[];
  bodyTypesEN: string[];
  technologies: string[];
  polarities: string[];
  allCars: string[];
  resetFilters: () => void;
  getCategoryBadge: (category: string) => { icon: string; color: string; label: string };
  addToCart: (product: Product) => void;
}

const CatalogSection = ({
  filteredProducts,
  searchQuery,
  setSearchQuery,
  priceRange,
  setPriceRange,
  capacityRange,
  setCapacityRange,
  currentRange,
  setCurrentRange,
  selectedCategory,
  setSelectedCategory,
  selectedBrand,
  setSelectedBrand,
  selectedManufacturer,
  setSelectedManufacturer,
  selectedCountry,
  setSelectedCountry,
  selectedBodyTypeJIS,
  setSelectedBodyTypeJIS,
  selectedBodyTypeEN,
  setSelectedBodyTypeEN,
  selectedTechnology,
  setSelectedTechnology,
  selectedPolarity,
  setSelectedPolarity,
  selectedCar,
  setSelectedCar,
  sortBy,
  setSortBy,
  categories,
  brands,
  manufacturers,
  countries,
  bodyTypesJIS,
  bodyTypesEN,
  technologies,
  polarities,
  allCars,
  resetFilters,
  getCategoryBadge,
  addToCart
}: CatalogSectionProps) => {
  const hasActiveFilters = searchQuery || 
    (priceRange[0] > 0 || priceRange[1] < 50000) ||
    (capacityRange[0] > 0 || capacityRange[1] < 200) ||
    (currentRange[0] > 0 || currentRange[1] < 1700) ||
    selectedBrand || selectedManufacturer || selectedBodyTypeJIS || 
    selectedBodyTypeEN || selectedTechnology || selectedPolarity || 
    selectedCar || selectedCategory;

  return (
    <div className="space-y-6 animate-fade-in">
      <CatalogHeader 
        productsCount={filteredProducts.length}
        sortBy={sortBy}
        setSortBy={setSortBy}
      />

      <CatalogFilters
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        priceRange={priceRange}
        setPriceRange={setPriceRange}
        capacityRange={capacityRange}
        setCapacityRange={setCapacityRange}
        currentRange={currentRange}
        setCurrentRange={setCurrentRange}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        selectedBrand={selectedBrand}
        setSelectedBrand={setSelectedBrand}
        selectedManufacturer={selectedManufacturer}
        setSelectedManufacturer={setSelectedManufacturer}
        selectedCountry={selectedCountry}
        setSelectedCountry={setSelectedCountry}
        selectedBodyTypeJIS={selectedBodyTypeJIS}
        setSelectedBodyTypeJIS={setSelectedBodyTypeJIS}
        selectedBodyTypeEN={selectedBodyTypeEN}
        setSelectedBodyTypeEN={setSelectedBodyTypeEN}
        selectedTechnology={selectedTechnology}
        setSelectedTechnology={setSelectedTechnology}
        selectedPolarity={selectedPolarity}
        setSelectedPolarity={setSelectedPolarity}
        selectedCar={selectedCar}
        setSelectedCar={setSelectedCar}
        categories={categories}
        brands={brands}
        manufacturers={manufacturers}
        countries={countries}
        bodyTypesJIS={bodyTypesJIS}
        bodyTypesEN={bodyTypesEN}
        technologies={technologies}
        polarities={polarities}
        allCars={allCars}
        resetFilters={resetFilters}
      />

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            getCategoryBadge={getCategoryBadge}
            addToCart={addToCart}
          />
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <Card className="p-12">
          <div className="text-center space-y-4">
            <Icon name="SearchX" size={64} className="mx-auto text-muted-foreground" />
            <div>
              <p className="text-xl font-semibold">Товары не найдены</p>
              <p className="text-muted-foreground mt-2">Попробуйте изменить параметры фильтрации</p>
            </div>
            {hasActiveFilters && (
              <Button variant="outline" onClick={resetFilters}>
                Сбросить фильтры
              </Button>
            )}
          </div>
        </Card>
      )}

      <FooterInfo />
    </div>
  );
};

export default CatalogSection;