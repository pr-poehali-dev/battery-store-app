import { useState, useEffect } from 'react';
import { Reservation } from '@/types';

export const useReservations = () => {
  const [reservations, setReservations] = useState<Reservation[]>(() => {
    const saved = localStorage.getItem('reservations');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('reservations', JSON.stringify(reservations));
  }, [reservations]);

  const addReservation = (reservation: Omit<Reservation, 'id' | 'createdAt' | 'status'>) => {
    const newReservation: Reservation = {
      ...reservation,
      id: `RES-${Date.now()}`,
      status: 'pending',
      createdAt: new Date().toISOString()
    };
    setReservations(prev => [newReservation, ...prev]);
    return newReservation;
  };

  const updateReservationStatus = (id: string, status: Reservation['status']) => {
    setReservations(prev => 
      prev.map(res => res.id === id ? { ...res, status } : res)
    );
  };

  const cancelReservation = (id: string) => {
    updateReservationStatus(id, 'cancelled');
  };

  const getReservationById = (id: string) => {
    return reservations.find(res => res.id === id);
  };

  const getUserReservations = () => {
    return reservations.filter(res => res.status !== 'cancelled');
  };

  return {
    reservations,
    addReservation,
    updateReservationStatus,
    cancelReservation,
    getReservationById,
    getUserReservations
  };
};
