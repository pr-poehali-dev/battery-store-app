import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import Icon from '@/components/ui/icon';

interface CartItem {
  product: typeof products[0];
  quantity: number;
}

const Index = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [userBonus, setUserBonus] = useState(3240);
  const [searchQuery, setSearchQuery] = useState('');
  const [cart, setCart] = useState<CartItem[]>([]);

  const products = [
    { 
      id: 1, 
      name: 'Bosch S4 60Ah 540A', 
      category: 'Автомобильные',
      subcategory: 'Легковые',
      price: 5990,
      voltage: '12V',
      capacity: '60Ah',
      current: '540A',
      image: '🔋',
      brand: 'Bosch'
    },
    { 
      id: 2, 
      name: 'Varta Blue Dynamic 74Ah 680A', 
      category: 'Автомобильные',
      subcategory: 'Легковые',
      price: 7490,
      voltage: '12V',
      capacity: '74Ah',
      current: '680A',
      image: '🔋',
      brand: 'Varta'
    },
    { 
      id: 3, 
      name: 'Mutlu 100Ah 850A', 
      category: 'Автомобильные',
      subcategory: 'Грузовые',
      price: 12990,
      voltage: '12V',
      capacity: '100Ah',
      current: '850A',
      image: '⚡',
      brand: 'Mutlu'
    },
    { 
      id: 4, 
      name: 'Тюмень 190Ah 1200A', 
      category: 'Автомобильные',
      subcategory: 'Грузовые',
      price: 18990,
      voltage: '12V',
      capacity: '190Ah',
      current: '1200A',
      image: '⚡',
      brand: 'Тюмень'
    },
    { 
      id: 5, 
      name: 'Exide AGM 12V 70Ah', 
      category: 'Специальные',
      subcategory: 'AGM',
      price: 14990,
      voltage: '12V',
      capacity: '70Ah',
      current: '760A',
      image: '🔌',
      brand: 'Exide'
    },
    { 
      id: 6, 
      name: 'Varta Silver Dynamic EFB 65Ah', 
      category: 'Специальные',
      subcategory: 'EFB',
      price: 11490,
      voltage: '12V',
      capacity: '65Ah',
      current: '650A',
      image: '🔌',
      brand: 'Varta'
    },
    { 
      id: 7, 
      name: 'Makita 18V 5.0Ah Li-Ion', 
      category: 'Инструментальные',
      subcategory: 'Электроинструмент',
      price: 4990,
      voltage: '18V',
      capacity: '5.0Ah',
      current: '—',
      image: '🔧',
      brand: 'Makita'
    },
    { 
      id: 8, 
      name: 'DeWalt 20V MAX 6.0Ah', 
      category: 'Инструментальные',
      subcategory: 'Электроинструмент',
      price: 5990,
      voltage: '20V',
      capacity: '6.0Ah',
      current: '—',
      image: '🔧',
      brand: 'DeWalt'
    },
    { 
      id: 9, 
      name: 'Bosch C3 (6V/12V 3.8A)', 
      category: 'Зарядные устройства',
      subcategory: 'Автомобильные',
      price: 3990,
      voltage: '6V/12V',
      capacity: '—',
      current: '3.8A',
      image: '🔌',
      brand: 'Bosch'
    },
    { 
      id: 10, 
      name: 'CTEK MXS 5.0 (12V 5A)', 
      category: 'Зарядные устройства',
      subcategory: 'Автомобильные',
      price: 7490,
      voltage: '12V',
      capacity: '—',
      current: '5A',
      image: '🔌',
      brand: 'CTEK'
    },
    { 
      id: 11, 
      name: 'Hyundai LE 4200 (1.6кВт)', 
      category: 'Садовая техника',
      subcategory: 'Газонокосилки',
      price: 12990,
      voltage: '220V',
      capacity: '—',
      current: '1.6кВт',
      image: '🌿',
      brand: 'Hyundai'
    },
    { 
      id: 12, 
      name: 'Makita DLM382Z (36V)', 
      category: 'Садовая техника',
      subcategory: 'Газонокосилки',
      price: 21990,
      voltage: '36V',
      capacity: 'Аккумуляторная',
      current: '—',
      image: '🌿',
      brand: 'Makita'
    },
    { 
      id: 13, 
      name: 'Аком 55Ah 460A', 
      category: 'Автомобильные',
      subcategory: 'Легковые',
      price: 4490,
      voltage: '12V',
      capacity: '55Ah',
      current: '460A',
      image: '🔋',
      brand: 'Аком'
    },
    { 
      id: 14, 
      name: 'Banner Running Bull EFB 70Ah', 
      category: 'Специальные',
      subcategory: 'EFB',
      price: 13490,
      voltage: '12V',
      capacity: '70Ah',
      current: '720A',
      image: '🔌',
      brand: 'Banner'
    },
    { 
      id: 15, 
      name: 'Bosch S5 A08 AGM 70Ah', 
      category: 'Специальные',
      subcategory: 'AGM',
      price: 15990,
      voltage: '12V',
      capacity: '70Ah',
      current: '760A',
      image: '🔌',
      brand: 'Bosch'
    },
    { 
      id: 16, 
      name: 'Зверь 132Ah 950A', 
      category: 'Автомобильные',
      subcategory: 'Грузовые',
      price: 14990,
      voltage: '12V',
      capacity: '132Ah',
      current: '950A',
      image: '⚡',
      brand: 'Зверь'
    },
    { 
      id: 17, 
      name: 'Milwaukee M18 B5 (18V 5.0Ah)', 
      category: 'Инструментальные',
      subcategory: 'Электроинструмент',
      price: 6490,
      voltage: '18V',
      capacity: '5.0Ah',
      current: '—',
      image: '🔧',
      brand: 'Milwaukee'
    },
    { 
      id: 18, 
      name: 'Berkut SP-8N (12V 8A)', 
      category: 'Зарядные устройства',
      subcategory: 'Автомобильные',
      price: 2490,
      voltage: '12V',
      capacity: '—',
      current: '8A',
      image: '🔌',
      brand: 'Berkut'
    }
  ];

  const categories = [
    { id: 'all', name: 'Все товары', icon: 'Grid3x3' },
    { id: 'Автомобильные', name: 'Автомобильные', icon: 'Car' },
    { id: 'Специальные', name: 'Специальные', icon: 'Zap' },
    { id: 'Инструментальные', name: 'Инструментальные', icon: 'Wrench' },
    { id: 'Зарядные устройства', name: 'Зарядные устройства', icon: 'BatteryCharging' },
    { id: 'Садовая техника', name: 'Садовая техника', icon: 'Leaf' }
  ];

  const stores = [
    { name: 'ТЦ "Вертикаль"', address: 'ул. Тихоокеанская, 113' },
    { name: 'ТЦ "Самбери"', address: 'ул. Волочаевская, 118' },
    { name: 'Центральный рынок', address: 'ул. Муравьёва-Амурского, 18' },
    { name: 'Южный', address: 'ул. Серышева, 24' },
    { name: 'Северный', address: 'ул. Краснореченская, 92' },
    { name: 'Промышленный', address: 'ул. Промышленная, 8' }
  ];

  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.brand.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const calculateBonus = (price: number) => Math.floor(price * 0.08);

  const nextLevelBonus = 10000;
  const bonusProgress = (userBonus / nextLevelBonus) * 100;

  const addToCart = (product: typeof products[0]) => {
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
    setCart(prev => prev.filter(item => item.product.id !== productId));
  };

  const updateQuantity = (productId: number, quantity: number) => {
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
  const cartBonuses = calculateBonus(cartTotal);
  const cartItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-8">
      <header className="sticky top-0 z-50 bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80 border-b border-border">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="text-3xl animate-pulse-glow">⚡</div>
              <div>
                <h1 className="text-xl md:text-2xl font-bold text-primary">Мир Аккумуляторов</h1>
                <p className="text-xs text-muted-foreground hidden md:block">С 1998 года в Хабаровске</p>
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
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setActiveSection('profile')}
                className="hidden md:flex"
              >
                <Icon name="User" size={18} className="mr-2" />
                {userBonus.toLocaleString()} бонусов
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        {activeSection === 'home' && (
          <div className="space-y-8 animate-fade-in">
            <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary/20 via-secondary/10 to-accent/20 p-8 md:p-12 text-center">
              <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNiIgc3Ryb2tlPSJyZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMSkiLz48L2c+PC9zdmc+')] opacity-20" />
              <div className="relative z-10">
                <h2 className="text-3xl md:text-5xl font-bold mb-4">Энергия для вашей жизни</h2>
                <p className="text-lg md:text-xl text-muted-foreground mb-6">
                  Надёжные аккумуляторы и оборудование с 1998 года
                </p>
                <div className="flex flex-wrap gap-3 justify-center">
                  <Badge variant="secondary" className="text-sm md:text-lg py-2 px-3 md:px-4">
                    <Icon name="Building2" size={18} className="mr-2" />
                    6 магазинов
                  </Badge>
                  <Badge variant="secondary" className="text-sm md:text-lg py-2 px-3 md:px-4">
                    <Icon name="Award" size={18} className="mr-2" />
                    15+ брендов
                  </Badge>
                  <Badge variant="secondary" className="text-sm md:text-lg py-2 px-3 md:px-4">
                    <Icon name="Percent" size={18} className="mr-2" />
                    8% кэшбэк
                  </Badge>
                </div>
              </div>
            </section>

            <section className="text-center space-y-4">
              <h3 className="text-2xl md:text-3xl font-bold">О компании</h3>
              <p className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto">
                "Мир Аккумуляторов" работает с 1998 года. У нас 6 магазинов в Хабаровске, 
                собственный сервисный центр и доставка по России через СДЭК. 
                Система лояльности 8% — получайте бонусы с каждой покупки!
              </p>
              <Button 
                size="lg" 
                onClick={() => setActiveSection('catalog')}
              >
                <Icon name="ShoppingBag" size={20} className="mr-2" />
                Перейти в каталог
              </Button>
            </section>
          </div>
        )}

        {activeSection === 'catalog' && (
          <div className="space-y-6 animate-fade-in">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Каталог товаров</h2>
              <Input 
                placeholder="Поиск по названию или бренду..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="max-w-md"
              />
            </div>

            <div className="flex gap-2 overflow-x-auto pb-2">
              {categories.map((cat) => (
                <Button
                  key={cat.id}
                  variant={selectedCategory === cat.id ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedCategory(cat.id)}
                  className="whitespace-nowrap"
                >
                  <Icon name={cat.icon as any} size={16} className="mr-2" />
                  {cat.name}
                </Button>
              ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {filteredProducts.map((product) => (
                <Card key={product.id} className="hover:shadow-xl transition-all hover:scale-105 cursor-pointer">
                  <CardHeader>
                    <div className="flex justify-between items-start mb-3">
                      <div className="text-5xl">{product.image}</div>
                      <Badge variant="outline">{product.brand}</Badge>
                    </div>
                    <CardTitle className="text-lg">{product.name}</CardTitle>
                    <CardDescription className="text-sm">{product.category} • {product.subcategory}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="grid grid-cols-3 gap-2 text-sm">
                      <div className="text-center p-2 bg-muted rounded">
                        <div className="font-semibold">{product.voltage}</div>
                        <div className="text-xs text-muted-foreground">Напряжение</div>
                      </div>
                      {product.capacity !== '—' && (
                        <div className="text-center p-2 bg-muted rounded">
                          <div className="font-semibold">{product.capacity}</div>
                          <div className="text-xs text-muted-foreground">Ёмкость</div>
                        </div>
                      )}
                      {product.current !== '—' && (
                        <div className="text-center p-2 bg-muted rounded">
                          <div className="font-semibold">{product.current}</div>
                          <div className="text-xs text-muted-foreground">Ток</div>
                        </div>
                      )}
                    </div>
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="text-2xl font-bold text-primary">{product.price.toLocaleString()} ₽</div>
                        <div className="text-xs text-muted-foreground">+{calculateBonus(product.price)} бонусов (8%)</div>
                      </div>
                    </div>
                    <Button 
                      className="w-full" 
                      size="sm"
                      onClick={() => addToCart(product)}
                    >
                      <Icon name="ShoppingCart" size={16} className="mr-2" />
                      В корзину
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-12">
                <Icon name="Search" size={48} className="mx-auto mb-4 text-muted-foreground" />
                <p className="text-lg text-muted-foreground">Товары не найдены</p>
              </div>
            )}
          </div>
        )}

        {activeSection === 'profile' && (
          <div className="space-y-6 animate-fade-in max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold">Личный кабинет</h2>

            <Card className="bg-gradient-to-br from-primary/20 to-secondary/20">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-2xl">Ваши бонусы</CardTitle>
                    <CardDescription>Программа лояльности 8%</CardDescription>
                  </div>
                  <div className="text-5xl">💎</div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="text-4xl font-bold text-primary mb-2">{userBonus.toLocaleString()} бонусов</div>
                  <p className="text-sm text-muted-foreground">= {userBonus.toLocaleString()} рублей скидки</p>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>До следующего уровня</span>
                    <span className="font-semibold">{(nextLevelBonus - userBonus).toLocaleString()} бонусов</span>
                  </div>
                  <Progress value={bonusProgress} className="h-2" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Как работает программа?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">
                    1
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Совершайте покупки</h4>
                    <p className="text-sm text-muted-foreground">За каждые 100 ₽ начисляется 8 бонусов</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">
                    2
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Накапливайте бонусы</h4>
                    <p className="text-sm text-muted-foreground">Бонусы хранятся бессрочно на вашем счету</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">
                    3
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Получайте скидки</h4>
                    <p className="text-sm text-muted-foreground">1 бонус = 1 рубль скидки на следующую покупку</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Примеры начисления</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                  <span className="text-sm">Покупка на 5 000 ₽</span>
                  <Badge variant="secondary">+400 бонусов</Badge>
                </div>
                <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                  <span className="text-sm">Покупка на 10 000 ₽</span>
                  <Badge variant="secondary">+800 бонусов</Badge>
                </div>
                <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                  <span className="text-sm">Покупка на 20 000 ₽</span>
                  <Badge variant="secondary">+1 600 бонусов</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeSection === 'cart' && (
          <div className="space-y-6 animate-fade-in max-w-3xl mx-auto">
            <div className="flex items-center justify-between">
              <h2 className="text-3xl md:text-4xl font-bold">Корзина</h2>
              {cartItemsCount > 0 && (
                <Badge variant="secondary" className="text-lg">{cartItemsCount} товаров</Badge>
              )}
            </div>

            {cart.length === 0 ? (
              <Card className="text-center py-12">
                <CardContent>
                  <Icon name="ShoppingCart" size={64} className="mx-auto mb-4 text-muted-foreground" />
                  <h3 className="text-xl font-semibold mb-2">Корзина пуста</h3>
                  <p className="text-muted-foreground mb-6">Добавьте товары из каталога</p>
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
                              </div>
                              <Button 
                                variant="ghost" 
                                size="sm"
                                onClick={() => removeFromCart(item.product.id)}
                              >
                                <Icon name="Trash2" size={18} className="text-destructive" />
                              </Button>
                            </div>
                            <div className="flex items-center justify-between">
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
                                <div className="text-xs text-muted-foreground">
                                  +{calculateBonus(item.product.price * item.quantity)} бонусов
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <Card className="bg-gradient-to-br from-primary/10 to-secondary/10">
                  <CardHeader>
                    <CardTitle className="text-2xl">Итого</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between items-center text-lg">
                      <span>Товары ({cartItemsCount})</span>
                      <span className="font-semibold">{cartTotal.toLocaleString()} ₽</span>
                    </div>
                    <div className="flex justify-between items-center text-lg border-t pt-4">
                      <span className="font-semibold">Начислим бонусов (8%)</span>
                      <Badge variant="secondary" className="text-lg py-1 px-3">
                        +{cartBonuses.toLocaleString()}
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center text-2xl font-bold border-t pt-4">
                      <span>К оплате</span>
                      <span className="text-primary">{cartTotal.toLocaleString()} ₽</span>
                    </div>
                    <Button size="lg" className="w-full text-lg">
                      <Icon name="MessageCircle" size={20} className="mr-2" />
                      Связаться с менеджером
                    </Button>
                    <p className="text-sm text-muted-foreground text-center">
                      Менеджер уточнит наличие и оформит заказ
                    </p>
                  </CardContent>
                </Card>
              </>
            )}
          </div>
        )}

        {activeSection === 'contacts' && (
          <div className="space-y-6 animate-fade-in">
            <div className="text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Контакты</h2>
              <p className="text-lg text-muted-foreground">
                6 магазинов в Хабаровске — выбирайте удобный для вас
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {stores.map((store, index) => (
                <Card key={index} className="hover:shadow-xl transition-all">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <Icon name="MapPin" size={18} className="text-primary" />
                      {store.name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-3">{store.address}</p>
                    <Button variant="outline" className="w-full" size="sm">
                      <Icon name="Navigation" size={14} className="mr-2" />
                      Проложить маршрут
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card className="max-w-2xl mx-auto bg-gradient-to-br from-primary/10 to-secondary/10">
              <CardHeader>
                <CardTitle className="text-xl text-center">Персональный менеджер</CardTitle>
                <CardDescription className="text-center">
                  Наш специалист поможет подобрать товар и уточнит наличие
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button size="lg" className="w-full">
                  <Icon name="Send" size={18} className="mr-2" />
                  Написать в Telegram
                </Button>
                <Button size="lg" className="w-full" variant="outline">
                  <Icon name="Mail" size={18} className="mr-2" />
                  Отправить жалобу на почту
                </Button>
              </CardContent>
            </Card>
          </div>
        )}
      </main>

      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-card border-t border-border md:hidden">
        <div className="grid grid-cols-4 gap-1 p-2">
          <Button
            variant={activeSection === 'home' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setActiveSection('home')}
            className="flex flex-col h-auto py-2"
          >
            <Icon name="Home" size={20} />
            <span className="text-xs mt-1">Главная</span>
          </Button>
          <Button
            variant={activeSection === 'catalog' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setActiveSection('catalog')}
            className="flex flex-col h-auto py-2"
          >
            <Icon name="ShoppingBag" size={20} />
            <span className="text-xs mt-1">Каталог</span>
          </Button>
          <Button
            variant={activeSection === 'profile' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setActiveSection('profile')}
            className="flex flex-col h-auto py-2"
          >
            <Icon name="User" size={20} />
            <span className="text-xs mt-1">Профиль</span>
          </Button>
          <Button
            variant={activeSection === 'cart' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setActiveSection('cart')}
            className="flex flex-col h-auto py-2 relative"
          >
            <Icon name="ShoppingCart" size={20} />
            <span className="text-xs mt-1">Корзина</span>
            {cartItemsCount > 0 && (
              <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs">
                {cartItemsCount}
              </Badge>
            )}
          </Button>
        </div>
      </nav>

      <footer className="border-t border-border mt-16 py-6 hidden md:block">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p className="mb-2">© 1998-2026 Мир Аккумуляторов. Все права защищены.</p>
          <p className="text-sm">Хабаровск • 6 магазинов • Доставка СДЭК по России • Кэшбэк 8%</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;