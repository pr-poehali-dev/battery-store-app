import { Card, CardContent } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

const FooterInfo = () => {
  return (
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
  );
};

export default FooterInfo;
