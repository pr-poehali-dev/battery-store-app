import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

const PromotionsSection = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <Card className="border-primary/20">
        <CardHeader className="text-center">
          <div className="mx-auto w-16 h-16 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 flex items-center justify-center mb-4">
            <Icon name="Sparkles" size={32} className="text-white" />
          </div>
          <CardTitle className="text-2xl">Акции 🤑</CardTitle>
          <p className="text-muted-foreground">Выгодные предложения для вас</p>
        </CardHeader>
        <CardContent className="space-y-6">
          <Card className="overflow-hidden border-2 border-primary/30 shadow-xl bg-gradient-to-br from-primary/5 to-background">
            <div className="relative">
              <img 
                src="https://cdn.poehali.dev/files/IMG_0796.jpeg" 
                alt="Акции Мир Аккумуляторов"
                className="w-full h-auto"
              />
            </div>
            <CardContent className="pt-6 space-y-4">
              <div className="space-y-3">
                <div className="flex items-start gap-3 p-4 rounded-lg bg-gradient-to-r from-red-500/10 to-orange-500/10 border border-red-500/20">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-red-500/20 flex items-center justify-center">
                    <Icon name="Gift" size={20} className="text-red-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg mb-1">Установка аккумулятора в подарок*</h3>
                    <p className="text-sm text-muted-foreground">
                      Купите аккумулятор — установим бесплатно!
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 rounded-lg bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
                    <Icon name="Recycle" size={20} className="text-green-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg mb-1">Живая тема!</h3>
                    <p className="text-sm text-muted-foreground">
                      Купим ваш старый аккумулятор — продадим новый и установим бесплатно
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-border">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Icon name="Info" size={14} />
                  <span>*Все условия акций уточняйте у менеджеров</span>
                </div>
              </div>

              <div className="flex gap-3">
                <Button 
                  className="flex-1 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70"
                  onClick={() => window.location.href = 'tel:+74212466688'}
                >
                  <Icon name="Phone" size={18} className="mr-2" />
                  Позвонить
                </Button>
                <Button 
                  variant="outline"
                  className="flex-1"
                  onClick={() => window.open('https://t.me/nobodystillhere', '_blank')}
                >
                  <Icon name="Send" size={18} className="mr-2" />
                  Телеграм
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border-blue-500/20">
            <CardContent className="pt-6">
              <div className="text-center space-y-3">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-blue-500/20">
                  <Icon name="Percent" size={28} className="text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold">Следите за новыми акциями!</h3>
                <p className="text-sm text-muted-foreground max-w-md mx-auto">
                  Мы регулярно запускаем специальные предложения и акции для наших клиентов
                </p>
              </div>
            </CardContent>
          </Card>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-blue-500/10 via-green-500/10 to-blue-500/10 border-blue-300/30">
        <CardContent className="pt-6 pb-6">
          <div className="text-center space-y-3">
            <div className="flex items-center justify-center gap-2 mb-3">
              <Icon name="ShieldCheck" size={24} className="text-blue-600" />
              <h3 className="text-sm font-semibold text-blue-900">Официальные представители</h3>
            </div>
            
            <div className="space-y-2">
              <div className="bg-white/80 backdrop-blur-sm rounded-lg px-4 py-2 border border-blue-200/50">
                <p className="text-sm font-medium text-blue-900">ИП ОВИС МАРК АЛЕКСАНДРОВИЧ</p>
              </div>
              <div className="bg-white/80 backdrop-blur-sm rounded-lg px-4 py-2 border border-green-200/50">
                <p className="text-sm font-medium text-green-900">ИП ИСРАИЛОВА ЮЛИЯ ВЛАДИМИРОВНА</p>
              </div>
            </div>
            
            <div className="mt-4 pt-4 border-t border-blue-200/50">
              <div className="flex items-center justify-center gap-2">
                <Icon name="Copyright" size={16} className="text-blue-600" />
                <p className="text-sm font-semibold text-blue-900">2026 Мир Аккумуляторов</p>
              </div>
              <p className="text-xs text-blue-700 mt-1 font-medium">Все права защищены</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PromotionsSection;