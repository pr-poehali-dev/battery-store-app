import { useEffect, useState } from 'react';
import Icon from '@/components/ui/icon';

const LoadingScreen = () => {
  const [batteryLevel, setBatteryLevel] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setBatteryLevel((prev) => {
        if (prev >= 100) return 0;
        return prev + 2;
      });
    }, 50);

    return () => clearInterval(interval);
  }, []);

  const jokes = [
    "Заряжаем аккумуляторы... и ваше терпение",
    "Проверяем напряжение... и вашу нервную систему",
    "Подключаемся к сети... надеемся, интернет не отключат",
    "Калибруем батареи... это займет всего 3-4 часа (шутка)",
    "Загружаем мир аккумуляторов... пока не разрядились сами"
  ];

  const [currentJoke] = useState(() => jokes[Math.floor(Math.random() * jokes.length)]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-primary/10 flex flex-col items-center justify-center p-6">
      <div className="max-w-md w-full space-y-8 text-center">
        {/* Animated Battery Grid */}
        <div className="relative">
          <div className="grid grid-cols-3 gap-4 mb-8">
            {[...Array(9)].map((_, i) => (
              <div
                key={i}
                className="relative animate-pulse"
                style={{
                  animationDelay: `${i * 0.1}s`,
                  animationDuration: '2s'
                }}
              >
                <div className="bg-gradient-to-b from-primary/20 to-primary/5 rounded-lg p-4 border-2 border-primary/30">
                  <Icon 
                    name={batteryLevel > i * 11 ? "BatteryFull" : "BatteryLow"} 
                    size={32} 
                    className={batteryLevel > i * 11 ? "text-primary" : "text-muted-foreground"}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Central Big Battery */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className="bg-background rounded-2xl p-6 shadow-2xl border-4 border-primary/50 animate-bounce">
              <Icon name="Zap" size={48} className="text-primary" />
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="space-y-3">
          <div className="h-3 bg-muted rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-primary to-primary/60 transition-all duration-300 ease-out rounded-full"
              style={{ width: `${batteryLevel}%` }}
            />
          </div>
          <p className="text-sm font-medium text-primary">{batteryLevel}%</p>
        </div>

        {/* Funny Text */}
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-foreground">
            Мир Аккумуляторов
          </h2>
          <p className="text-muted-foreground italic">
            {currentJoke}
          </p>
        </div>

        {/* Spinning Icon */}
        <div className="flex justify-center">
          <Icon 
            name="Loader2" 
            size={24} 
            className="text-primary animate-spin"
          />
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
