import { Card, CardContent } from '@/components/ui/card';

const StoresMap = () => {
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-0">
        <div className="relative w-full h-[400px] bg-muted">
          <iframe
            src="https://widgets.2gis.com/widget?type=firmsonmap&options=%7B%22pos%22%3A%7B%22lat%22%3A48.4808%2C%22lon%22%3A135.0838%2C%22zoom%22%3A12%7D%2C%22opt%22%3A%7B%22city%22%3A%22khabarovsk%22%7D%2C%22org%22%3A%5B%5D%7D"
            width="100%"
            height="400"
            frameBorder="0"
            allowFullScreen
            style={{ position: 'relative' }}
            title="Карта магазинов на 2ГИС"
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default StoresMap;