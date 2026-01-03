import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import Icon from '@/components/ui/icon';

const Index = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [userCashback, setUserCashback] = useState(0);

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
            <Badge variant="secondary" className="hidden md:flex items-center gap-1">
              <Icon name="Wallet" size={14} />
              {userCashback} ₽
            </Badge>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 space-y-6">
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
              <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => setActiveSection('catalog')}>
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
            <h2 className="text-3xl font-bold">Каталог товаров</h2>
            <Card>
              <CardContent className="pt-6 text-center">
                <Icon name="Package" size={64} className="mx-auto mb-4 text-muted-foreground" />
                <p className="text-lg text-muted-foreground mb-4">
                  Каталог с ценами скоро появится
                </p>
                <Button onClick={() => setActiveSection('contacts')}>
                  <Icon name="MessageCircle" size={18} className="mr-2" />
                  Связаться с менеджером
                </Button>
              </CardContent>
            </Card>
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
                  onClick={() => window.open('https://t.me/your_manager_username', '_blank')}
                >
                  <Icon name="MessageCircle" size={20} className="mr-2" />
                  Написать в Telegram
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
              variant={activeSection === 'contacts' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setActiveSection('contacts')}
              className="flex flex-col h-auto py-2 px-3"
            >
              <Icon name="MapPin" size={20} />
              <span className="text-xs mt-1">Контакты</span>
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
