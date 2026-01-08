import { Card, CardContent } from '@/components/ui/card';

const StoresMap = () => {
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-0">
        <div className="relative w-full h-[400px] bg-muted">
          <iframe
            src="https://yandex.ru/map-widget/v1/?ll=135.0838%2C48.4808&z=12&l=map&pt=135.0838,48.4808,pm2rdm~135.0820,48.4790,pm2rdm~135.1100,48.5100,pm2rdm~135.1050,48.4550,pm2rdm~135.0680,48.4650,pm2rdm~135.1300,48.4400,pm2rdm"
            width="100%"
            height="400"
            frameBorder="0"
            allowFullScreen
            style={{ position: 'relative' }}
            title="Карта магазинов"
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default StoresMap;
