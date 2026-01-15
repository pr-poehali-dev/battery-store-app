import { Card, CardContent } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

const FooterInfo = () => {
  return (
    <Card className="bg-gradient-to-br from-blue-500/10 via-green-500/10 to-blue-500/10 border-blue-300/30">
      <CardContent className="pt-6 pb-6">
        <div className="text-center space-y-4">
          <a 
            href="mailto:miraccum@mail.ru"
            className="flex items-center justify-center gap-2 text-blue-600 hover:text-blue-700 transition-colors"
          >
            <Icon name="Mail" size={16} />
            <span className="text-sm font-medium">miraccum@mail.ru</span>
          </a>
          <div>
            <div className="flex items-center justify-center gap-2">
              <Icon name="Copyright" size={16} className="text-blue-600" />
              <p className="text-sm font-semibold text-blue-900">2026 Мир Аккумуляторов</p>
            </div>
            <p className="text-xs text-blue-700 mt-1 font-medium">Все права защищены</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default FooterInfo;