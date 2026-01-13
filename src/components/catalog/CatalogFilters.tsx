import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import Icon from '@/components/ui/icon';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

interface CatalogFiltersProps {
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
}

const getCountryFlag = (country: string): string => {
  const countryFlags: { [key: string]: string } = {
    'Китай': '🇨🇳',
    'Южная Корея': '🇰🇷',
    'Япония': '🇯🇵',
    'Россия': '🇷🇺',
    'Германия': '🇩🇪',
    'США': '🇺🇸',
    'Турция': '🇹🇷',
    'Польша': '🇵🇱',
    'Чехия': '🇨🇿',
    'Италия': '🇮🇹',
    'Франция': '🇫🇷',
    'Испания': '🇪🇸'
  };
  return countryFlags[country] || '🌍';
};

const CatalogFilters = ({
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
  categories,
  brands,
  manufacturers,
  countries,
  bodyTypesJIS,
  bodyTypesEN,
  technologies,
  polarities,
  allCars,
  resetFilters
}: CatalogFiltersProps) => {
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);

  const activeFilters = [
    searchQuery && { label: `Поиск: ${searchQuery}`, clear: () => setSearchQuery('') },
    (priceRange[0] > 0 || priceRange[1] < 50000) && { 
      label: `Цена: ${priceRange[0].toLocaleString()}₽ - ${priceRange[1].toLocaleString()}₽`, 
      clear: () => setPriceRange([0, 50000]) 
    },
    (capacityRange[0] > 0 || capacityRange[1] < 200) && { 
      label: `Емкость: ${capacityRange[0]}-${capacityRange[1]} Ah`, 
      clear: () => setCapacityRange([0, 200]) 
    },
    (currentRange[0] > 0 || currentRange[1] < 1700) && { 
      label: `Ток: ${currentRange[0]}-${currentRange[1]} A`, 
      clear: () => setCurrentRange([0, 1700]) 
    },
    selectedBrand && { label: `Бренд: ${selectedBrand}`, clear: () => setSelectedBrand('') },
    selectedManufacturer && { label: `Производитель: ${selectedManufacturer}`, clear: () => setSelectedManufacturer('') },
    selectedCountry && { label: `Страна: ${getCountryFlag(selectedCountry)} ${selectedCountry}`, clear: () => setSelectedCountry('') },
    selectedBodyTypeJIS && { label: `JIS: ${selectedBodyTypeJIS}`, clear: () => setSelectedBodyTypeJIS('') },
    selectedBodyTypeEN && { label: `EN: ${selectedBodyTypeEN}`, clear: () => setSelectedBodyTypeEN('') },
    selectedTechnology && { label: `Технология: ${selectedTechnology}`, clear: () => setSelectedTechnology('') },
    selectedPolarity && { label: `Полярность: ${selectedPolarity}`, clear: () => setSelectedPolarity('') },
    selectedCar && { label: `Авто: ${selectedCar}`, clear: () => setSelectedCar('') },
    selectedCategory && { label: `Категория: ${selectedCategory}`, clear: () => setSelectedCategory('') },
  ].filter(Boolean) as Array<{ label: string; clear: () => void }>;

  const hasActiveFilters = activeFilters.length > 0;

  const funnyMessages = [
    "🔍 Ага! Ищем идеальный аккумулятор...",
    "⚡ Фильтры работают на полную мощность!",
    "🎯 Прицеливаемся к идеальному выбору!",
    "🚀 Запускаем поиск по вашим параметрам!",
    "🔋 Заряжаем результаты...",
    "🎪 Магия фильтров в действии!",
    "🎨 Рисуем идеальный аккумулятор...",
    "🔮 Предсказываем ваш выбор...",
    "🎭 Фильтры выходят на сцену!",
    "🏆 Ищем победителя среди аккумуляторов!"
  ];

  const randomMessage = funnyMessages[Math.floor(Math.random() * funnyMessages.length)];

  return (
    <Card>
      <CardHeader 
        className="cursor-pointer hover:bg-muted/50 transition-colors md:cursor-default md:hover:bg-transparent"
        onClick={() => setIsFiltersOpen(!isFiltersOpen)}
      >
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Icon name="Filter" size={20} />
            Фильтры
            {hasActiveFilters && (
              <Badge variant="secondary" className="ml-2 animate-pulse">
                {activeFilters.length}
              </Badge>
            )}
          </CardTitle>
          <Button 
            variant="ghost" 
            size="sm" 
            className="md:hidden"
            onClick={(e) => {
              e.stopPropagation();
              setIsFiltersOpen(!isFiltersOpen);
            }}
          >
            <Icon name={isFiltersOpen ? "ChevronUp" : "ChevronDown"} size={20} />
          </Button>
        </div>
      </CardHeader>
      <CardContent className={`space-y-6 ${isFiltersOpen ? 'block' : 'hidden md:block'}`}>
        {hasActiveFilters && (
          <div className="space-y-3 p-4 bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 rounded-lg border-2 border-primary/20 animate-slide-down relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-marquee" style={{ width: '200%' }}></div>
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-2">
                <div className="animate-bounce-subtle">
                  <span className="text-2xl">✨</span>
                </div>
                <p className="text-sm font-bold text-primary animate-wiggle">{randomMessage}</p>
                <div className="animate-bounce-subtle" style={{ animationDelay: '0.3s' }}>
                  <span className="text-2xl">✨</span>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between relative z-10">
              <p className="text-sm font-medium flex items-center gap-2">
                <span className="animate-pulse">🎯</span>
                Активные фильтры:
              </p>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={resetFilters}
                className="h-8 text-xs"
              >
                <Icon name="X" size={14} className="mr-1" />
                Очистить всё
              </Button>
            </div>
            <div className="flex flex-wrap gap-2 relative z-10">
              {activeFilters.map((filter, index) => (
                <Badge 
                  key={index}
                  variant="secondary"
                  className="pr-1 py-1 gap-1 hover:bg-destructive/10 transition-colors cursor-pointer group"
                  onClick={filter.clear}
                >
                  <span className="text-xs">{filter.label}</span>
                  <div className="rounded-full p-0.5 group-hover:bg-destructive/20 transition-colors">
                    <Icon name="X" size={12} />
                  </div>
                </Badge>
              ))}
            </div>
          </div>
        )}

        <div className="space-y-2">
          <label className="text-sm font-medium flex items-center gap-2">
            <Icon name="Search" size={16} />
            Поиск по названию или бренду
          </label>
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

        <Accordion type="multiple" className="w-full space-y-2">
          <AccordionItem value="ranges" className="border rounded-lg px-4">
            <AccordionTrigger className="hover:no-underline">
              <div className="flex items-center gap-2">
                <Icon name="Sliders" size={16} />
                <span>Диапазоны значений</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="space-y-4 pt-2">
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
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="basic" className="border rounded-lg px-4">
            <AccordionTrigger className="hover:no-underline">
              <div className="flex items-center gap-2">
                <Icon name="Package" size={16} />
                <span>Основные параметры</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="grid md:grid-cols-2 gap-4 pt-2">
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
                <label className="text-sm font-medium">Страна производства</label>
                <select
                  value={selectedCountry}
                  onChange={(e) => setSelectedCountry(e.target.value)}
                  className="w-full p-2 border border-input rounded-md bg-background"
                >
                  <option value="">Все страны</option>
                  {countries.map((country) => (
                    <option key={country} value={country}>{getCountryFlag(country)} {country}</option>
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
                  <option value="">Все производители</option>
                  {manufacturers.map((manufacturer) => (
                    <option key={manufacturer} value={manufacturer}>{manufacturer}</option>
                  ))}
                </select>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="technical" className="border rounded-lg px-4">
            <AccordionTrigger className="hover:no-underline">
              <div className="flex items-center gap-2">
                <Icon name="Settings" size={16} />
                <span>Технические характеристики</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="grid md:grid-cols-2 gap-4 pt-2">
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
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="compatibility" className="border rounded-lg px-4">
            <AccordionTrigger className="hover:no-underline">
              <div className="flex items-center gap-2">
                <Icon name="Car" size={16} />
                <span>Совместимость</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="space-y-4 pt-2">
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
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  );
};

export default CatalogFilters;