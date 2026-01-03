import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
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

interface CartItem {
  product: Product;
  quantity: number;
}

const Index = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [userCashback, setUserCashback] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [priceRange, setPriceRange] = useState([0, 50000]);
  const [selectedCar, setSelectedCar] = useState('');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedStore, setSelectedStore] = useState('');
  const [showInstallPrompt, setShowInstallPrompt] = useState(false);

  useEffect(() => {
    let deferredPrompt: any;
    
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      deferredPrompt = e;
      setShowInstallPrompt(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallApp = () => {
    const deferredPrompt = (window as any).deferredPrompt;
    if (deferredPrompt) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then(() => {
        setShowInstallPrompt(false);
      });
    }
  };

  const vibrate = (pattern: number | number[]) => {
    if ('vibrate' in navigator) {
      navigator.vibrate(pattern);
    }
  };

  const products: Product[] = [
    {
      id: 1,
      name: 'Varta Blue Dynamic 60Ah 540A',
      brand: 'Varta',
      price: 5990,
      voltage: '12V',
      capacity: '60Ah',
      current: '540A',
      category: 'Автомобильные',
      compatible: ['Toyota Camry', 'Honda Civic', 'Mazda 6', 'Volkswagen Polo'],
      image: '🔋'
    },
    {
      id: 2,
      name: 'Mutlu 74Ah 680A',
      brand: 'Mutlu',
      price: 7490,
      voltage: '12V',
      capacity: '74Ah',
      current: '680A',
      category: 'Автомобильные',
      compatible: ['Toyota RAV4', 'Nissan X-Trail', 'Hyundai Tucson', 'Kia Sportage'],
      image: '🔋'
    },
    {
      id: 3,
      name: 'Titan 100Ah 850A',
      brand: 'Titan',
      price: 8990,
      voltage: '12V',
      capacity: '100Ah',
      current: '850A',
      category: 'Автомобильные',
      compatible: ['УАЗ Патриот', 'Mitsubishi L200', 'Toyota Land Cruiser', 'Nissan Patrol'],
      image: '⚡'
    },
    {
      id: 4,
      name: 'Solite 65Ah 580A',
      brand: 'Solite',
      price: 6490,
      voltage: '12V',
      capacity: '65Ah',
      current: '580A',
      category: 'Автомобильные',
      compatible: ['Hyundai Solaris', 'Kia Rio', 'Chevrolet Cruze', 'Renault Logan'],
      image: '🔋'
    },
    {
      id: 5,
      name: 'FB 55Ah 480A',
      brand: 'FB',
      price: 4990,
      voltage: '12V',
      capacity: '55Ah',
      current: '480A',
      category: 'Автомобильные',
      compatible: ['Lada Granta', 'Lada Vesta', 'Daewoo Nexia', 'Chevrolet Lanos'],
      image: '🔋'
    },
    {
      id: 6,
      name: 'Tubor 90Ah 760A',
      brand: 'Tubor',
      price: 9490,
      voltage: '12V',
      capacity: '90Ah',
      current: '760A',
      category: 'Автомобильные',
      compatible: ['Ford Explorer', 'Jeep Grand Cherokee', 'BMW X5', 'Audi Q7'],
      image: '⚡'
    },
    {
      id: 7,
      name: 'Volt 70Ah 640A',
      brand: 'Volt',
      price: 7290,
      voltage: '12V',
      capacity: '70Ah',
      current: '640A',
      category: 'Автомобильные',
      compatible: ['Volkswagen Tiguan', 'Skoda Octavia', 'Ford Focus', 'Opel Astra'],
      image: '🔋'
    },
    {
      id: 8,
      name: 'Gladiator 80Ah 720A',
      brand: 'Gladiator',
      price: 8490,
      voltage: '12V',
      capacity: '80Ah',
      current: '720A',
      category: 'Автомобильные',
      compatible: ['Mazda CX-5', 'Subaru Forester', 'Honda CR-V', 'Toyota Highlander'],
      image: '⚡'
    },
    {
      id: 9,
      name: 'ELECTRO 45Ah 380A',
      brand: 'ELECTRO',
      price: 3990,
      voltage: '12V',
      capacity: '45Ah',
      current: '380A',
      category: 'Автомобильные',
      compatible: ['Hyundai Getz', 'Kia Picanto', 'Daewoo Matiz', 'Suzuki Swift'],
      image: '🔋'
    },
    {
      id: 10,
      name: 'Delta 95Ah 800A',
      brand: 'Delta',
      price: 10990,
      voltage: '12V',
      capacity: '95Ah',
      current: '800A',
      category: 'Автомобильные',
      compatible: ['Mercedes-Benz E-Class', 'BMW 5-Series', 'Audi A6', 'Volvo S90'],
      image: '⚡'
    },
    {
      id: 11,
      name: 'Varta AGM 70Ah 760A',
      brand: 'Varta',
      price: 14990,
      voltage: '12V',
      capacity: '70Ah',
      current: '760A',
      category: 'Специальные (AGM/EFB)',
      compatible: ['BMW X3', 'Audi Q5', 'Mercedes GLC', 'Porsche Cayenne'],
      image: '🔌'
    },
    {
      id: 12,
      name: 'Carku X4 Пусковое устройство',
      brand: 'Carku',
      price: 8990,
      voltage: '12V',
      capacity: '12000mAh',
      current: '600A',
      category: 'Зарядные устройства',
      compatible: ['Универсальное'],
      image: '🔧'
    },
    {
      id: 13,
      name: 'Vtoman Jump 600 Пусковое',
      brand: 'Vtoman',
      price: 12990,
      voltage: '12V',
      capacity: '15000mAh',
      current: '800A',
      category: 'Зарядные устройства',
      compatible: ['Универсальное'],
      image: '🔧'
    },
    {
      id: 14,
      name: 'R drive One Зарядное устройство',
      brand: 'R drive',
      price: 5490,
      voltage: '12V/24V',
      capacity: '—',
      current: '10A',
      category: 'Зарядные устройства',
      compatible: ['Универсальное'],
      image: '🔌'
    },
    {
      id: 15,
      name: 'Mutlu EFB 75Ah 720A',
      brand: 'Mutlu',
      price: 11490,
      voltage: '12V',
      capacity: '75Ah',
      current: '720A',
      category: 'Специальные (AGM/EFB)',
      compatible: ['Volkswagen Passat', 'Skoda Superb', 'Audi A4', 'BMW 3-Series'],
      image: '🔌'
    }
  ];

  const brands = [
    'Carku', 'Vtoman', 'Titan', 'Solite', 'FB', 'R drive', 
    'Tubor', 'Volt', 'Gladiator', 'Varta', 'Mutlu', 
    'ELECTRO', 'Delta'
  ];

  const stores = [
    { name: 'Павловича, 26', address: 'ул. Павловича, 26' },
    { name: 'Павловича, 11', address: 'ул. Павловича, 11' },
    { name: 'Краснореченская, 149', address: 'ул. Краснореченская, 149' },
    { name: 'Воронежская, 66', address: 'ул. Воронежская, 66' },
    { name: 'Суворова, 73а/2', address: 'ул. Суворова, 73а/2' },
    { name: 'Пр. 60-летия Октября, 154', address: 'Проспект 60-летия Октября, 154' }
  ];

  const serviceCenter = {
    name: 'Сервисный центр',
    address: 'ул. Павловича, 11/2',
    description: 'Обслуживание аккумуляторных батарей'
  };

  const allCars = Array.from(new Set(products.flatMap(p => p.compatible))).sort();

  const filteredProducts = products.filter(product => {
    const matchesSearch = 
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.brand.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
    
    const matchesCar = !selectedCar || 
      selectedCar === 'all' || 
      product.compatible.includes(selectedCar) ||
      product.compatible.includes('Универсальное');
    
    return matchesSearch && matchesPrice && matchesCar;
  });

  const resetFilters = () => {
    setSearchQuery('');
    setPriceRange([0, 50000]);
    setSelectedCar('');
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

  const cartTotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const cartCashback = Math.floor(cartTotal * 0.03);
  const cartItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);

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
                <h1 className="text-lg md:text-xl font-bold text-primary">miraccum.ru</h1>
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
                {cartItemsCount > 0 && (
                  <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs">
                    {cartItemsCount}
                  </Badge>
                )}
              </Button>
              <Badge variant="secondary" className="hidden md:flex items-center gap-1">
                <Icon name="Wallet" size={14} />
                {userCashback} ₽
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
          <div className="space-y-8 animate-fade-in">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img 
                src="https://cdn.poehali.dev/files/IMG_0744.jpeg" 
                alt="Мир Аккумуляторов"
                className="w-full h-auto object-cover"
              />
            </div>

            <Card className="border-2 border-primary/20">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Icon name="Award" size={24} className="text-primary" />
                  <CardTitle className="text-2xl">О компании</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-primary/5 rounded-lg">
                    <div className="text-3xl font-bold text-primary">1998</div>
                    <p className="text-sm text-muted-foreground">Год основания</p>
                  </div>
                  <div className="text-center p-4 bg-primary/5 rounded-lg">
                    <div className="text-3xl font-bold text-primary">1000+</div>
                    <p className="text-sm text-muted-foreground">Довольных клиентов</p>
                  </div>
                  <div className="text-center p-4 bg-primary/5 rounded-lg">
                    <div className="text-3xl font-bold text-primary">6</div>
                    <p className="text-sm text-muted-foreground">Точек в городе</p>
                  </div>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  Мы специализируемся на продаже аккумуляторов, зарядных устройств и комплектующих. 
                  Работаем оптом и в розницу, предлагая одни из самых выгодных цен в Хабаровске.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-green-500/10 to-green-600/5 border-2 border-green-500/20">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Icon name="Percent" size={24} className="text-green-600" />
                  <CardTitle className="text-2xl">Кэшбек 3%</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-lg font-medium">Копи и покупай дешевле!</p>
                <div className="flex items-center justify-between p-4 bg-card rounded-lg">
                  <div>
                    <p className="text-sm text-muted-foreground">Ваш кэшбек</p>
                    <p className="text-2xl font-bold text-green-600">{userCashback} ₽</p>
                  </div>
                  <Icon name="TrendingUp" size={32} className="text-green-600" />
                </div>
                <p className="text-sm text-muted-foreground">
                  С каждой покупки возвращается 3% на ваш счёт. Используйте для следующих заказов!
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Icon name="Package" size={24} className="text-primary" />
                  <CardTitle className="text-2xl">Наши бренды</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {brands.map((brand, index) => (
                    <Badge key={index} variant="outline" className="text-sm py-1.5 px-3">
                      {brand}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            <div className="grid md:grid-cols-2 gap-4">
              <Card className="hover:shadow-lg smooth-transition cursor-pointer hover:scale-105" onClick={() => { vibrate(30); setActiveSection('catalog'); }}>
                <CardContent className="pt-6 text-center space-y-3">
                  <Icon name="ShoppingBag" size={48} className="mx-auto text-primary" />
                  <h3 className="text-xl font-semibold">Каталог товаров</h3>
                  <p className="text-sm text-muted-foreground">Широкий выбор аккумуляторов и зарядных устройств</p>
                  <Button className="w-full">Перейти в каталог</Button>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => setActiveSection('contacts')}>
                <CardContent className="pt-6 text-center space-y-3">
                  <Icon name="MapPin" size={48} className="mx-auto text-primary" />
                  <h3 className="text-xl font-semibold">Точки самовывоза</h3>
                  <p className="text-sm text-muted-foreground">6 магазинов в Хабаровске для удобного самовывоза</p>
                  <Button variant="outline" className="w-full">Смотреть адреса</Button>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {activeSection === 'catalog' && (
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

                {(searchQuery || priceRange[0] > 0 || priceRange[1] < 50000 || selectedCar) && (
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
                    <div className="flex items-start justify-between">
                      <div className="text-4xl">{product.image}</div>
                      <Badge variant="secondary">{product.category}</Badge>
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
        )}

        {activeSection === 'cart' && (
          <div className="space-y-6 animate-fade-in">
            <div className="flex items-center justify-between">
              <h2 className="text-3xl font-bold">Корзина</h2>
              {cartItemsCount > 0 && (
                <Badge variant="secondary" className="text-base">
                  {cartItemsCount} товаров
                </Badge>
              )}
            </div>

            {cart.length === 0 ? (
              <Card>
                <CardContent className="pt-6 text-center py-12">
                  <Icon name="ShoppingCart" size={64} className="mx-auto mb-4 text-muted-foreground" />
                  <h3 className="text-xl font-semibold mb-2">Корзина пуста</h3>
                  <p className="text-muted-foreground mb-6">
                    Добавьте товары из каталога
                  </p>
                  <Button onClick={() => setActiveSection('catalog')}>
                    <Icon name="ShoppingBag" size={18} className="mr-2" />
                    Перейти в каталог
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <>
                <div className="space-y-4">
                  {cart.map(item => (
                    <Card key={item.product.id}>
                      <CardContent className="p-4">
                        <div className="flex items-start gap-4">
                          <div className="text-5xl flex-shrink-0">{item.product.image}</div>
                          <div className="flex-1">
                            <div className="flex justify-between items-start mb-2">
                              <div>
                                <h3 className="font-semibold text-lg">{item.product.name}</h3>
                                <p className="text-sm text-muted-foreground">{item.product.brand}</p>
                                <div className="flex gap-2 mt-1">
                                  <Badge variant="outline" className="text-xs">{item.product.voltage}</Badge>
                                  <Badge variant="outline" className="text-xs">{item.product.capacity}</Badge>
                                </div>
                              </div>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => removeFromCart(item.product.id)}
                              >
                                <Icon name="Trash2" size={18} className="text-destructive" />
                              </Button>
                            </div>
                            <div className="flex items-center justify-between mt-4">
                              <div className="flex items-center gap-3">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                                >
                                  <Icon name="Minus" size={14} />
                                </Button>
                                <span className="font-semibold w-8 text-center">{item.quantity}</span>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                                >
                                  <Icon name="Plus" size={14} />
                                </Button>
                              </div>
                              <div className="text-right">
                                <div className="text-xl font-bold text-primary">
                                  {(item.product.price * item.quantity).toLocaleString()} ₽
                                </div>
                                <div className="text-xs text-green-600">
                                  +{Math.floor(item.product.price * item.quantity * 0.03)} ₽ кэшбек
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <Card className="bg-gradient-to-br from-amber-500/10 to-amber-600/5 border-2 border-amber-500/20">
                  <CardHeader>
                    <div className="flex items-center gap-2">
                      <Icon name="MapPin" size={24} className="text-amber-600" />
                      <CardTitle className="text-xl">Самовывоз из магазина</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <p className="text-sm text-muted-foreground">Выберите магазин для получения заказа:</p>
                    <select
                      value={selectedStore}
                      onChange={(e) => setSelectedStore(e.target.value)}
                      className="w-full p-3 border border-input rounded-md bg-background text-sm"
                    >
                      <option value="">Выберите магазин...</option>
                      {stores.map((store, index) => (
                        <option key={index} value={store.address}>
                          {store.name} — {store.address}
                        </option>
                      ))}
                    </select>
                    {selectedStore && (
                      <div className="flex items-start gap-2 p-3 bg-green-500/10 rounded-lg border border-green-500/20">
                        <Icon name="CheckCircle" size={18} className="text-green-600 mt-0.5 flex-shrink-0" />
                        <p className="text-sm text-green-600 font-medium">{selectedStore}</p>
                      </div>
                    )}
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-primary/10 to-secondary/10 border-2 border-primary/20">
                  <CardHeader>
                    <CardTitle className="text-2xl">Итого</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between items-center text-lg">
                      <span>Товары ({cartItemsCount})</span>
                      <span className="font-semibold">{cartTotal.toLocaleString()} ₽</span>
                    </div>
                    <div className="flex justify-between items-center text-lg border-t pt-4">
                      <span className="font-semibold">Начислим кэшбек (3%)</span>
                      <Badge variant="secondary" className="text-lg py-1 px-3">
                        +{cartCashback.toLocaleString()} ₽
                      </Badge>
                    </div>
                    <div className="p-4 bg-blue-500/10 rounded-lg border border-blue-500/20">
                      <div className="flex items-center gap-2 mb-2">
                        <Icon name="Wallet" size={20} className="text-blue-600" />
                        <p className="font-semibold text-blue-600">Оплата при получении</p>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Вы оплачиваете заказ наличными или картой при самовывозе в магазине
                      </p>
                    </div>
                    <div className="flex justify-between items-center text-2xl font-bold border-t pt-4">
                      <span>К оплате</span>
                      <span className="text-primary">{cartTotal.toLocaleString()} ₽</span>
                    </div>
                    <Button
                      size="lg"
                      className="w-full text-lg"
                      disabled={!selectedStore}
                      onClick={() => {
                        const message = `Здравствуйте! Хочу оформить заказ:\n\nТовары:\n${cart.map(item => `${item.product.name} — ${item.quantity} шт. × ${item.product.price} ₽`).join('\n')}\n\nИтого: ${cartTotal.toLocaleString()} ₽\nКэшбек: +${cartCashback} ₽\n\nМагазин для самовывоза:\n${selectedStore}\n\nОплата при получении`;
                        window.open(`https://t.me/nobodystillhere?text=${encodeURIComponent(message)}`, '_blank');
                      }}
                    >
                      <Icon name="MessageCircle" size={20} className="mr-2" />
                      Оформить заказ
                    </Button>
                    {!selectedStore && (
                      <p className="text-sm text-amber-600 text-center">
                        ⚠️ Выберите магазин для самовывоза
                      </p>
                    )}
                    <p className="text-sm text-muted-foreground text-center">
                      Менеджер уточнит наличие и подтвердит заказ
                    </p>
                  </CardContent>
                </Card>
              </>
            )}
          </div>
        )}

        {activeSection === 'contacts' && (
          <div className="space-y-6 animate-fade-in">
            <h2 className="text-3xl font-bold">Контакты</h2>

            <Card className="border-2 border-blue-500/20 bg-gradient-to-br from-blue-500/5 to-blue-600/5">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Icon name="MessageCircle" size={24} className="text-blue-600" />
                  <CardTitle>Связь с менеджером</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-muted-foreground">
                  Для заказа и консультации свяжитесь с нашим менеджером в Telegram
                </p>
                <Button 
                  size="lg" 
                  className="w-full bg-blue-600 hover:bg-blue-700"
                  onClick={() => window.open('https://t.me/nobodystillhere', '_blank')}
                >
                  <Icon name="MessageCircle" size={20} className="mr-2" />
                  @nobodystillhere
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Icon name="Mail" size={24} className="text-primary" />
                  <CardTitle>Обратная связь</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-muted-foreground">
                  По вопросам брака или недовольства товаром:
                </p>
                <a href="mailto:ispanov08@gmail.com" className="flex items-center gap-2 text-primary hover:underline">
                  <Icon name="Mail" size={18} />
                  ispanov08@gmail.com
                </a>
              </CardContent>
            </Card>

            <div>
              <h3 className="text-2xl font-bold mb-4">Точки самовывоза</h3>
              <div className="space-y-3">
                {stores.map((store, index) => (
                  <Card key={index} className="hover:shadow-md transition-shadow">
                    <CardContent className="pt-4">
                      <div className="flex items-start gap-3">
                        <Icon name="MapPin" size={20} className="text-primary mt-1 flex-shrink-0" />
                        <div>
                          <p className="font-semibold">{store.name}</p>
                          <p className="text-sm text-muted-foreground">{store.address}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            <Card className="bg-gradient-to-br from-amber-500/10 to-amber-600/5 border-2 border-amber-500/20">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Icon name="Wrench" size={24} className="text-amber-600" />
                  <CardTitle>{serviceCenter.name}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-2">{serviceCenter.description}</p>
                <div className="flex items-start gap-2">
                  <Icon name="MapPin" size={18} className="text-amber-600 mt-0.5 flex-shrink-0" />
                  <p className="font-medium">{serviceCenter.address}</p>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeSection === 'profile' && (
          <div className="space-y-6 animate-fade-in max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold">Личный кабинет</h2>

            <Card className="border-2 border-primary/20">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Icon name="Wallet" size={24} className="text-primary" />
                    <CardTitle>Мой кэшбек</CardTitle>
                  </div>
                  <div className="text-3xl font-bold text-primary">
                    {userCashback} ₽
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-green-500/10 rounded-lg border border-green-500/20">
                  <div className="flex items-center gap-2 mb-2">
                    <Icon name="Info" size={18} className="text-green-600" />
                    <p className="font-semibold text-green-600">Как работает кэшбек?</p>
                  </div>
                  <ul className="text-sm text-muted-foreground space-y-1 ml-6 list-disc">
                    <li>С каждой покупки возвращается 3% на ваш счёт</li>
                    <li>Кэшбек можно использовать для оплаты следующих заказов</li>
                    <li>Накопленные средства не сгорают</li>
                  </ul>
                </div>

                <div className="space-y-2">
                  <h4 className="font-semibold">Примеры начисления:</h4>
                  <div className="grid gap-2">
                    <div className="flex justify-between p-3 bg-muted rounded">
                      <span className="text-muted-foreground">Покупка на 5 000 ₽</span>
                      <Badge variant="secondary">+150 ₽</Badge>
                    </div>
                    <div className="flex justify-between p-3 bg-muted rounded">
                      <span className="text-muted-foreground">Покупка на 10 000 ₽</span>
                      <Badge variant="secondary">+300 ₽</Badge>
                    </div>
                    <div className="flex justify-between p-3 bg-muted rounded">
                      <span className="text-muted-foreground">Покупка на 20 000 ₽</span>
                      <Badge variant="secondary">+600 ₽</Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>История покупок</CardTitle>
              </CardHeader>
              <CardContent className="text-center py-8">
                <Icon name="ShoppingBag" size={48} className="mx-auto mb-3 text-muted-foreground" />
                <p className="text-muted-foreground">История покупок пока пуста</p>
              </CardContent>
            </Card>
          </div>
        )}
      </main>

      <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border z-50">
        <div className="container mx-auto px-2">
          <div className="flex justify-around items-center h-16">
            <Button
              variant={activeSection === 'home' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setActiveSection('home')}
              className="flex flex-col h-auto py-2 px-3"
            >
              <Icon name="Home" size={20} />
              <span className="text-xs mt-1">Главная</span>
            </Button>
            <Button
              variant={activeSection === 'catalog' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setActiveSection('catalog')}
              className="flex flex-col h-auto py-2 px-3"
            >
              <Icon name="ShoppingBag" size={20} />
              <span className="text-xs mt-1">Каталог</span>
            </Button>
            <Button
              variant={activeSection === 'cart' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setActiveSection('cart')}
              className="flex flex-col h-auto py-2 px-3 relative"
            >
              <Icon name="ShoppingCart" size={20} />
              <span className="text-xs mt-1">Корзина</span>
              {cartItemsCount > 0 && (
                <Badge className="absolute top-1 right-1 h-4 w-4 flex items-center justify-center p-0 text-xs">
                  {cartItemsCount}
                </Badge>
              )}
            </Button>
            <Button
              variant={activeSection === 'profile' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setActiveSection('profile')}
              className="flex flex-col h-auto py-2 px-3"
            >
              <Icon name="User" size={20} />
              <span className="text-xs mt-1">Профиль</span>
            </Button>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Index;