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
  );
};

export default ContactsSection;
