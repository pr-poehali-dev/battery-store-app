import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { Html5QrcodeScanner } from 'html5-qrcode';

const AdminSection = () => {
  const [scannerActive, setScannerActive] = useState(false);
  const [scannedCode, setScannedCode] = useState('');
  const [purchaseAmount, setPurchaseAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  useEffect(() => {
    let scanner: Html5QrcodeScanner | null = null;

    if (scannerActive) {
      scanner = new Html5QrcodeScanner(
        'reader',
        { 
          fps: 10, 
          qrbox: { width: 250, height: 250 },
          aspectRatio: 1.0
        },
        false
      );

      scanner.render(
        (decodedText) => {
          setScannedCode(decodedText);
          setScannerActive(false);
          scanner?.clear();
        },
        (error) => {
          console.log(error);
        }
      );
    }

    return () => {
      if (scanner) {
        scanner.clear().catch(console.error);
      }
    };
  }, [scannerActive]);

  const handleAddCashback = async () => {
    if (!scannedCode || !purchaseAmount) {
      setMessage({ type: 'error', text: 'Введите сумму покупки и отсканируйте код' });
      return;
    }

    const amount = parseFloat(purchaseAmount);
    if (isNaN(amount) || amount <= 0) {
      setMessage({ type: 'error', text: 'Некорректная сумма покупки' });
      return;
    }

    setLoading(true);
    try {
      const cashback = (amount * 0.03).toFixed(2);
      
      const response = await fetch('https://functions.poehali.dev/6a0b6e4d-715b-4012-bbdc-d401bcbb7858', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 
          userId: scannedCode, 
          cashbackAmount: parseFloat(cashback)
        })
      });
      
      const data = await response.json();
      
      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Ошибка при начислении кэшбека');
      }
      
      setMessage({ 
        type: 'success', 
        text: `Успешно начислено ${cashback} ₽ кэшбека (3% от ${amount} ₽)` 
      });
      
      setScannedCode('');
      setPurchaseAmount('');
    } catch (error) {
      setMessage({ 
        type: 'error', 
        text: error instanceof Error ? error.message : 'Ошибка при начислении кэшбека' 
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in max-w-2xl mx-auto">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
          <Icon name="ShieldCheck" size={24} className="text-primary" />
        </div>
        <div>
          <h2 className="text-3xl font-bold">Админ-панель</h2>
          <p className="text-muted-foreground">Начисление кэшбека клиентам</p>
        </div>
      </div>

      <Card className="border-2 border-primary/20">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Icon name="Scan" size={24} className="text-primary" />
            <CardTitle>Сканирование штрих-кода</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {!scannerActive ? (
            <div className="space-y-4">
              <Button 
                onClick={() => setScannerActive(true)} 
                className="w-full"
                size="lg"
              >
                <Icon name="Camera" size={20} className="mr-2" />
                Включить камеру для сканирования
              </Button>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">
                    Или введите вручную
                  </span>
                </div>
              </div>

              <Input
                type="text"
                placeholder="ID клиента или номер телефона"
                value={scannedCode}
                onChange={(e) => setScannedCode(e.target.value)}
              />
            </div>
          ) : (
            <div className="space-y-4">
              <div id="reader" className="w-full"></div>
              <Button 
                variant="outline" 
                onClick={() => setScannerActive(false)}
                className="w-full"
              >
                Отменить сканирование
              </Button>
            </div>
          )}

          {scannedCode && (
            <div className="p-4 bg-green-500/10 rounded-lg border border-green-500/20">
              <div className="flex items-center gap-2">
                <Icon name="CheckCircle" size={20} className="text-green-600" />
                <div>
                  <p className="font-semibold text-green-600">Код распознан</p>
                  <p className="text-sm text-muted-foreground">ID: {scannedCode}</p>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <Card className="border-2 border-primary/20">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Icon name="Calculator" size={24} className="text-primary" />
            <CardTitle>Начисление кэшбека</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Сумма покупки (₽)</label>
            <Input
              type="number"
              placeholder="Введите сумму покупки"
              value={purchaseAmount}
              onChange={(e) => setPurchaseAmount(e.target.value)}
              min="0"
              step="0.01"
            />
          </div>

          {purchaseAmount && parseFloat(purchaseAmount) > 0 && (
            <div className="p-4 bg-primary/5 rounded-lg border border-primary/20">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Кэшбек 3%:</span>
                <Badge className="text-lg px-3 py-1">
                  {(parseFloat(purchaseAmount) * 0.03).toFixed(2)} ₽
                </Badge>
              </div>
            </div>
          )}

          <Button 
            onClick={handleAddCashback}
            disabled={!scannedCode || !purchaseAmount || loading}
            className="w-full"
            size="lg"
          >
            {loading ? (
              <>
                <Icon name="Loader2" size={20} className="mr-2 animate-spin" />
                Начисление...
              </>
            ) : (
              <>
                <Icon name="Plus" size={20} className="mr-2" />
                Начислить кэшбек
              </>
            )}
          </Button>

          {message && (
            <div className={`p-4 rounded-lg border ${
              message.type === 'success' 
                ? 'bg-green-500/10 border-green-500/20' 
                : 'bg-red-500/10 border-red-500/20'
            }`}>
              <div className="flex items-center gap-2">
                <Icon 
                  name={message.type === 'success' ? 'CheckCircle' : 'AlertCircle'} 
                  size={20} 
                  className={message.type === 'success' ? 'text-green-600' : 'text-red-600'} 
                />
                <p className={message.type === 'success' ? 'text-green-600' : 'text-red-600'}>
                  {message.text}
                </p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Icon name="Info" size={24} className="text-primary" />
            <CardTitle>Инструкция</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <ol className="space-y-2 text-sm text-muted-foreground list-decimal ml-4">
            <li>Включите камеру и отсканируйте штрих-код клиента</li>
            <li>Или введите ID клиента вручную</li>
            <li>Введите сумму покупки</li>
            <li>Нажмите "Начислить кэшбек"</li>
            <li>Клиент получит 3% от суммы покупки на свой счёт</li>
          </ol>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminSection;