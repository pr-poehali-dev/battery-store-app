import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [subscriptions, setSubscriptions] = useState({
    newProducts: true,
    promotions: true,
    events: false,
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
    }, 1500);
  };

  if (isSubmitted) {
    return (
      <Card className="border-primary/20">
        <CardContent className="pt-6">
          <div className="flex flex-col items-center text-center py-8">
            <div className="bg-primary/10 rounded-full p-4 mb-4">
              <Icon name="CheckCircle" size={48} className="text-primary" />
            </div>
            <h3 className="text-2xl font-bold mb-2">Подписка оформлена!</h3>
            <p className="text-muted-foreground mb-6">
              Мы отправили письмо на <strong>{email}</strong>
              <br />
              Подтвердите подписку, перейдя по ссылке в письме
            </p>
            <Button
              onClick={() => {
                setIsSubmitted(false);
                setEmail('');
                setName('');
              }}
              variant="outline"
            >
              <Icon name="RotateCcw" size={18} className="mr-2" />
              Оформить ещё одну подписку
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-primary/10 p-3 rounded-full">
              <Icon name="Bell" size={28} className="text-primary" />
            </div>
            <div>
              <CardTitle className="text-2xl">Подписка на новинки</CardTitle>
              <CardDescription className="text-base">
                Узнавайте первыми о новых товарах и акциях
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">Ваше имя</Label>
              <Input
                id="name"
                type="text"
                placeholder="Иван"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email адрес</Label>
              <Input
                id="email"
                type="email"
                placeholder="example@mail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="space-y-4">
              <Label className="text-base font-semibold">О чём присылать уведомления?</Label>
              
              <div className="space-y-3">
                <div className="flex items-start space-x-3 p-3 rounded-lg border">
                  <Checkbox
                    id="newProducts"
                    checked={subscriptions.newProducts}
                    onCheckedChange={(checked) =>
                      setSubscriptions({ ...subscriptions, newProducts: checked as boolean })
                    }
                  />
                  <div className="flex-1">
                    <Label htmlFor="newProducts" className="cursor-pointer">
                      <div className="flex items-center gap-2 font-medium">
                        <Icon name="Smartphone" size={18} className="text-primary" />
                        Новые товары
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        iPhone, iPad, MacBook и другие устройства Apple
                      </p>
                    </Label>
                  </div>
                </div>

                <div className="flex items-start space-x-3 p-3 rounded-lg border">
                  <Checkbox
                    id="promotions"
                    checked={subscriptions.promotions}
                    onCheckedChange={(checked) =>
                      setSubscriptions({ ...subscriptions, promotions: checked as boolean })
                    }
                  />
                  <div className="flex-1">
                    <Label htmlFor="promotions" className="cursor-pointer">
                      <div className="flex items-center gap-2 font-medium">
                        <Icon name="Tag" size={18} className="text-primary" />
                        Акции и скидки
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        Специальные предложения и распродажи
                      </p>
                    </Label>
                  </div>
                </div>

                <div className="flex items-start space-x-3 p-3 rounded-lg border">
                  <Checkbox
                    id="events"
                    checked={subscriptions.events}
                    onCheckedChange={(checked) =>
                      setSubscriptions({ ...subscriptions, events: checked as boolean })
                    }
                  />
                  <div className="flex-1">
                    <Label htmlFor="events" className="cursor-pointer">
                      <div className="flex items-center gap-2 font-medium">
                        <Icon name="Calendar" size={18} className="text-primary" />
                        События и презентации
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        Анонсы Apple и мероприятия в магазинах
                      </p>
                    </Label>
                  </div>
                </div>
              </div>
            </div>

            <Button type="submit" className="w-full" size="lg" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Icon name="Loader2" size={18} className="mr-2 animate-spin" />
                  Оформляем подписку...
                </>
              ) : (
                <>
                  <Icon name="Mail" size={18} className="mr-2" />
                  Подписаться на новинки
                </>
              )}
            </Button>

            <p className="text-xs text-muted-foreground text-center">
              Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности
            </p>
          </form>
        </CardContent>
      </Card>

      <Card className="bg-muted/50">
        <CardContent className="pt-6">
          <div className="flex gap-4">
            <Icon name="Gift" size={24} className="text-primary flex-shrink-0" />
            <div>
              <h4 className="font-semibold mb-1">Бонус за подписку</h4>
              <p className="text-sm text-muted-foreground">
                Получите промокод на скидку 5% на первую покупку сразу после подтверждения email
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
