import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import FooterInfo from '@/components/ui/FooterInfo';

interface Store {
  name: string;
  address: string;
}

interface ServiceCenter {
  name: string;
  address: string;
  description: string;
}

interface ContactsSectionProps {
  stores: Store[];
  serviceCenter: ServiceCenter;
}

const ContactsSection = ({ stores, serviceCenter }: ContactsSectionProps) => {
  return (
    <div className="space-y-6 animate-fade-in">
      <h2 className="text-3xl font-bold">Контакты</h2>

      <Card className="border-2 border-blue-500/20 bg-gradient-to-br from-blue-500/5 to-blue-600/5">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Icon name="MessageCircle" size={24} className="text-blue-600" />
            <CardTitle>Связаться с нами</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          <p className="text-muted-foreground">
            Для заказа и консультации свяжитесь с нашим менеджером
          </p>
          <div className="space-y-2">
            <Button 
              size="lg" 
              variant="outline"
              className="w-full border-blue-600 text-blue-600 hover:bg-blue-50"
              onClick={() => window.open('https://t.me/awwskrr?text=Здравствуйте,%20мне%20нужна%20помощь!', '_blank')}
            >
              <div className="flex flex-col items-center gap-1">
                <div className="flex items-center gap-2">
                  <Icon name="MessageCircle" size={20} />
                  @awwskrr (менеджер) Александр
                </div>
                <span className="text-xs text-muted-foreground">(примерное время ответа 30 минут)</span>
              </div>
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="w-full border-blue-600 text-blue-600 hover:bg-blue-50"
              onClick={() => window.open('https://t.me/nobodystillhere?text=Здравствуйте,%20мне%20нужна%20помощь!', '_blank')}
            >
              <div className="flex flex-col items-center gap-1">
                <div className="flex items-center gap-2">
                  <Icon name="MessageCircle" size={20} />
                  @nobodystillhere (менеджер) Дмитрий
                </div>
                <span className="text-xs text-muted-foreground">(примерное время ответа 30 минут)</span>
              </div>
            </Button>
            <Button 
              size="lg" 
              className="w-full bg-blue-600 hover:bg-blue-700"
              onClick={() => window.open('https://t.me/mir_akkum_shop_bot', '_blank')}
            >
              <Icon name="Bot" size={20} className="mr-2" />
              Telegram-бот
            </Button>
          </div>
          <div className="pt-2 border-t border-border/50 space-y-2">
            <p className="text-sm text-muted-foreground font-medium">Телефоны:</p>
            <a 
              href="tel:+74212454141" 
              className="flex items-center gap-2 text-primary hover:underline"
            >
              <Icon name="Phone" size={18} />
              <span>+7 (4212) 45-41-41 <span className="text-xs text-muted-foreground">(для связи с магазином напрямую)</span></span>
            </a>
            <a 
              href="tel:+74212461041" 
              className="flex items-center gap-2 text-primary hover:underline"
            >
              <Icon name="Phone" size={18} />
              <span>+7 (4212) 46-10-41 <span className="text-xs text-muted-foreground">(для юр.лиц)</span></span>
            </a>
            <a 
              href="tel:+74212461041" 
              className="flex items-center gap-2 text-primary hover:underline"
            >
              <Icon name="Phone" size={18} />
              <span>+7 (4212) 46-10-41 <span className="text-xs text-muted-foreground">(для корпоративных продаж)</span></span>
            </a>
          </div>
          <div className="pt-2 border-t border-border/50 space-y-2">
            <p className="text-sm text-muted-foreground font-medium">Время работы:</p>
            <div className="flex items-start gap-2 text-sm">
              <Icon name="Clock" size={18} className="flex-shrink-0 mt-0.5" />
              <div>
                <p>Пн-Пт: 09:00 - 19:00</p>
                <p>Сб-Вс: 10:00 - 18:00</p>
              </div>
            </div>
          </div>
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
          <a href="mailto:info@miraccum.ru" className="flex items-center gap-2 text-primary hover:underline">
            <Icon name="Mail" size={18} />
            info@miraccum.ru
          </a>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Icon name="MapPin" size={24} className="text-primary" />
            <CardTitle>Наши магазины</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="p-3 bg-muted/30 rounded-lg">
              <p className="font-semibold mb-2">Ул. Павловича, 26</p>
              <div className="space-y-1 text-sm">
                <a href="tel:+74212454141" className="flex items-center gap-2 text-primary hover:underline">
                  <Icon name="Phone" size={16} />
                  +7 (4212) 45-41-41
                </a>
                <a href="tel:+74212461041" className="flex items-center gap-2 text-muted-foreground hover:underline">
                  <Icon name="Phone" size={16} />
                  +7 (4212) 46-10-41 <span className="text-xs">(для юр.лиц)</span>
                </a>
              </div>
            </div>

            <div className="p-3 bg-muted/30 rounded-lg">
              <p className="font-semibold mb-2">Ул. Павловича, 11</p>
              <div className="space-y-1 text-sm">
                <a href="tel:+74212459999" className="flex items-center gap-2 text-primary hover:underline">
                  <Icon name="Phone" size={16} />
                  +7 (4212) 45-99-99
                </a>
                <a href="tel:+74212461041" className="flex items-center gap-2 text-muted-foreground hover:underline">
                  <Icon name="Phone" size={16} />
                  +7 (4212) 46-10-41 <span className="text-xs">(для юр.лиц)</span>
                </a>
              </div>
            </div>

            <div className="p-3 bg-muted/30 rounded-lg">
              <p className="font-semibold mb-2">Ул. Суворова, 73</p>
              <div className="space-y-1 text-sm">
                <a href="tel:+74212974141" className="flex items-center gap-2 text-primary hover:underline">
                  <Icon name="Phone" size={16} />
                  +7 (4212) 97-41-41
                </a>
                <a href="tel:+74212461041" className="flex items-center gap-2 text-muted-foreground hover:underline">
                  <Icon name="Phone" size={16} />
                  +7 (4212) 46-10-41 <span className="text-xs">(для юр.лиц)</span>
                </a>
              </div>
            </div>

            <div className="p-3 bg-muted/30 rounded-lg">
              <p className="font-semibold mb-2">Ул. Воронежская, 66</p>
              <div className="space-y-1 text-sm">
                <a href="tel:+74212284141" className="flex items-center gap-2 text-primary hover:underline">
                  <Icon name="Phone" size={16} />
                  +7 (4212) 28-41-41
                </a>
                <a href="tel:+74212461041" className="flex items-center gap-2 text-muted-foreground hover:underline">
                  <Icon name="Phone" size={16} />
                  +7 (4212) 46-10-41 <span className="text-xs">(для юр.лиц)</span>
                </a>
              </div>
            </div>

            <div className="p-3 bg-muted/30 rounded-lg">
              <p className="font-semibold mb-2">Проспект 60-летия Октября, 154</p>
              <div className="space-y-1 text-sm">
                <a href="tel:+74212284545" className="flex items-center gap-2 text-primary hover:underline">
                  <Icon name="Phone" size={16} />
                  +7 (4212) 28-45-45
                </a>
                <a href="tel:+74212461041" className="flex items-center gap-2 text-muted-foreground hover:underline">
                  <Icon name="Phone" size={16} />
                  +7 (4212) 46-10-41 <span className="text-xs">(для юр.лиц)</span>
                </a>
              </div>
            </div>

            <div className="p-3 bg-muted/30 rounded-lg">
              <p className="font-semibold mb-2">Ул. Краснореченская, 149</p>
              <div className="space-y-1 text-sm">
                <a href="tel:+74212474141" className="flex items-center gap-2 text-primary hover:underline">
                  <Icon name="Phone" size={16} />
                  +7 (4212) 47-41-41
                </a>
                <a href="tel:+74212461041" className="flex items-center gap-2 text-muted-foreground hover:underline">
                  <Icon name="Phone" size={16} />
                  +7 (4212) 46-10-41 <span className="text-xs">(для юр.лиц)</span>
                </a>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-amber-500/10 to-amber-600/5 border-2 border-amber-500/20">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Icon name="Wrench" size={24} className="text-amber-600" />
            <CardTitle>Сервисный центр</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="space-y-2">
            <a href="tel:+74212284242" className="flex items-center gap-2 text-primary hover:underline">
              <Icon name="Phone" size={18} />
              +7 (4212) 28-42-42
            </a>
            <a href="tel:+74212465090" className="flex items-center gap-2 text-primary hover:underline">
              <Icon name="Phone" size={18} />
              +7 (4212) 46-50-90
            </a>
          </div>
        </CardContent>
      </Card>

      <Card className="border-2 border-primary/20">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Icon name="Mail" size={24} className="text-primary" />
            <CardTitle>Электронная почта</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <a href="mailto:info@miraccum.ru" className="flex items-center gap-2 text-primary hover:underline text-lg">
            <Icon name="Mail" size={20} />
            info@miraccum.ru
          </a>
        </CardContent>
      </Card>

      <FooterInfo />
    </div>
  );
};

export default ContactsSection;