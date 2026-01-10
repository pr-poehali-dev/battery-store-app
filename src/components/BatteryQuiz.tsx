import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

export default function BatteryQuiz() {
  const [step, setStep] = useState(0);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Тест-подбор аккумулятора</CardTitle>
          <CardDescription>
            Ответьте на несколько вопросов и получите персональные рекомендации
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center py-8">
            <div className="bg-primary/10 p-6 rounded-full inline-block mb-4">
              <Icon name="Battery" size={48} className="text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Скоро здесь появится тест</h3>
            <p className="text-muted-foreground mb-6">
              Мы работаем над умным помощником для подбора аккумулятора
            </p>
            <Button>
              <Icon name="ShoppingBag" size={18} className="mr-2" />
              Перейти в каталог
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
