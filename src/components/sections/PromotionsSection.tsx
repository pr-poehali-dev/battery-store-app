import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import FooterInfo from '@/components/ui/FooterInfo';

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
                src="https://cdn.poehali.dev/projects/f99c8e4e-d4fc-41fa-8066-0aef1add9ef0/files/da6f4b8c-9659-41ce-9885-e38394da2a85.jpg" 
                alt="Акции Мир Аккумуляторов"
                className="w-full h-64 object-cover"
              />
            </div>
            <CardContent className="pt-6 space-y-4">
              <div className="space-y-3">
                <Card className="overflow-hidden border-2 border-red-500/30 shadow-lg">
                  <div className="relative h-48">
                    <img 
                      src="https://cdn.poehali.dev/projects/f99c8e4e-d4fc-41fa-8066-0aef1add9ef0/files/7ceded2a-6723-49b2-8a42-261fe0f7607b.jpg"
                      alt="Установка аккумулятора"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2 right-2 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                      БЕСПЛАТНО
                    </div>
                  </div>
                  <div className="p-4 bg-gradient-to-r from-red-500/10 to-orange-500/10 space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-red-500/20 flex items-center justify-center">
                        <Icon name="Gift" size={20} className="text-red-600" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg mb-2">Установка аккумулятора в подарок</h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          Установка аккумулятора в подкапотном пространстве а/м без снятия защитного кожуха, замены клемм и подключения сканера производится бесплатно, в порядке живой очереди.
                        </p>
                      </div>
                    </div>
                    
                    <div className="pl-13 space-y-2 text-sm">
                      <div className="flex items-start gap-2">
                        <Icon name="MapPin" size={16} className="text-red-600 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="font-medium">г. Хабаровск, ул. Павловича 11</p>
                          <p className="text-muted-foreground">Сервисный центр «Мир Аккумуляторов»</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-2">
                        <Icon name="Phone" size={16} className="text-red-600 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="font-medium">Справки по телефонам:</p>
                          <div className="flex flex-wrap gap-2 text-muted-foreground">
                            <a href="tel:+74212284242" className="hover:text-primary transition-colors">+7 (4212) 28-42-42</a>
                            <span>•</span>
                            <a href="tel:+74212465090" className="hover:text-primary transition-colors">+7 (4212) 46-50-90</a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>

                <Card className="overflow-hidden border-2 border-green-500/30 shadow-lg">
                  <div className="relative h-48">
                    <img 
                      src="https://cdn.poehali.dev/projects/f99c8e4e-d4fc-41fa-8066-0aef1add9ef0/files/0a0ad5b7-f4d1-418d-be6b-37c0e14c2c09.jpg"
                      alt="Обмен старого аккумулятора"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2 right-2 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                      ДО 100%
                    </div>
                  </div>
                  <div className="p-4 bg-gradient-to-r from-green-500/10 to-emerald-500/10 space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
                        <Icon name="Recycle" size={20} className="text-green-600" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg mb-2">Сдай старый аккумулятор и получи скидку до 100%</h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          на весь ассортимент из каталога
                        </p>
                      </div>
                    </div>

                    <div className="space-y-3 text-sm">
                      <div className="bg-white/60 rounded-lg p-3 space-y-2">
                        <div className="flex items-start gap-2">
                          <Icon name="Check" size={16} className="text-green-600 mt-0.5 flex-shrink-0" />
                          <p className="text-muted-foreground">
                            Предложение действует при покупке любого товара, представленного на сайте miraccum.ru и в магазинах «Мир Аккумуляторов»
                          </p>
                        </div>
                        <div className="flex items-start gap-2">
                          <Icon name="Check" size={16} className="text-green-600 mt-0.5 flex-shrink-0" />
                          <p className="text-muted-foreground">
                            Вы можете принести как 1, так и несколько б/у аккумуляторов
                          </p>
                        </div>
                        <div className="flex items-start gap-2">
                          <Icon name="Check" size={16} className="text-green-600 mt-0.5 flex-shrink-0" />
                          <p className="text-muted-foreground">
                            Максимальная сумма скидки составляет 100% от стоимости приобретаемого товара
                          </p>
                        </div>
                      </div>

                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                        <div className="flex items-start gap-2">
                          <Icon name="Lightbulb" size={16} className="text-blue-600 mt-0.5 flex-shrink-0" />
                          <div className="text-xs text-muted-foreground">
                            <p className="font-semibold text-blue-900 mb-1">Пример:</p>
                            <p>Вы принесли 2 б/у аккумулятора (по 1500₽ каждый) и покупаете товар на 3100₽. Скидка составит 3000₽</p>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-start gap-2 text-xs">
                          <Icon name="Info" size={14} className="text-amber-600 mt-0.5 flex-shrink-0" />
                          <p className="text-muted-foreground">
                            Сумма скидки не может превышать стоимость приобретаемых товаров
                          </p>
                        </div>
                        <div className="flex items-start gap-2 text-xs">
                          <Icon name="Info" size={14} className="text-amber-600 mt-0.5 flex-shrink-0" />
                          <p className="text-muted-foreground">
                            Скидка по дисконтной карте в этом случае не действует
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white/80 rounded-lg p-3 space-y-3">
                      <h4 className="font-semibold text-sm flex items-center gap-2">
                        <Icon name="DollarSign" size={16} className="text-green-600" />
                        Стоимость покупки Б/У аккумуляторов:
                      </h4>
                      <div className="space-y-2 text-xs">
                        <div className="flex justify-between p-2 bg-gray-50 rounded">
                          <span className="font-medium">МОТО (емкость 4-30 Ач)</span>
                          <span className="font-semibold">—</span>
                        </div>
                        <div className="flex justify-between p-2 bg-gray-50 rounded">
                          <span className="font-medium">B19, B24, L0, L1</span>
                          <span className="font-semibold text-green-700">400 руб.</span>
                        </div>
                        <div className="flex justify-between p-2 bg-gray-50 rounded">
                          <span className="font-medium">D23, D26, L2, L3, L4</span>
                          <span className="font-semibold text-green-700">600 руб.</span>
                        </div>
                        <div className="flex justify-between p-2 bg-gray-50 rounded">
                          <span className="font-medium">D31, D33, E41, L5, L6</span>
                          <span className="font-semibold text-green-700">800 руб.</span>
                        </div>
                        <div className="flex justify-between p-2 bg-gray-50 rounded">
                          <span className="font-medium">F51</span>
                          <span className="font-semibold text-green-700">1200 руб.</span>
                        </div>
                        <div className="flex justify-between p-2 bg-gray-50 rounded">
                          <span className="font-medium">G51, H52</span>
                          <span className="font-semibold text-green-700">1800 руб.</span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white/80 rounded-lg p-3">
                      <img 
                        src="https://cdn.poehali.dev/files/_4szhzN3Sbk.jpg"
                        alt="Таблица стоимости б/у аккумуляторов"
                        className="w-full rounded-lg"
                      />
                    </div>
                  </div>
                </Card>
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

      <FooterInfo />
    </div>
  );
};

export default PromotionsSection;