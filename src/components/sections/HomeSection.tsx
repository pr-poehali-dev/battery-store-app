import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

interface HomeSectionProps {
  userCashback: number;
  brands: string[];
  vibrate: (pattern: number | number[]) => void;
  setActiveSection: (section: string) => void;
}

const HomeSection = ({ userCashback, brands, vibrate, setActiveSection }: HomeSectionProps) => {
  return (
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
            Компания "Мир Аккумуляторов" основана в 1998 году. В наших магазинах представлен широкий ассортимент 
            аккумуляторных батарей от 1 Ач до 240 Ач для легкового и грузового транспорта, мотоциклов, снегоходов 
            и гидроциклов, складской и уборочной техники.
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
  );
};

export default HomeSection;
