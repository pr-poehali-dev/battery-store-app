import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import Icon from '@/components/ui/icon';

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
}

interface CatalogSectionProps {
  filteredProducts: Product[];
  searchQuery: string;
  setSearchQuery: (value: string) => void;
  priceRange: number[];
  setPriceRange: (value: number[]) => void;
  selectedCategory: string;
  setSelectedCategory: (value: string) => void;
  selectedCar: string;
  setSelectedCar: (value: string) => void;
  categories: string[];
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
  selectedCategory,
  setSelectedCategory,
  selectedCar,
  setSelectedCar,
  categories,
  allCars,
  resetFilters,
  getCategoryBadge,
  addToCart
}: CatalogSectionProps) => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold">Каталог товаров</h2>
        <Badge variant="secondary" className="text-base">
          {filteredProducts.length} товаров
        </Badge>
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

          <div className="space-y-3">
            <label className="text-sm font-medium">
              Диапазон цен: {priceRange[0].toLocaleString()} ₽ — {priceRange[1].toLocaleString()} ₽
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

          <div className="space-y-2">
            <label className="text-sm font-medium">Категория товара</label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full p-2 border border-input rounded-md bg-background"
            >
              <option value="">Все категории</option>
              {categories.map((category, index) => (
                <option key={index} value={category}>{category}</option>
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

          {(searchQuery || priceRange[0] > 0 || priceRange[1] < 50000 || selectedCar || selectedCategory) && (
            <Button variant="outline" onClick={resetFilters} className="w-full">
              <Icon name="X" size={18} className="mr-2" />
              Сбросить фильтры
            </Button>
          )}
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredProducts.map((product) => (
          <Card key={product.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between mb-2">
                <div className="text-4xl">{product.image}</div>
                <Badge className={`${getCategoryBadge(product.category).color} border`}>
                  <span className="mr-1">{getCategoryBadge(product.category).icon}</span>
                  {getCategoryBadge(product.category).label}
                </Badge>
              </div>
              <CardTitle className="text-lg">{product.name}</CardTitle>
              <CardDescription>{product.brand}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-3 gap-2 text-sm">
                <div className="text-center p-2 bg-muted rounded">
                  <p className="text-muted-foreground text-xs">Напряжение</p>
                  <p className="font-semibold">{product.voltage}</p>
                </div>
                <div className="text-center p-2 bg-muted rounded">
                  <p className="text-muted-foreground text-xs">Ёмкость</p>
                  <p className="font-semibold">{product.capacity}</p>
                </div>
                <div className="text-center p-2 bg-muted rounded">
                  <p className="text-muted-foreground text-xs">Ток</p>
                  <p className="font-semibold">{product.current}</p>
                </div>
              </div>

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

              <div className="pt-4 border-t">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <p className="text-2xl font-bold text-primary">{product.price.toLocaleString()} ₽</p>
                    <p className="text-xs text-green-600">+{Math.floor(product.price * 0.03)} ₽ кэшбек</p>
                  </div>
                </div>
                <Button 
                  className="w-full"
                  onClick={() => addToCart(product)}
                >
                  <Icon name="ShoppingCart" size={16} className="mr-2" />
                  В корзину
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <Card>
          <CardContent className="pt-6 text-center py-12">
            <Icon name="SearchX" size={64} className="mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-xl font-semibold mb-2">Ничего не найдено</h3>
            <p className="text-muted-foreground mb-6">
              Попробуйте изменить фильтры или сбросить их
            </p>
            <Button onClick={resetFilters}>Сбросить фильтры</Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default CatalogSection;
