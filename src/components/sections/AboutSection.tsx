import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

const AboutSection = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <Card className="border-primary/20">
        <CardHeader className="text-center">
          <div className="mx-auto w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
            <Icon name="Battery" size={32} className="text-primary" />
          </div>
          <CardTitle className="text-2xl">О компании</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-3 text-center">
            <h3 className="text-xl font-semibold text-primary">Мир Аккумуляторов</h3>
            <p className="text-muted-foreground">
              Работаем с 1998 года в Хабаровске
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="bg-primary/5 border-primary/20">
              <CardContent className="pt-6 text-center">
                <Icon name="Award" size={32} className="mx-auto mb-3 text-primary" />
                <h4 className="font-semibold mb-2">26+ лет опыта</h4>
                <p className="text-sm text-muted-foreground">
                  Работаем с аккумуляторами с 1998 года
                </p>
              </CardContent>
            </Card>

            <Card className="bg-primary/5 border-primary/20">
              <CardContent className="pt-6 text-center">
                <Icon name="MapPin" size={32} className="mx-auto mb-3 text-primary" />
                <h4 className="font-semibold mb-2">6 магазинов</h4>
                <p className="text-sm text-muted-foreground">
                  Удобные точки продаж по всему городу
                </p>
              </CardContent>
            </Card>

            <Card className="bg-primary/5 border-primary/20">
              <CardContent className="pt-6 text-center">
                <Icon name="Wrench" size={32} className="mx-auto mb-3 text-primary" />
                <h4 className="font-semibold mb-2">Сервисный центр</h4>
                <p className="text-sm text-muted-foreground">
                  Профессиональное обслуживание АКБ
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Icon name="CheckCircle" size={20} className="text-primary" />
              Наши преимущества
            </h3>
            <div className="grid gap-3">
              <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                <Icon name="Zap" size={20} className="text-primary mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-medium">Широкий ассортимент</h4>
                  <p className="text-sm text-muted-foreground">
                    Аккумуляторы для всех типов автомобилей: азиатские, европейские, грузовые
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                <Icon name="ShieldCheck" size={20} className="text-primary mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-medium">Гарантия качества</h4>
                  <p className="text-sm text-muted-foreground">
                    Работаем только с проверенными брендами: Varta, Bosch, Mutlu, Solite и др.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                <Icon name="Headphones" size={20} className="text-primary mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-medium">Профессиональная консультация</h4>
                  <p className="text-sm text-muted-foreground">
                    Поможем подобрать аккумулятор под ваш автомобиль
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                <Icon name="Wrench" size={20} className="text-primary mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-medium">Установка и обслуживание</h4>
                  <p className="text-sm text-muted-foreground">
                    Бесплатная установка АКБ в наших магазинах и сервисном центре
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                <Icon name="Wallet" size={20} className="text-primary mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-medium">Система кэшбэка</h4>
                  <p className="text-sm text-muted-foreground">
                    Получайте бонусы с каждой покупки и используйте их для оплаты
                  </p>
                </div>
              </div>
            </div>
          </div>

          <Card className="bg-gradient-to-r from-primary/10 to-primary/5 border-primary/20">
            <CardContent className="pt-6">
              <div className="text-center space-y-3">
                <Icon name="Heart" size={32} className="mx-auto text-primary" />
                <h3 className="text-lg font-semibold">Доверие клиентов</h3>
                <p className="text-sm text-muted-foreground">
                  За 26 лет работы мы обслужили тысячи автомобилистов в Хабаровске 
                  и заслужили репутацию надежного партнера
                </p>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-3 pt-4 border-t">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Icon name="Phone" size={20} className="text-primary" />
              Свяжитесь с нами
            </h3>
            <div className="space-y-2 text-sm">
              <p className="flex items-center gap-2">
                <Icon name="MapPin" size={16} className="text-muted-foreground" />
                <span>Хабаровск, 6 магазинов по городу</span>
              </p>
              <p className="flex items-center gap-2">
                <Icon name="Clock" size={16} className="text-muted-foreground" />
                <span>Ежедневно с 9:00 до 20:00</span>
              </p>
              <p className="text-muted-foreground">
                Раздел "Контакты" для полной информации о наших магазинах
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AboutSection;
