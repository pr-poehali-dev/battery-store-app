import { useState, useEffect } from 'react';
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

interface User {
  phone: string;
  firstName: string;
  lastName: string;
  cashback: number;
}

const Index = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [authStep, setAuthStep] = useState<'phone' | 'code' | 'register'>('phone');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [activeSection, setActiveSection] = useState('home');
  const [searchQuery, setSearchQuery] = useState('');
  const [priceRange, setPriceRange] = useState([0, 50000]);
  const [selectedCar, setSelectedCar] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedStore, setSelectedStore] = useState('');
  const [showInstallPrompt, setShowInstallPrompt] = useState(false);

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      try {
        const userData = JSON.parse(savedUser);
        if (userData && userData.phone && userData.firstName) {
          setUser(userData);
        } else {
          localStorage.removeItem('user');
        }
      } catch (e) {
        localStorage.removeItem('user');
      }
    }

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

  const handleSendCode = async () => {
    if (!phoneNumber || phoneNumber.length < 10) {
      alert('Введите корректный номер телефона');
      return;
    }
    vibrate(50);
    
    const savedUsers = JSON.parse(localStorage.getItem('users') || '{}');
    const isExistingUser = !!savedUsers[phoneNumber];
    
    try {
      const response = await fetch('https://functions.poehali.dev/56bac5a6-91d6-4585-9512-489b5f3b2518', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'send', phone: phoneNumber })
      });

      const data = await response.json();

      if (data.success) {
        if (data.dev_code) {
          alert(`Код для входа (режим разработки): ${data.dev_code}`);
        }
        
        if (isExistingUser) {
          setAuthStep('code');
        } else {
          setAuthStep('register');
        }
      } else {
        alert(data.error || 'Ошибка отправки кода');
      }
    } catch (error) {
      console.error('SMS error:', error);
      alert('Ошибка отправки SMS. Проверьте подключение.');
    }
  };

  const handleVerifyCode = async () => {
    if (!verificationCode || verificationCode.length !== 4) {
      alert('Введите 4-значный код');
      return;
    }
    
    vibrate(50);
    
    try {
      const response = await fetch('https://functions.poehali.dev/56bac5a6-91d6-4585-9512-489b5f3b2518', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'verify', phone: phoneNumber, code: verificationCode })
      });

      const data = await response.json();

      if (data.success) {
        const savedUsers = JSON.parse(localStorage.getItem('users') || '{}');
        const userData = savedUsers[phoneNumber];
        
        if (userData) {
          setUser(userData);
          localStorage.setItem('user', JSON.stringify(userData));
        } else {
          alert('Пользователь не найден');
        }
      } else {
        alert(data.error || 'Неверный код');
      }
    } catch (error) {
      console.error('Verify error:', error);
      alert('Ошибка проверки кода');
    }
  };

  const handleRegister = () => {
    if (!firstName || !lastName) {
      alert('Заполните имя и фамилию');
      return;
    }
    vibrate(50);
    const newUser: User = {
      phone: phoneNumber,
      firstName,
      lastName,
      cashback: 0
    };
    const savedUsers = JSON.parse(localStorage.getItem('users') || '{}');
    savedUsers[phoneNumber] = newUser;
    localStorage.setItem('users', JSON.stringify(savedUsers));
    localStorage.setItem('user', JSON.stringify(newUser));
    setUser(newUser);
    setIsAuthenticating(false);
  };

  const handleLogout = () => {
    vibrate([30, 50]);
    localStorage.removeItem('user');
    setUser(null);
    setCart([]);
  };

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
      name: 'ZVEFBA 80-З-R (85D23L)',
      brand: 'ZV',
      price: 9750,
      voltage: '12V',
      capacity: '80Ah',
      current: '680A',
      category: 'Азиатские',
      compatible: ['Toyota Camry', 'Honda Accord', 'Mazda 6', 'Nissan Teana'],
      image: '🔋'
    },
    {
      id: 2,
      name: 'ZVК 100-З-R',
      brand: 'ZV',
      price: 13150,
      voltage: '12V',
      capacity: '100Ah',
      current: '850A',
      category: 'Грузовые',
      compatible: ['Toyota Land Cruiser', 'Nissan Patrol', 'Mitsubishi Pajero', 'УАЗ Патриот'],
      image: '⚡'
    },
    {
      id: 3,
      name: 'ZVKА 58-З-R (75B24L)',
      brand: 'ZV',
      price: 6450,
      voltage: '12V',
      capacity: '58Ah',
      current: '520A',
      category: 'Азиатские',
      compatible: ['Toyota Corolla', 'Honda Civic', 'Mazda 3', 'Suzuki Swift'],
      image: '🔋'
    },
    {
      id: 4,
      name: 'ZVEFB 60-З-R',
      brand: 'ZV',
      price: 9050,
      voltage: '12V',
      capacity: '60Ah',
      current: '560A',
      category: 'EFB',
      compatible: ['Volkswagen Polo', 'Skoda Rapid', 'Toyota Corolla', 'Hyundai Solaris'],
      image: '🔌'
    },
    {
      id: 5,
      name: 'DUOPА 50-З-R-k (60B24L)',
      brand: 'Duo',
      price: 5500,
      voltage: '12V',
      capacity: '50Ah',
      current: '480A',
      category: 'Азиатские',
      compatible: ['Nissan Note', 'Mazda Demio', 'Honda Fit', 'Suzuki SX4'],
      image: '🔋'
    },
    {
      id: 6,
      name: 'ARCTIC ASIA 6CT-65.0 VL',
      brand: 'Arctic',
      price: 11300,
      voltage: '12V',
      capacity: '65Ah',
      current: '640A',
      category: 'Азиатские премиум',
      compatible: ['Toyota RAV4', 'Nissan X-Trail', 'Mazda CX-5', 'Subaru Forester'],
      image: '❄️'
    },
    {
      id: 7,
      name: 'Rocket SMF 65Ah (75D23L)',
      brand: 'Rocket',
      price: 8650,
      voltage: '12V',
      capacity: '65Ah',
      current: '580A',
      category: 'Азиатские',
      compatible: ['Toyota Camry', 'Honda CR-V', 'Nissan Murano', 'Mazda 6'],
      image: '🚀'
    },
    {
      id: 8,
      name: 'Varta Blue Dynamic D59 60Ah',
      brand: 'Varta',
      price: 8990,
      voltage: '12V',
      capacity: '60Ah',
      current: '540A',
      category: 'Европейские',
      compatible: ['Volkswagen Polo', 'Ford Focus', 'Renault Logan', 'Chevrolet Cruze'],
      image: '🔵'
    },
    {
      id: 9,
      name: 'Mutlu Calcium Silver 75Ah',
      brand: 'Mutlu',
      price: 9850,
      voltage: '12V',
      capacity: '75Ah',
      current: '720A',
      category: 'Европейские',
      compatible: ['Volkswagen Tiguan', 'Kia Sportage', 'Hyundai Tucson', 'Skoda Octavia'],
      image: '⚡'
    },
    {
      id: 10,
      name: 'Titan Arctic 62Ah',
      brand: 'Titan',
      price: 7450,
      voltage: '12V',
      capacity: '62Ah',
      current: '620A',
      category: 'Российские',
      compatible: ['Lada Vesta', 'Lada Granta', 'Renault Duster', 'Hyundai Solaris'],
      image: '🔋'
    },
    {
      id: 11,
      name: 'Titan Euro Silver 76Ah',
      brand: 'Titan',
      price: 8950,
      voltage: '12V',
      capacity: '76Ah',
      current: '760A',
      category: 'Европейские',
      compatible: ['Volkswagen Passat', 'BMW 3-Series', 'Audi A4', 'Mercedes C-Class'],
      image: '⚡'
    },
    {
      id: 12,
      name: 'Solite 85Ah (105D31L)',
      brand: 'Solite',
      price: 10900,
      voltage: '12V',
      capacity: '85Ah',
      current: '750A',
      category: 'Азиатские',
      compatible: ['Toyota Land Cruiser Prado', 'Mitsubishi Pajero Sport', 'Nissan Pathfinder'],
      image: '⚡'
    },
    {
      id: 13,
      name: 'FB 7000 55B24L 50Ah',
      brand: 'FB',
      price: 6200,
      voltage: '12V',
      capacity: '50Ah',
      current: '470A',
      category: 'Азиатские',
      compatible: ['Toyota Corolla', 'Honda Civic', 'Nissan Tiida', 'Mazda 3'],
      image: '🔋'
    },
    {
      id: 14,
      name: 'Tubor Aquatech 90Ah',
      brand: 'Tubor',
      price: 9990,
      voltage: '12V',
      capacity: '90Ah',
      current: '850A',
      category: 'Европейские',
      compatible: ['BMW X5', 'Audi Q7', 'Mercedes GLE', 'Volkswagen Touareg'],
      image: '💧'
    },
    {
      id: 15,
      name: 'Volt Standard 55Ah',
      brand: 'Volt',
      price: 5990,
      voltage: '12V',
      capacity: '55Ah',
      current: '460A',
      category: 'Российские',
      compatible: ['Lada Kalina', 'Lada Priora', 'Chevrolet Niva', 'Daewoo Nexia'],
      image: '🔋'
    },
    {
      id: 16,
      name: 'Varta Silver Dynamic AGM 70Ah',
      brand: 'Varta',
      price: 18900,
      voltage: '12V',
      capacity: '70Ah',
      current: '760A',
      category: 'AGM',
      compatible: ['BMW X3', 'Audi Q5', 'Mercedes GLC', 'Porsche Macan'],
      image: '⚡'
    },
    {
      id: 17,
      name: 'Mutlu EFB 80Ah',
      brand: 'Mutlu',
      price: 12900,
      voltage: '12V',
      capacity: '80Ah',
      current: '800A',
      category: 'EFB',
      compatible: ['Volkswagen Passat', 'Skoda Superb', 'BMW 3-Series', 'Audi A4'],
      image: '🔌'
    },
    {
      id: 18,
      name: 'Аком 60Ah',
      brand: 'Аком',
      price: 6850,
      voltage: '12V',
      capacity: '60Ah',
      current: '520A',
      category: 'Российские',
      compatible: ['Lada Vesta', 'Renault Logan', 'Hyundai Solaris', 'Kia Rio'],
      image: '🔋'
    },
    {
      id: 19,
      name: 'Tyumen Battery 64Ah',
      brand: 'Tyumen',
      price: 7200,
      voltage: '12V',
      capacity: '64Ah',
      current: '590A',
      category: 'Российские',
      compatible: ['УАЗ Патриот', 'Chevrolet Niva', 'Lada 4x4', 'Газель'],
      image: '🔋'
    },
    {
      id: 20,
      name: 'Bosch S4 005 60Ah',
      brand: 'Bosch',
      price: 9500,
      voltage: '12V',
      capacity: '60Ah',
      current: '540A',
      category: 'Европейские',
      compatible: ['Volkswagen Golf', 'Ford Focus', 'Opel Astra', 'Peugeot 308'],
      image: '🔵'
    },
    {
      id: 21,
      name: 'Carku X4 Пусковое устройство',
      brand: 'Carku',
      price: 8990,
      voltage: '12V',
      capacity: '12000mAh',
      current: '600A',
      category: 'Пусковые устройства',
      compatible: ['Универсальное'],
      image: '🔧'
    },
    {
      id: 22,
      name: 'Vtoman Jump 600',
      brand: 'Vtoman',
      price: 12990,
      voltage: '12V',
      capacity: '15000mAh',
      current: '800A',
      category: 'Пусковые устройства',
      compatible: ['Универсальное'],
      image: '🔧'
    },
    {
      id: 23,
      name: 'R drive One Зарядное',
      brand: 'R drive',
      price: 5490,
      voltage: '12V/24V',
      capacity: '—',
      current: '10A',
      category: 'Зарядные устройства',
      compatible: ['Универсальное'],
      image: '🔌'
    }
  ];

  const brands = [
    'ZV', 'Duo', 'Arctic', 'Rocket', 'Varta', 'Mutlu', 
    'Titan', 'Solite', 'FB', 'Tubor', 'Volt', 'Аком', 
    'Tyumen', 'Bosch', 'Carku', 'Vtoman', 'R drive'
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
  const categories = Array.from(new Set(products.map(p => p.category))).sort();

  const filteredProducts = products.filter(product => {
    const matchesSearch = 
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.brand.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
    
    const matchesCar = !selectedCar || 
      selectedCar === 'all' || 
      product.compatible.includes(selectedCar) ||
      product.compatible.includes('Универсальное');
    
    const matchesCategory = !selectedCategory || product.category === selectedCategory;
    
    return matchesSearch && matchesPrice && matchesCar && matchesCategory;
  });

  const resetFilters = () => {
    setSearchQuery('');
    setPriceRange([0, 50000]);
    setSelectedCar('');
    setSelectedCategory('');
  };

  const getCategoryBadge = (category: string) => {
    const badges: Record<string, { icon: string; color: string; label: string }> = {
      'Азиатские': { icon: '🌏', color: 'bg-blue-500/10 text-blue-600 border-blue-500/20', label: 'Азия' },
      'Азиатские премиум': { icon: '⭐', color: 'bg-purple-500/10 text-purple-600 border-purple-500/20', label: 'Премиум' },
      'Европейские': { icon: '🇪🇺', color: 'bg-green-500/10 text-green-600 border-green-500/20', label: 'Европа' },
      'Российские': { icon: '🇷🇺', color: 'bg-red-500/10 text-red-600 border-red-500/20', label: 'Россия' },
      'AGM': { icon: '⚡', color: 'bg-yellow-500/10 text-yellow-600 border-yellow-500/20', label: 'AGM' },
      'EFB': { icon: '🔌', color: 'bg-orange-500/10 text-orange-600 border-orange-500/20', label: 'EFB' },
      'Грузовые': { icon: '🚛', color: 'bg-gray-500/10 text-gray-600 border-gray-500/20', label: 'Грузовые' },
      'Пусковые устройства': { icon: '🔧', color: 'bg-cyan-500/10 text-cyan-600 border-cyan-500/20', label: 'Пусковое' },
      'Зарядные устройства': { icon: '🔋', color: 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20', label: 'Зарядное' }
    };
    return badges[category] || { icon: '🔋', color: 'bg-gray-500/10 text-gray-600 border-gray-500/20', label: category };
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
  const userCashback = user ? user.cashback : 0;

  if (!user) {
    return (
      <AuthScreen
        authStep={authStep}
        phoneNumber={phoneNumber}
        setPhoneNumber={setPhoneNumber}
        verificationCode={verificationCode}
        setVerificationCode={setVerificationCode}
        firstName={firstName}
        setFirstName={setFirstName}
        lastName={lastName}
        setLastName={setLastName}
        handleSendCode={handleSendCode}
        handleVerifyCode={handleVerifyCode}
        handleRegister={handleRegister}
        setAuthStep={setAuthStep}
      />
    );
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
                {cartItemsCount > 0 && (
                  <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs">
                    {cartItemsCount}
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
            filteredProducts={filteredProducts}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            priceRange={priceRange}
            setPriceRange={setPriceRange}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            selectedCar={selectedCar}
            setSelectedCar={setSelectedCar}
            categories={categories}
            allCars={allCars}
            resetFilters={resetFilters}
            getCategoryBadge={getCategoryBadge}
            addToCart={addToCart}
          />
        )}

        {activeSection === 'cart' && (
          <CartSection
            cart={cart}
            cartTotal={cartTotal}
            cartCashback={cartCashback}
            cartItemsCount={cartItemsCount}
            selectedStore={selectedStore}
            setSelectedStore={setSelectedStore}
            stores={stores}
            removeFromCart={removeFromCart}
            updateQuantity={updateQuantity}
            setActiveSection={setActiveSection}
          />
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