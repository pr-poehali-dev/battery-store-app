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
              Мы - официальные дилеры
            </h3>
            <div className="grid gap-2">
              <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                <Icon name="CheckCircle" size={18} className="text-primary flex-shrink-0" />
                <div className="text-sm">
                  <span className="font-medium">CARKU</span> - Jiangxi Oursun New Energy Co., Ltd (КНР)
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                <Icon name="CheckCircle" size={18} className="text-primary flex-shrink-0" />
                <div className="text-sm">
                  <span className="font-medium">TITAN</span> - TUBOR, г. Бор (Нижегородская обл.)
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                <Icon name="CheckCircle" size={18} className="text-primary flex-shrink-0" />
                <div className="text-sm">
                  <span className="font-medium">ROCKET</span> - Global Battery Co., Ltd (Ю. Корея)
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                <Icon name="CheckCircle" size={18} className="text-primary flex-shrink-0" />
                <div className="text-sm">
                  <span className="font-medium">VOLT, GLADIATOR, CONTACT</span> - TUNGSTONE, г. Рязань
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                <Icon name="CheckCircle" size={18} className="text-primary flex-shrink-0" />
                <div className="text-sm">
                  <span className="font-medium">ENEUS</span> - DTR Corporation (Ю. Корея)
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
              <p className="flex items-center gap-2">
                <Icon name="MapPin" size={16} className="text-muted-foreground" />
                <span>Хабаровск, 6 магазинов по городу</span>
              </p>
              <p className="flex items-center gap-2">
                <Icon name="Clock" size={16} className="text-muted-foreground" />
                <span>Ежедневно с 9:00 до 20:00</span>
              </p>
              <p className="text-muted-foreground">
                Подробная информация в разделе "Профиль" → "Контакты"
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AboutSection;
