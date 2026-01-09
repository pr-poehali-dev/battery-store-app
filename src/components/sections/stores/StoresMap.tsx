import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

const StoresMap = () => {
  const openMap = () => {
    window.open('https://2gis.ru/khabarovsk/search/%D0%B0%D0%BA%D0%BA%D1%83%D0%BC%D1%83%D0%BB%D1%8F%D1%82%D0%BE%D1%80%D1%8B/rubricId/106', '_blank');
  };

  return (
    <Card className="overflow-hidden bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
      <CardContent className="p-8">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="w-20 h-20 rounded-full bg-white shadow-lg flex items-center justify-center">
            <Icon name="Map" size={40} className="text-blue-600" />
          </div>
          <div className="space-y-2">
            <h3 className="text-xl font-semibold text-gray-900">Посмотреть все магазины на карте</h3>
            <p className="text-sm text-gray-600">Откроется 2ГИС с полным списком наших точек продаж</p>
          </div>
          <Button 
            onClick={openMap}
            size="lg"
            className="mt-4"
          >
            <Icon name="ExternalLink" size={18} className="mr-2" />
            Открыть карту в 2ГИС
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default StoresMap;