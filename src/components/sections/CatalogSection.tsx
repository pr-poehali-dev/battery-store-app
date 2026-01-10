import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import Icon from '@/components/ui/icon';
import FooterInfo from '@/components/ui/FooterInfo';

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
    priceRange[0] > 0 || priceRange[1] < 50000 || 
    capacityRange[0] > 0 || capacityRange[1] < 200 ||
    currentRange[0] > 0 || currentRange[1] < 1700 ||
    selectedCar || selectedCategory || selectedBrand || 
    selectedManufacturer || selectedBodyTypeJIS || selectedBodyTypeEN || 
    selectedTechnology || selectedPolarity;

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <h2 className="text-3xl font-bold">Каталог товаров</h2>
          <Badge variant="secondary" className="text-base">
            {filteredProducts.length}
          </Badge>
        </div>
        <div className="flex items-center gap-2">
          <Icon name="ArrowUpDown" size={18} className="text-muted-foreground" />
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-3 py-2 border border-input rounded-md bg-background text-sm font-medium min-w-[180px]"
          >
            <option value="default">По умолчанию</option>
            <option value="price-asc">Цена: по возрастанию</option>
            <option value="price-desc">Цена: по убыванию</option>
            <option value="capacity">Емкость: больше → меньше</option>
            <option value="name-asc">Название: A → Z</option>
            <option value="name-desc">Название: Z → A</option>
          </select>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Icon name="Filter" size={20} />
            Фильтры
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium">Поиск по названию или бренду</label>
            <div className="relative">
              <Icon name="Search" size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Например: Varta, Mutlu, 60Ah..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <label className="text-sm font-medium">
                Цена: {priceRange[0].toLocaleString()} ₽ — {priceRange[1].toLocaleString()} ₽
              </label>
              <Slider
                min={0}
                max={50000}
                step={500}
                value={priceRange}
                onValueChange={setPriceRange}
                className="w-full"
              />
            </div>

            <div className="space-y-3">
              <label className="text-sm font-medium">
                Емкость: {capacityRange[0]} Ah — {capacityRange[1]} Ah
              </label>
              <Slider
                min={0}
                max={200}
                step={5}
                value={capacityRange}
                onValueChange={setCapacityRange}
                className="w-full"
              />
            </div>

            <div className="space-y-3">
              <label className="text-sm font-medium">
                Пусковой ток: {currentRange[0]} A — {currentRange[1]} A
              </label>
              <Slider
                min={0}
                max={1700}
                step={50}
                value={currentRange}
                onValueChange={setCurrentRange}
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Бренд</label>
              <select
                value={selectedBrand}
                onChange={(e) => setSelectedBrand(e.target.value)}
                className="w-full p-2 border border-input rounded-md bg-background"
              >
                <option value="">Все бренды</option>
                {brands.map((brand) => (
                  <option key={brand} value={brand}>{brand}</option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Производитель</label>
              <select
                value={selectedManufacturer}
                onChange={(e) => setSelectedManufacturer(e.target.value)}
                className="w-full p-2 border border-input rounded-md bg-background"
              >
                <option value="">Все страны</option>
                {manufacturers.map((manufacturer) => (
                  <option key={manufacturer} value={manufacturer}>{manufacturer}</option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Тип корпуса JIS</label>
              <select
                value={selectedBodyTypeJIS}
                onChange={(e) => setSelectedBodyTypeJIS(e.target.value)}
                className="w-full p-2 border border-input rounded-md bg-background"
              >
                <option value="">Все типы JIS</option>
                {bodyTypesJIS.map((type) => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Тип корпуса EN</label>
              <select
                value={selectedBodyTypeEN}
                onChange={(e) => setSelectedBodyTypeEN(e.target.value)}
                className="w-full p-2 border border-input rounded-md bg-background"
              >
                <option value="">Все типы EN</option>
                {bodyTypesEN.map((type) => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Технология изготовления</label>
              <select
                value={selectedTechnology}
                onChange={(e) => setSelectedTechnology(e.target.value)}
                className="w-full p-2 border border-input rounded-md bg-background"
              >
                <option value="">Все технологии</option>
                {technologies.map((tech) => (
                  <option key={tech} value={tech}>{tech}</option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Полярность</label>
              <select
                value={selectedPolarity}
                onChange={(e) => setSelectedPolarity(e.target.value)}
                className="w-full p-2 border border-input rounded-md bg-background"
              >
                <option value="">Любая полярность</option>
                {polarities.map((polarity) => (
                  <option key={polarity} value={polarity}>{polarity}</option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Совместимость с автомобилем</label>
              <select
                value={selectedCar}
                onChange={(e) => setSelectedCar(e.target.value)}
                className="w-full p-2 border border-input rounded-md bg-background"
              >
                <option value="">Все автомобили</option>
                <option value="all">Универсальные</option>
                {allCars.filter(car => car !== 'Универсальное').map((car, index) => (
                  <option key={index} value={car}>{car}</option>
                ))}
              </select>
            </div>
          </div>

          {hasActiveFilters && (
            <Button variant="outline" onClick={resetFilters} className="w-full">
              <Icon name="X" size={18} className="mr-2" />
              Сбросить все фильтры
            </Button>
          )}
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
          <Card key={product.id} className="overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group">
            <div className="relative aspect-square bg-gradient-to-br from-muted/30 to-muted/60 flex items-center justify-center">
              <div className="text-7xl group-hover:scale-110 transition-transform duration-300">{product.image}</div>
              <Badge className={`absolute top-3 right-3 ${getCategoryBadge(product.category).color} border shadow-sm`}>
                <span className="mr-1">{getCategoryBadge(product.category).icon}</span>
                {getCategoryBadge(product.category).label}
              </Badge>
            </div>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg leading-tight">{product.name}</CardTitle>
              <CardDescription className="text-base font-medium">{product.brand}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 pt-0">
              <div className="grid grid-cols-3 gap-2 text-sm">
                <div className="text-center p-3 bg-gradient-to-br from-muted/50 to-muted rounded-lg border">
                  <Icon name="Zap" size={16} className="mx-auto mb-1 text-primary" />
                  <p className="font-bold text-base">{product.voltage}</p>
                  <p className="text-muted-foreground text-[10px]">напряжение</p>
                </div>
                <div className="text-center p-3 bg-gradient-to-br from-muted/50 to-muted rounded-lg border">
                  <Icon name="Battery" size={16} className="mx-auto mb-1 text-primary" />
                  <p className="font-bold text-base">{product.capacity}</p>
                  <p className="text-muted-foreground text-[10px]">ёмкость</p>
                </div>
                <div className="text-center p-3 bg-gradient-to-br from-muted/50 to-muted rounded-lg border">
                  <Icon name="Gauge" size={16} className="mx-auto mb-1 text-primary" />
                  <p className="font-bold text-base">{product.current}</p>
                  <p className="text-muted-foreground text-[10px]">пусковой ток</p>
                </div>
              </div>

              {(product.manufacturer || product.bodyTypeJIS || product.bodyTypeEN || product.technology || product.polarity) && (
                <div className="flex flex-wrap gap-1">
                  {product.manufacturer && (
                    <Badge variant="outline" className="text-xs">
                      🌍 {product.manufacturer}
                    </Badge>
                  )}
                  {product.bodyTypeJIS && (
                    <Badge variant="outline" className="text-xs">
                      JIS: {product.bodyTypeJIS}
                    </Badge>
                  )}
                  {product.bodyTypeEN && (
                    <Badge variant="outline" className="text-xs">
                      EN: {product.bodyTypeEN}
                    </Badge>
                  )}
                  {product.technology && (
                    <Badge variant="outline" className="text-xs">
                      {product.technology}
                    </Badge>
                  )}
                  {product.polarity && (
                    <Badge variant="outline" className="text-xs">
                      {product.polarity}
                    </Badge>
                  )}
                </div>
              )}

              <div className="space-y-2">
                <p className="text-xs font-medium text-muted-foreground">Совместимость:</p>
                <div className="flex flex-wrap gap-1">
                  {product.compatible.slice(0, 3).map((car, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {car}
                    </Badge>
                  ))}
                  {product.compatible.length > 3 && (
                    <Badge variant="outline" className="text-xs">
                      +{product.compatible.length - 3}
                    </Badge>
                  )}
                </div>
              </div>

              <div className="pt-4 border-t space-y-3">
                <div className="flex items-baseline gap-2">
                  <p className="text-3xl font-bold text-primary">{product.price.toLocaleString()} ₽</p>
                  <Badge variant="secondary" className="text-xs bg-green-500/10 text-green-700 border-green-500/20">
                    <Icon name="Coins" size={12} className="mr-1" />
                    +{Math.floor(product.price * 0.03)} ₽
                  </Badge>
                </div>
                <Button 
                  className="w-full h-11 text-base font-semibold group-hover:shadow-lg"
                  onClick={() => addToCart(product)}
                >
                  <Icon name="ShoppingCart" size={20} className="mr-2" />
                  В корзину
                </Button>
              </div>
            </CardContent>
          </Card>
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
