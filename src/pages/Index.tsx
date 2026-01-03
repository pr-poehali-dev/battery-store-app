import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';

const Index = () => {
  const [activeSection, setActiveSection] = useState('home');

  const products = [
    { 
      id: 1, 
      name: 'Автомобильный аккумулятор', 
      category: 'Аккумуляторы',
      price: '5 990 ₽',
      bonus: 599,
      image: '⚡'
    },
    { 
      id: 2, 
      name: 'Зарядное устройство', 
      category: 'Зарядка',
      price: '2 490 ₽',
      bonus: 249,
      image: '🔌'
    },
    { 
      id: 3, 
      name: 'Электрическая газонокосилка', 
      category: 'Садовая техника',
      price: '12 990 ₽',
      bonus: 1299,
      image: '🌿'
    },
    { 
      id: 4, 
      name: 'Аккумулятор для инструмента', 
      category: 'Аккумуляторы',
      price: '3 490 ₽',
      bonus: 349,
      image: '🔋'
    },
    { 
      id: 5, 
      name: 'Портативная зарядка', 
      category: 'Зарядка',
      price: '1 990 ₽',
      bonus: 199,
      image: '⚙️'
    },
    { 
      id: 6, 
      name: 'Триммер электрический', 
      category: 'Садовая техника',
      price: '4 990 ₽',
      bonus: 499,
      image: '🔧'
    }
  ];

  const stores = [
    { name: 'ТЦ "Вертикаль"', address: 'ул. Тихоокеанская, 113' },
    { name: 'ТЦ "Самбери"', address: 'ул. Волочаевская, 118' },
    { name: 'Центральный рынок', address: 'ул. Муравьёва-Амурского, 18' },
    { name: 'Южный', address: 'ул. Серышева, 24' },
    { name: 'Северный', address: 'ул. Краснореченская, 92' },
    { name: 'Промышленный', address: 'ул. Промышленная, 8' }
  ];

  const brands = [
    'Bosch', 'Varta', 'Exide', 'Mutlu', 'Topla', 'Аком', 'Тюмень',
    'Titan', 'Atlas', 'Delkor', 'Medalist', 'Banner', 'Зверь', 'Furukawa', 'Panasonic'
  ];

  const services = [
    { 
      title: 'Сервисный центр', 
      description: 'Диагностика, ремонт и обслуживание аккумуляторов',
      icon: 'Wrench'
    },
    { 
      title: 'Доставка СДЭК', 
      description: 'Отправка в любой город России',
      icon: 'Truck'
    },
    { 
      title: 'Подбор аккумулятора', 
      description: 'Персональный менеджер поможет выбрать нужную модель',
      icon: 'Search'
    },
    { 
      title: 'Гарантия качества', 
      description: 'Официальная гарантия на всю продукцию',
      icon: 'Shield'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80 border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="text-4xl animate-pulse-glow">⚡</div>
              <div>
                <h1 className="text-2xl font-bold text-primary">Мир Аккумуляторов</h1>
                <p className="text-sm text-muted-foreground">С 1998 года в Хабаровске</p>
              </div>
            </div>
            <nav className="hidden md:flex gap-6">
              <Button 
                variant={activeSection === 'home' ? 'default' : 'ghost'}
                onClick={() => setActiveSection('home')}
              >
                Главная
              </Button>
              <Button 
                variant={activeSection === 'catalog' ? 'default' : 'ghost'}
                onClick={() => setActiveSection('catalog')}
              >
                Каталог
              </Button>
              <Button 
                variant={activeSection === 'loyalty' ? 'default' : 'ghost'}
                onClick={() => setActiveSection('loyalty')}
              >
                Лояльность
              </Button>
              <Button 
                variant={activeSection === 'services' ? 'default' : 'ghost'}
                onClick={() => setActiveSection('services')}
              >
                Услуги
              </Button>
              <Button 
                variant={activeSection === 'contacts' ? 'default' : 'ghost'}
                onClick={() => setActiveSection('contacts')}
              >
                Контакты
              </Button>
            </nav>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {activeSection === 'home' && (
          <div className="space-y-16 animate-fade-in">
            <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary/20 via-secondary/10 to-accent/20 p-12 text-center">
              <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNiIgc3Ryb2tlPSJyZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMSkiLz48L2c+PC9zdmc+')] opacity-20" />
              <div className="relative z-10">
                <h2 className="text-5xl font-bold mb-4">Энергия для вашей жизни</h2>
                <p className="text-xl text-muted-foreground mb-8">
                  Надёжные аккумуляторы и оборудование с 1998 года
                </p>
                <div className="flex flex-wrap gap-4 justify-center">
                  <Badge variant="secondary" className="text-lg py-2 px-4">
                    <Icon name="Building2" size={20} className="mr-2" />
                    6 магазинов в Хабаровске
                  </Badge>
                  <Badge variant="secondary" className="text-lg py-2 px-4">
                    <Icon name="Award" size={20} className="mr-2" />
                    15+ брендов
                  </Badge>
                  <Badge variant="secondary" className="text-lg py-2 px-4">
                    <Icon name="Users" size={20} className="mr-2" />
                    Тысячи постоянных клиентов
                  </Badge>
                </div>
              </div>
            </section>

            <section>
              <h3 className="text-3xl font-bold mb-6 text-center">Популярные бренды</h3>
              <div className="flex flex-wrap gap-3 justify-center">
                {brands.map((brand) => (
                  <Badge 
                    key={brand} 
                    variant="outline" 
                    className="text-base py-2 px-4 hover:bg-primary hover:text-primary-foreground transition-all cursor-pointer"
                  >
                    {brand}
                  </Badge>
                ))}
              </div>
            </section>

            <section className="text-center">
              <h3 className="text-3xl font-bold mb-4">О компании</h3>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-6">
                "Мир Аккумуляторов" работает с 1998 года, обеспечивая жителей Хабаровска 
                качественными аккумуляторами, зарядными устройствами и садовой техникой. 
                У нас 6 магазинов по всему городу, собственный сервисный центр и доставка 
                по всей России через СДЭК. Мы ценим каждого клиента и предлагаем 
                выгодную систему лояльности с накоплением бонусов.
              </p>
              <Button 
                size="lg" 
                className="text-lg"
                onClick={() => setActiveSection('contacts')}
              >
                <Icon name="MessageCircle" size={20} className="mr-2" />
                Связаться с менеджером
              </Button>
            </section>
          </div>
        )}

        {activeSection === 'catalog' && (
          <div className="space-y-8 animate-fade-in">
            <div className="text-center">
              <h2 className="text-4xl font-bold mb-4">Каталог товаров</h2>
              <p className="text-lg text-muted-foreground">
                От зарядных устройств до садовой техники
              </p>
            </div>

            <Tabs defaultValue="all" className="w-full">
              <TabsList className="grid w-full max-w-md mx-auto grid-cols-4">
                <TabsTrigger value="all">Все</TabsTrigger>
                <TabsTrigger value="batteries">Аккумуляторы</TabsTrigger>
                <TabsTrigger value="chargers">Зарядка</TabsTrigger>
                <TabsTrigger value="garden">Садовая техника</TabsTrigger>
              </TabsList>

              <TabsContent value="all" className="mt-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {products.map((product) => (
                    <Card key={product.id} className="hover:shadow-xl transition-all hover:scale-105 cursor-pointer">
                      <CardHeader>
                        <div className="text-6xl mb-4 text-center">{product.image}</div>
                        <CardTitle>{product.name}</CardTitle>
                        <CardDescription>{product.category}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex justify-between items-center mb-4">
                          <span className="text-2xl font-bold text-primary">{product.price}</span>
                          <Badge variant="secondary">+{product.bonus} бонусов</Badge>
                        </div>
                        <Button className="w-full">
                          <Icon name="ShoppingCart" size={18} className="mr-2" />
                          Уточнить наличие
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="batteries" className="mt-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {products.filter(p => p.category === 'Аккумуляторы').map((product) => (
                    <Card key={product.id} className="hover:shadow-xl transition-all hover:scale-105 cursor-pointer">
                      <CardHeader>
                        <div className="text-6xl mb-4 text-center">{product.image}</div>
                        <CardTitle>{product.name}</CardTitle>
                        <CardDescription>{product.category}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex justify-between items-center mb-4">
                          <span className="text-2xl font-bold text-primary">{product.price}</span>
                          <Badge variant="secondary">+{product.bonus} бонусов</Badge>
                        </div>
                        <Button className="w-full">
                          <Icon name="ShoppingCart" size={18} className="mr-2" />
                          Уточнить наличие
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="chargers" className="mt-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {products.filter(p => p.category === 'Зарядка').map((product) => (
                    <Card key={product.id} className="hover:shadow-xl transition-all hover:scale-105 cursor-pointer">
                      <CardHeader>
                        <div className="text-6xl mb-4 text-center">{product.image}</div>
                        <CardTitle>{product.name}</CardTitle>
                        <CardDescription>{product.category}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex justify-between items-center mb-4">
                          <span className="text-2xl font-bold text-primary">{product.price}</span>
                          <Badge variant="secondary">+{product.bonus} бонусов</Badge>
                        </div>
                        <Button className="w-full">
                          <Icon name="ShoppingCart" size={18} className="mr-2" />
                          Уточнить наличие
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="garden" className="mt-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {products.filter(p => p.category === 'Садовая техника').map((product) => (
                    <Card key={product.id} className="hover:shadow-xl transition-all hover:scale-105 cursor-pointer">
                      <CardHeader>
                        <div className="text-6xl mb-4 text-center">{product.image}</div>
                        <CardTitle>{product.name}</CardTitle>
                        <CardDescription>{product.category}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex justify-between items-center mb-4">
                          <span className="text-2xl font-bold text-primary">{product.price}</span>
                          <Badge variant="secondary">+{product.bonus} бонусов</Badge>
                        </div>
                        <Button className="w-full">
                          <Icon name="ShoppingCart" size={18} className="mr-2" />
                          Уточнить наличие
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        )}

        {activeSection === 'loyalty' && (
          <div className="space-y-8 animate-fade-in max-w-4xl mx-auto">
            <div className="text-center">
              <h2 className="text-4xl font-bold mb-4">Программа лояльности</h2>
              <p className="text-lg text-muted-foreground">
                Копите бонусы с каждой покупки и получайте скидки
              </p>
            </div>

            <Card className="bg-gradient-to-br from-primary/20 to-secondary/20">
              <CardHeader>
                <CardTitle className="text-2xl">Как работает программа?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="bg-primary text-primary-foreground rounded-full w-10 h-10 flex items-center justify-center font-bold text-xl flex-shrink-0">
                    1
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg mb-1">Совершайте покупки</h4>
                    <p className="text-muted-foreground">За каждые 100 ₽ начисляется 10 бонусов</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-primary text-primary-foreground rounded-full w-10 h-10 flex items-center justify-center font-bold text-xl flex-shrink-0">
                    2
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg mb-1">Накапливайте бонусы</h4>
                    <p className="text-muted-foreground">Бонусы хранятся бессрочно на вашем счету</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-primary text-primary-foreground rounded-full w-10 h-10 flex items-center justify-center font-bold text-xl flex-shrink-0">
                    3
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg mb-1">Получайте скидки</h4>
                    <p className="text-muted-foreground">1 бонус = 1 рубль скидки на следующую покупку</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid md:grid-cols-3 gap-4">
              <Card className="text-center">
                <CardHeader>
                  <div className="text-4xl mb-2">🥉</div>
                  <CardTitle>Бронзовый</CardTitle>
                  <CardDescription>До 10 000 бонусов</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">Базовое начисление бонусов</p>
                </CardContent>
              </Card>
              <Card className="text-center border-primary">
                <CardHeader>
                  <div className="text-4xl mb-2">🥈</div>
                  <CardTitle>Серебряный</CardTitle>
                  <CardDescription>10 000 - 50 000 бонусов</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">+5% к начислению бонусов</p>
                </CardContent>
              </Card>
              <Card className="text-center border-secondary">
                <CardHeader>
                  <div className="text-4xl mb-2">🥇</div>
                  <CardTitle>Золотой</CardTitle>
                  <CardDescription>От 50 000 бонусов</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">+10% к начислению бонусов</p>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {activeSection === 'services' && (
          <div className="space-y-8 animate-fade-in">
            <div className="text-center">
              <h2 className="text-4xl font-bold mb-4">Наши услуги</h2>
              <p className="text-lg text-muted-foreground">
                Полный спектр услуг для наших клиентов
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {services.map((service) => (
                <Card key={service.title} className="hover:shadow-xl transition-all">
                  <CardHeader>
                    <div className="flex items-center gap-4">
                      <div className="bg-primary/20 p-3 rounded-lg">
                        <Icon name={service.icon as any} size={32} className="text-primary" />
                      </div>
                      <div>
                        <CardTitle>{service.title}</CardTitle>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base">{service.description}</CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {activeSection === 'contacts' && (
          <div className="space-y-8 animate-fade-in">
            <div className="text-center">
              <h2 className="text-4xl font-bold mb-4">Контакты</h2>
              <p className="text-lg text-muted-foreground">
                6 магазинов в Хабаровске — выбирайте удобный для вас
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {stores.map((store, index) => (
                <Card key={index} className="hover:shadow-xl transition-all">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Icon name="MapPin" size={20} className="text-primary" />
                      {store.name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">{store.address}</p>
                    <Button variant="outline" className="w-full">
                      <Icon name="Navigation" size={16} className="mr-2" />
                      Проложить маршрут
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card className="max-w-2xl mx-auto bg-gradient-to-br from-primary/10 to-secondary/10">
              <CardHeader>
                <CardTitle className="text-2xl text-center">Персональный менеджер</CardTitle>
                <CardDescription className="text-center text-base">
                  Наш специалист поможет подобрать нужный товар и уточнит наличие
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button size="lg" className="w-full text-lg" variant="default">
                  <Icon name="Send" size={20} className="mr-2" />
                  Написать в Telegram
                </Button>
                <Button size="lg" className="w-full text-lg" variant="outline">
                  <Icon name="Mail" size={20} className="mr-2" />
                  Отправить жалобу на почту
                </Button>
              </CardContent>
            </Card>

            <div className="text-center space-y-4 pt-8">
              <h3 className="text-2xl font-bold">Отзывы о нас</h3>
              <div className="flex flex-wrap gap-3 justify-center">
                <Badge variant="outline" className="text-base py-2 px-4">
                  <Icon name="Star" size={16} className="mr-2 text-yellow-500" />
                  2ГИС
                </Badge>
                <Badge variant="outline" className="text-base py-2 px-4">
                  <Icon name="Star" size={16} className="mr-2 text-yellow-500" />
                  Яндекс.Карты
                </Badge>
                <Badge variant="outline" className="text-base py-2 px-4">
                  <Icon name="Star" size={16} className="mr-2 text-yellow-500" />
                  Farpost
                </Badge>
              </div>
            </div>
          </div>
        )}
      </main>

      <footer className="border-t border-border mt-16 py-8">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p className="mb-2">© 1998-2026 Мир Аккумуляторов. Все права защищены.</p>
          <p className="text-sm">Хабаровск • 6 магазинов • Доставка по России</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
