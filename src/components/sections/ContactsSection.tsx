import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

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
          <Button 
            size="lg" 
            className="w-full bg-blue-600 hover:bg-blue-700"
            onClick={() => window.open('https://t.me/nobodystillhere', '_blank')}
          >
            <Icon name="MessageCircle" size={20} className="mr-2" />
            @nobodystillhere
          </Button>
          <div className="pt-2 border-t border-border/50 space-y-2">
            <p className="text-sm text-muted-foreground font-medium">Телефоны:</p>
            <a 
              href="tel:+74212461041" 
              className="flex items-center gap-2 text-primary hover:underline"
            >
              <Icon name="Phone" size={18} />
              <span>+7 (4212) 46-10-41 <span className="text-xs text-muted-foreground">(для юр. лиц)</span></span>
            </a>
          </div>
          <div className="pt-2 border-t border-border/50 space-y-2">
            <p className="text-sm text-muted-foreground font-medium">Время работы:</p>
            <div className="flex items-start gap-2 text-sm">
              <Icon name="Clock" size={18} className="flex-shrink-0 mt-0.5" />
              <div>
                <p>Пн-Пт: 09:00 - 19:00</p>
                <p>Сб-Вс: 09:00 - 18:00</p>
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
          <a href="mailto:ispanov08@gmail.com" className="flex items-center gap-2 text-primary hover:underline">
            <Icon name="Mail" size={18} />
            ispanov08@gmail.com
          </a>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-slate-700 to-slate-800 text-white border-0 overflow-hidden">
        <CardContent className="pt-16 pb-8 px-6 text-center relative">
          <div className="absolute top-8 left-1/2 -translate-x-1/2">
            <div className="w-20 h-20 rounded-full bg-blue-500/20 flex items-center justify-center">
              <Icon name="MapPin" size={48} className="text-blue-400" />
            </div>
          </div>
          <h3 className="text-3xl font-bold mb-4 mt-8">Точки самовывоза</h3>
          <p className="text-lg text-slate-300 mb-8">6 магазинов в Хабаровске для удобного самовывоза</p>
          <Button 
            size="lg" 
            className="w-full max-w-md mx-auto bg-slate-600 hover:bg-slate-500 text-white border-2 border-slate-500 text-lg py-6 rounded-2xl"
          >
            Смотреть адреса
          </Button>
        </CardContent>
      </Card>

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
  );
};

export default ContactsSection;