import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface FavoriteItem {
  id: number;
  name: string;
  price: number;
  image: string;
  addedAt: number;
}

interface FavoritesStore {
  favorites: FavoriteItem[];
  addFavorite: (id: number, name: string, price: number, image: string) => void;
  removeFavorite: (id: number) => void;
  isFavorite: (id: number) => boolean;
  toggleFavorite: (id: number, name: string, price: number, image: string) => void;
}

export const useFavorites = create<FavoritesStore>()(
  persist(
    (set, get) => ({
      favorites: [],
      
      addFavorite: (id, name, price, image) => {
        set((state) => {
          if (state.favorites.some((item) => item.id === id)) {
            return state;
          }
          return {
            favorites: [...state.favorites, { id, name, price, image, addedAt: Date.now() }],
          };
        });
      },
      
      removeFavorite: (id) => {
        set((state) => ({
          favorites: state.favorites.filter((item) => item.id !== id),
        }));
      },
      
      isFavorite: (id) => {
        return get().favorites.some((item) => item.id === id);
      },
      
      toggleFavorite: (id, name, price, image) => {
        const { isFavorite, addFavorite, removeFavorite } = get();
        if (isFavorite(id)) {
          removeFavorite(id);
        } else {
          addFavorite(id, name, price, image);
        }
      },
    }),
    {
      name: 'favorites-storage',
    }
  )
);
