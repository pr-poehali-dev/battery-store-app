import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import Icon from '@/components/ui/icon';

interface QuizQuestion {
  id: number;
  question: string;
  options: { value: string; label: string; icon?: string }[];
}

const questions: QuizQuestion[] = [
  {
    id: 1,
    question: 'Для какого устройства нужен аккумулятор?',
    options: [
      { value: 'iphone', label: 'iPhone', icon: 'Smartphone' },
      { value: 'ipad', label: 'iPad', icon: 'Tablet' },
      { value: 'macbook', label: 'MacBook', icon: 'Laptop' },
      { value: 'watch', label: 'Apple Watch', icon: 'Watch' },
    ],
  },
  {
    id: 2,
    question: 'Какая у вас модель?',
    options: [
      { value: 'latest', label: 'Новая (2023-2024)' },
      { value: 'recent', label: 'Средняя (2020-2022)' },
      { value: 'old', label: 'Старая (до 2020)' },
      { value: 'unknown', label: 'Не знаю точно' },
    ],
  },
  {
    id: 3,
    question: 'Как быстро разряжается устройство?',
    options: [
      { value: 'fast', label: 'Очень быстро (меньше 3 часов)' },
      { value: 'medium', label: 'Средне (3-6 часов)' },
      { value: 'slow', label: 'Нормально (больше 6 часов)' },
      { value: 'issues', label: 'Есть проблемы (выключается внезапно)' },
    ],
  },
  {
    id: 4,
    question: 'Что важнее всего?',
    options: [
      { value: 'capacity', label: 'Максимальная ёмкость', icon: 'BatteryFull' },
      { value: 'price', label: 'Низкая цена', icon: 'DollarSign' },
      { value: 'quality', label: 'Надёжность и гарантия', icon: 'ShieldCheck' },
      { value: 'speed', label: 'Быстрая замена', icon: 'Zap' },
    ],
  },
];

const recommendations: Record<string, { title: string; description: string; products: string[] }> = {
  premium: {
    title: 'Премиум аккумуляторы',
    description: 'Максимальная ёмкость и надёжность. Гарантия 2 года.',
    products: ['Original Apple Battery', 'Baseus Premium 5000mAh', 'Anker PowerCore+'],
  },
  standard: {
    title: 'Стандартные аккумуляторы',
    description: 'Оптимальное соотношение цены и качества.',
    products: ['Hoco J72 Power Bank', 'Xiaomi Power Bank 3', 'Samsung Battery Pack'],
  },
  budget: {
    title: 'Бюджетные решения',
    description: 'Доступная цена с достойным качеством.',
    products: ['Hoco J42 3000mAh', 'Yoobao Power Bank', 'Remax Portable Battery'],
  },
  urgent: {
    title: 'Срочная замена',
    description: 'Быстрая установка в сервисном центре за 1-2 часа.',
    products: ['Express Battery Service', 'Quick Replace Kit', 'Same Day Battery'],
  },
};

export default function BatteryQuiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [showResults, setShowResults] = useState(false);

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  const handleAnswer = (value: string) => {
    setAnswers({ ...answers, [questions[currentQuestion].id]: value });
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setShowResults(false);
  };

  const getRecommendation = () => {
    const priority = answers[4];
    const battery = answers[3];

    if (priority === 'speed' || battery === 'issues') return 'urgent';
    if (priority === 'capacity' || priority === 'quality') return 'premium';
    if (priority === 'price') return 'budget';
    return 'standard';
  };

  if (showResults) {
    const recKey = getRecommendation();
    const rec = recommendations[recKey];

    return (
      <div className="space-y-6">
        <Card className="border-primary/20">
          <CardHeader>
            <div className="flex items-center gap-3 mb-2">
              <div className="bg-primary/10 p-3 rounded-full">
                <Icon name="CheckCircle" size={32} className="text-primary" />
              </div>
              <div>
                <CardTitle className="text-2xl">{rec.title}</CardTitle>
                <CardDescription className="text-base">{rec.description}</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <h3 className="font-semibold text-lg">Рекомендуемые товары:</h3>
              {rec.products.map((product, idx) => (
                <Card key={idx} className="bg-muted/50">
                  <CardContent className="p-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Icon name="Battery" size={24} className="text-primary" />
                      <span className="font-medium">{product}</span>
                    </div>
                    <Button size="sm">
                      Подробнее
                      <Icon name="ArrowRight" size={16} className="ml-2" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="flex gap-3 pt-4">
              <Button onClick={handleRestart} variant="outline" className="flex-1">
                <Icon name="RotateCcw" size={18} className="mr-2" />
                Пройти заново
              </Button>
              <Button className="flex-1">
                <Icon name="ShoppingCart" size={18} className="mr-2" />
                Перейти в каталог
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const question = questions[currentQuestion];
  const currentAnswer = answers[question.id];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl">Подбор аккумулятора</CardTitle>
              <span className="text-sm text-muted-foreground">
                {currentQuestion + 1} / {questions.length}
              </span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-4">{question.question}</h3>
            <RadioGroup value={currentAnswer} onValueChange={handleAnswer}>
              <div className="space-y-3">
                {question.options.map((option) => (
                  <Label
                    key={option.value}
                    htmlFor={option.value}
                    className="flex items-center space-x-3 border rounded-lg p-4 cursor-pointer hover:bg-accent transition-colors"
                  >
                    <RadioGroupItem value={option.value} id={option.value} />
                    {option.icon && <Icon name={option.icon as any} size={20} className="text-primary" />}
                    <span className="flex-1">{option.label}</span>
                  </Label>
                ))}
              </div>
            </RadioGroup>
          </div>

          <div className="flex gap-3">
            {currentQuestion > 0 && (
              <Button onClick={handlePrevious} variant="outline" className="flex-1">
                <Icon name="ArrowLeft" size={18} className="mr-2" />
                Назад
              </Button>
            )}
            <Button
              onClick={handleNext}
              disabled={!currentAnswer}
              className="flex-1"
            >
              {currentQuestion === questions.length - 1 ? 'Показать результат' : 'Далее'}
              <Icon name="ArrowRight" size={18} className="ml-2" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
