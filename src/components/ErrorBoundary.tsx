import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

interface Props {
  children: React.ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('ErrorBoundary caught:', error, errorInfo);
  }

  handleReset = () => {
    localStorage.clear();
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-red-500/5 via-background to-red-500/10">
          <Card className="w-full max-w-md shadow-2xl">
            <CardHeader className="text-center">
              <div className="mx-auto w-20 h-20 rounded-full bg-red-500/10 flex items-center justify-center mb-4">
                <Icon name="AlertTriangle" size={40} className="text-red-600" />
              </div>
              <CardTitle className="text-2xl text-red-600">Что-то пошло не так</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-center">
              <p className="text-muted-foreground">
                Приложение обнаружило ошибку. Попробуйте очистить кеш — это решит проблему.
              </p>
              {this.state.error && (
                <details className="text-left p-3 bg-muted rounded text-xs">
                  <summary className="cursor-pointer font-semibold mb-2">Технические детали</summary>
                  <code className="text-red-600 break-all">
                    {this.state.error.toString()}
                  </code>
                </details>
              )}
              <Button onClick={this.handleReset} size="lg" className="w-full">
                <Icon name="RefreshCw" size={20} className="mr-2" />
                Очистить кеш и перезагрузить
              </Button>
              <p className="text-xs text-muted-foreground">
                Это удалит данные приложения и перезагрузит страницу
              </p>
            </CardContent>
          </Card>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
