import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import Icon from '@/components/ui/icon';
import FooterInfo from '@/components/ui/FooterInfo';

const AboutSection = () => {
  const [purchaseAmount, setPurchaseAmount] = useState('');
  const discountAmount = purchaseAmount ? (parseFloat(purchaseAmount) * 0.05).toFixed(2) : '0';

  return (
    <div className="space-y-6 animate-fade-in">
      <Card className="border-primary/20">
        <CardHeader className="text-center">
          <div className="mx-auto w-20 h-20 rounded-full bg-white flex items-center justify-center mb-4 shadow-lg">
            <img 
              src="https://cdn.poehali.dev/projects/f99c8e4e-d4fc-41fa-8066-0aef1add9ef0/files/013239c7-9c0d-4724-bad4-95fc4a5754c3.jpg" 
              alt="Мир Аккумуляторов"
              className="w-12 h-12 object-contain"
            />
          </div>
          <CardTitle className="text-2xl">О компании</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-3 text-center">
            <div className="flex items-center justify-center gap-3">
              <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center shadow">
                <img 
                  src="https://cdn.poehali.dev/projects/f99c8e4e-d4fc-41fa-8066-0aef1add9ef0/files/013239c7-9c0d-4724-bad4-95fc4a5754c3.jpg" 
                  alt="Лист"
                  className="w-6 h-6 object-contain"
                />
              </div>
              <h3 className="text-xl font-semibold text-primary italic">Мир Аккумуляторов</h3>
            </div>
            <p className="text-muted-foreground">
              Основана в 1998 году
            </p>
          </div>

          <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
            <p>
              Компания «Мир Аккумуляторов» была основана в 1998 году. В наших магазинах представлен широкий ассортимент аккумуляторных батарей от 1 Ач до 240 Ач для легкового и грузового транспорта, мотоциклов, снегоходов, гидроциклов и т. п.
            </p>
            <p>
              Батареи произведены по самым современным технологиям: AGM, EFB, Graphene, Nanogel, SiO2, Calcium+, TOP, ExMET, PowerPass, ChessPlate, CMF, T-Max, Magic Eye.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="bg-primary/5 border-primary/20">
              <CardContent className="pt-6 text-center">
                <Icon name="Award" size={32} className="mx-auto mb-3 text-primary" />
                <h4 className="font-semibold mb-2">25+ лет опыта</h4>
                <p className="text-sm text-muted-foreground">
                  Крупнейшая сеть в Хабаровском крае
                </p>
              </CardContent>
            </Card>

            <Card className="bg-primary/5 border-primary/20">
              <CardContent className="pt-6 text-center">
                <Icon name="MapPin" size={32} className="mx-auto mb-3 text-primary" />
                <h4 className="font-semibold mb-2">6 магазинов</h4>
                <p className="text-sm text-muted-foreground">
                  Удобные точки продаж по городу
                </p>
              </CardContent>
            </Card>

            <Card className="bg-primary/5 border-primary/20">
              <CardContent className="pt-6 text-center">
                <Icon name="Wrench" size={32} className="mx-auto mb-3 text-primary" />
                <h4 className="font-semibold mb-2">Сервисный центр</h4>
                <p className="text-sm text-muted-foreground">
                  Полный цикл обслуживания АКБ
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Icon name="Factory" size={20} className="text-primary" />
              Наши бренды
            </h3>
            <div className="grid gap-2">
              <div className="flex items-center gap-3 p-3 rounded-lg bg-white/80">
                <div className="w-52 h-24 flex-shrink-0 flex items-center justify-center">
                  <img 
                    src="https://cdn.poehali.dev/files/IMG_0814.png" 
                    alt="CARKU"
                    className="w-full h-full object-contain scale-125"
                  />
                </div>
                <div className="text-sm">
                  <span className="font-medium">CARKU</span> - Jiangxi Oursun New Energy Co., Ltd (КНР)
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-lg bg-white/80">
                <div className="w-36 h-16 flex-shrink-0 flex items-center justify-center">
                  <img 
                    src="https://cdn.poehali.dev/files/IMG_0817.jpeg" 
                    alt="TITAN"
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="text-sm">
                  <span className="font-medium">TITAN</span> - TUBOR, г. Бор (Нижегородская обл.)
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-lg bg-white/80">
                <div className="w-36 h-16 flex-shrink-0 flex items-center justify-center overflow-hidden">
                  <img 
                    src="https://cdn.poehali.dev/files/IMG_0819.jpeg" 
                    alt="ЗВЕРЬ"
                    className="w-full scale-[0.9]"
                    style={{ objectFit: 'contain', objectPosition: 'center' }}
                  />
                </div>
                <div className="text-sm">
                  <span className="font-medium">ЗВЕРЬ</span> - Актех, г. Свирск (Иркутская обл.)
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-lg bg-white/80">
                <div className="w-52 h-24 flex-shrink-0 flex items-center justify-center">
                  <img 
                    src="https://cdn.poehali.dev/projects/f99c8e4e-d4fc-41fa-8066-0aef1add9ef0/files/c9930e40-27fd-4ec6-a191-6991e35016dd.jpg" 
                    alt="VOLT"
                    className="w-full h-full object-contain scale-125"
                  />
                </div>
                <div className="text-sm">
                  <span className="font-medium">VOLT, GLADIATOR, CONTACT</span> - TUNGSTONE, г. Рязань
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Icon name="Star" size={20} className="text-primary" />
              Почему выбирают нас?
            </h3>
            <div className="grid gap-3">
              <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                <Icon name="TrendingUp" size={20} className="text-primary mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-medium">Крупнейшая сеть в крае</h4>
                  <p className="text-sm text-muted-foreground">
                    Мы являемся крупнейшей оптово-розничной сетью по продаже аккумуляторных батарей в Хабаровском крае
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                <Icon name="Calendar" size={20} className="text-primary mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-medium">Более 25 лет опыта</h4>
                  <p className="text-sm text-muted-foreground">
                    Занимаемся продажей аккумуляторных батарей с 1998 года
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                <Icon name="Headphones" size={20} className="text-primary mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-medium">Профессиональные консультации</h4>
                  <p className="text-sm text-muted-foreground">
                    Поможем выбрать аккумулятор, который подходит именно вашему транспортному средству
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                <Icon name="Wrench" size={20} className="text-primary mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-medium">Специализированный сервис</h4>
                  <p className="text-sm text-muted-foreground">
                    Собственный сервисный центр: проверка качества с актом, зарядка, установка на ТС, проверка электрооборудования
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Icon name="Star" size={20} className="text-amber-500" />
              О нас пишут в популярных сервисах 🔝
            </h3>
            <div className="grid gap-3">
              <a
                href="https://2gis.ru/khabarovsk/geo/4926340373423463"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 rounded-lg bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/20 hover:border-blue-500/40 transition-all hover:shadow-lg"
              >
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center">
                  <Icon name="MapPin" size={24} className="text-blue-600" />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-blue-700">2ГИС</h4>
                  <p className="text-sm text-muted-foreground">Исключительно положительные отзывы</p>
                </div>
                <Icon name="ExternalLink" size={20} className="text-blue-600" />
              </a>

              <a
                href="https://yandex.ru/maps/org/mir_akkumulyatorov/1011087748/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 rounded-lg bg-gradient-to-r from-red-500/10 to-orange-500/10 border border-red-500/20 hover:border-red-500/40 transition-all hover:shadow-lg"
              >
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-red-500/20 flex items-center justify-center">
                  <Icon name="MapPin" size={24} className="text-red-600" />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-red-700">Яндекс Карты</h4>
                  <p className="text-sm text-muted-foreground">Исключительно положительные отзывы</p>
                </div>
                <Icon name="ExternalLink" size={20} className="text-red-600" />
              </a>
            </div>
          </div>

          <Card className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 border-green-500/30 shadow-lg">
            <CardContent className="pt-6">
              <div className="text-center space-y-4">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-500/20">
                  <Icon name="Percent" size={32} className="text-green-600" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-green-700">Для постоянных клиентов!</h3>
                  <div className="inline-block px-4 py-2 bg-green-500/20 rounded-full">
                    <span className="text-2xl font-bold text-green-700">5% скидка</span>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground max-w-md mx-auto">
                  После первой покупки вы получаете постоянную скидку 5% на все товары!
                </p>

                <div className="pt-4 space-y-3 max-w-sm mx-auto">
                  <div className="text-left space-y-2">
                    <label className="text-sm font-medium text-green-700">
                      Калькулятор скидки
                    </label>
                    <div className="relative">
                      <Input
                        type="number"
                        placeholder="Сумма покупки"
                        value={purchaseAmount}
                        onChange={(e) => setPurchaseAmount(e.target.value)}
                        className="h-12 text-lg pr-12 border-green-500/30 focus:border-green-500"
                      />
                      <span className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground">
                        ₽
                      </span>
                    </div>
                  </div>

                  {purchaseAmount && parseFloat(purchaseAmount) > 0 && (
                    <div className="p-4 bg-green-500/20 rounded-lg space-y-2 animate-fade-in">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Ваша скидка:</span>
                        <span className="text-2xl font-bold text-green-700">
                          {discountAmount} ₽
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground text-center">
                        Эти деньги вернутся на ваш бонусный счет!
                      </p>
                    </div>
                  )}
                </div>

                <div className="pt-3">
                  <p className="text-base font-semibold text-primary">
                    Мир Аккумуляторов — давай зарабатывать вместе! 🚀
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-primary/10 to-primary/5 border-primary/20">
            <CardContent className="pt-6">
              <div className="text-center space-y-3">
                <Icon name="Heart" size={32} className="mx-auto text-primary" />
                <h3 className="text-lg font-semibold">Доверие тысяч клиентов</h3>
                <p className="text-sm text-muted-foreground">
                  За более чем 25 лет работы мы обслужили тысячи автомобилистов в Хабаровском крае и заслужили репутацию надежного партнера
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
              <a 
                href="tel:+74212454141" 
                className="flex items-center gap-2 p-3 rounded-lg bg-primary/5 hover:bg-primary/10 transition-colors"
              >
                <Icon name="Phone" size={16} className="text-primary" />
                <span className="font-semibold text-primary">+7 (4212) 45-41-41</span>
              </a>
              <p className="flex items-center gap-2">
                <Icon name="MapPin" size={16} className="text-muted-foreground" />
                <span>Хабаровск, 6 магазинов по городу</span>
              </p>
              <div className="flex items-start gap-2">
                <Icon name="Clock" size={16} className="text-muted-foreground mt-0.5" />
                <div>
                  <div>Пн-Пт: 09:00 - 19:00</div>
                  <div>Сб-Вс: 09:00 - 18:00</div>
                </div>
              </div>
              <p className="text-muted-foreground">
                Подробная информация в разделе "Профиль" → "Контакты"
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <FooterInfo />
    </div>
  );
};

export default AboutSection;