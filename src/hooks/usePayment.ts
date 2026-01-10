import { useState } from 'react';
import { CartItem } from '@/types';

const PAYMENT_API = 'https://functions.poehali.dev/3c58bd38-5532-4460-abc7-cb6647b3d248';

export const usePayment = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createPayment = async (
    cart: CartItem[],
    total: number,
    userId: string | number,
    returnUrl: string
  ) => {
    setIsProcessing(true);
    setError(null);

    try {
      const items = cart.map(item => ({
        name: item.product.name,
        quantity: item.quantity,
        price: item.product.price
      }));

      const response = await fetch(PAYMENT_API, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'create_payment',
          amount: total,
          description: `Заказ в Мир Аккумуляторов (${cart.length} товаров)`,
          return_url: returnUrl,
          user_id: userId,
          items: items
        })
      });

      const data = await response.json();

      if (data.success && data.confirmation_url) {
        window.location.href = data.confirmation_url;
        return { success: true, paymentId: data.payment_id };
      } else {
        setError(data.error || 'Ошибка создания платежа');
        return { success: false, error: data.error };
      }
    } catch (err) {
      const errorMessage = 'Ошибка соединения с платежной системой';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setIsProcessing(false);
    }
  };

  const checkPayment = async (paymentId: string) => {
    try {
      const response = await fetch(PAYMENT_API, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'check_payment',
          payment_id: paymentId
        })
      });

      const data = await response.json();

      if (data.success) {
        return {
          success: true,
          status: data.status,
          paid: data.paid,
          amount: data.amount
        };
      } else {
        return { success: false, error: data.error };
      }
    } catch (err) {
      return { success: false, error: 'Ошибка проверки платежа' };
    }
  };

  return {
    createPayment,
    checkPayment,
    isProcessing,
    error
  };
};
