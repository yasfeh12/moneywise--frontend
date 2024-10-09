import React, { createContext, useState, useContext } from 'react';

interface FavoritesContextType {
  favorites: string[];
  addFavorite: (stock: string) => void;
  removeFavorite: (stock: string) => void;
}

const FavoritesContext = createContext<FavoritesContextType>({
  favorites: [],
  addFavorite: () => {},
  removeFavorite: () => {},
});

export const FavoritesProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [favorites, setFavorites] = useState<string[]>([]);

  const addFavorite = (stock: string) => {
    if (!favorites.includes(stock)) {
      setFavorites([...favorites, stock]);
    }
  };

  const removeFavorite = (stock: string) => {
    setFavorites(favorites.filter(fav => fav !== stock));
  };

  return (
    <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => useContext(FavoritesContext);