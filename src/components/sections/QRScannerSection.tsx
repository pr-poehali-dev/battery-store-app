import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { Badge } from '@/components/ui/badge';
import FooterInfo from '@/components/ui/FooterInfo';

interface QRScannerSectionProps {
  setActiveSection: (section: string) => void;
}

const QRScannerSection = ({ setActiveSection }: QRScannerSectionProps) => {
  const [scanning, setScanning] = useState(false);
  const [result, setResult] = useState<string>('');
  const [error, setError] = useState<string>('');

  const handleScan = async () => {
    setScanning(true);
    setError('');
    setResult('');

    try {
      if (!('BarcodeDetector' in window)) {
        setError('Ваш браузер не поддерживает сканирование QR-кодов. Попробуйте использовать Chrome или Safari.');
        setScanning(false);
        return;
      }

      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'environment' } 
      });
      
      const video = document.createElement('video');
      video.srcObject = stream;
      video.play();

      const barcodeDetector = new (window as any).BarcodeDetector({ formats: ['qr_code'] });

      const detectQR = async () => {
        if (!scanning) {
          stream.getTracks().forEach(track => track.stop());
          return;
        }

        try {
          const barcodes = await barcodeDetector.detect(video);
          if (barcodes.length > 0) {
            setResult(barcodes[0].rawValue);
            setScanning(false);
            stream.getTracks().forEach(track => track.stop());
            return;
          }
        } catch (err) {
          console.error('Ошибка при сканировании:', err);
        }

        requestAnimationFrame(detectQR);
      };

      video.addEventListener('loadedmetadata', () => {
        detectQR();
      });

    } catch (err) {
      console.error('Ошибка доступа к камере:', err);
      setError('Не удалось получить доступ к камере. Проверьте разрешения в настройках браузера.');
      setScanning(false);
    }
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setError('');
    setResult('');

    try {
      if (!('BarcodeDetector' in window)) {
        setError('Ваш браузер не поддерживает сканирование QR-кодов.');
        return;
      }

      const image = new Image();
      const reader = new FileReader();

      reader.onload = async (e) => {
        image.src = e.target?.result as string;
        image.onload = async () => {
          try {
            const barcodeDetector = new (window as any).BarcodeDetector({ formats: ['qr_code'] });
            const barcodes = await barcodeDetector.detect(image);
            
            if (barcodes.length > 0) {
              setResult(barcodes[0].rawValue);
            } else {
              setError('QR-код не найден на изображении');
            }
          } catch (err) {
            setError('Ошибка при сканировании изображения');
          }
        };
      };

      reader.readAsDataURL(file);
    } catch (err) {
      setError('Ошибка при загрузке файла');
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <Card className="border-primary/20">
        <CardHeader className="text-center">
          <div className="mx-auto w-16 h-16 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center mb-4">
            <Icon name="QrCode" size={32} className="text-white" />
          </div>
          <CardTitle className="text-2xl">QR-сканер</CardTitle>
          <CardDescription>
            Проверьте подлинность аккумулятора по QR-коду
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <Card className="bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-950/20 dark:to-blue-950/20 border-2 border-purple-200 dark:border-purple-800">
            <CardContent className="pt-6 space-y-4">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center">
                  <Icon name="ShieldCheck" size={20} className="text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Защита от подделок</h3>
                  <p className="text-sm text-muted-foreground">
                    Отсканируйте QR-код на аккумуляторе, чтобы убедиться в его подлинности и получить информацию о производителе
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-4">
            {!scanning && !result && (
              <>
                <Button 
                  className="w-full h-14 text-lg bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"
                  onClick={handleScan}
                >
                  <Icon name="Camera" size={24} className="mr-2" />
                  Сканировать QR-код
                </Button>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-border"></div>
                  </div>
                  <div className="relative flex justify-center text-xs">
                    <span className="bg-background px-2 text-muted-foreground">или</span>
                  </div>
                </div>

                <label className="block">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                    id="qr-upload"
                  />
                  <Button 
                    variant="outline"
                    className="w-full h-14 text-lg"
                    onClick={() => document.getElementById('qr-upload')?.click()}
                  >
                    <Icon name="Upload" size={24} className="mr-2" />
                    Загрузить фото QR-кода
                  </Button>
                </label>
              </>
            )}

            {scanning && (
              <Card className="p-6 text-center border-2 border-purple-500 animate-pulse">
                <div className="space-y-4">
                  <div className="mx-auto w-20 h-20 rounded-full bg-purple-500/20 flex items-center justify-center">
                    <Icon name="Camera" size={40} className="text-purple-600 dark:text-purple-400" />
                  </div>
                  <div>
                    <p className="font-semibold text-lg mb-1">Идет сканирование...</p>
                    <p className="text-sm text-muted-foreground">
                      Наведите камеру на QR-код
                    </p>
                  </div>
                  <Button 
                    variant="outline"
                    onClick={() => setScanning(false)}
                    className="mt-4"
                  >
                    Отменить
                  </Button>
                </div>
              </Card>
            )}

            {error && (
              <Card className="bg-red-50 dark:bg-red-950/20 border-2 border-red-200 dark:border-red-800">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-3">
                    <Icon name="AlertCircle" size={24} className="text-red-600 dark:text-red-400 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-red-900 dark:text-red-100 mb-1">Ошибка</h3>
                      <p className="text-sm text-red-700 dark:text-red-300">{error}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {result && (
              <Card className="bg-green-50 dark:bg-green-950/20 border-2 border-green-200 dark:border-green-800">
                <CardContent className="pt-6 space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center">
                      <Icon name="CheckCircle" size={28} className="text-green-600 dark:text-green-400" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-green-900 dark:text-green-100 text-lg mb-2">QR-код распознан!</h3>
                      <div className="bg-white dark:bg-gray-900 rounded-lg p-3 border border-green-200 dark:border-green-800">
                        <p className="text-sm font-mono break-all">{result}</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Button 
                      className="flex-1"
                      onClick={() => setActiveSection('catalog')}
                    >
                      <Icon name="Search" size={18} className="mr-2" />
                      Найти в каталоге
                    </Button>
                    <Button 
                      variant="outline"
                      onClick={() => {
                        setResult('');
                        setError('');
                      }}
                    >
                      <Icon name="RotateCcw" size={18} className="mr-2" />
                      Сканировать ещё
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          <Card className="bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800">
            <CardContent className="pt-6">
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm font-medium">
                  <Icon name="Info" size={16} className="text-blue-600 dark:text-blue-400" />
                  <span>Как это работает?</span>
                </div>
                <ul className="space-y-2 text-sm text-muted-foreground pl-6">
                  <li className="flex items-start gap-2">
                    <Badge variant="outline" className="mt-0.5">1</Badge>
                    <span>Найдите QR-код на корпусе аккумулятора</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Badge variant="outline" className="mt-0.5">2</Badge>
                    <span>Отсканируйте его камерой или загрузите фото</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Badge variant="outline" className="mt-0.5">3</Badge>
                    <span>Получите информацию о подлинности товара</span>
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </CardContent>
      </Card>

      <FooterInfo />
    </div>
  );
};

export default QRScannerSection;
