// CartContext.js
import React, { createContext, useState, useContext } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [restaurantCarts, setRestaurantCarts] = useState({});

  const addToCart = (restaurantId, price) => {
    setRestaurantCarts(prev => ({
      ...prev,
      [restaurantId]: {
        total: (prev[restaurantId]?.total || 0) + parseFloat(price),
        items: [...(prev[restaurantId]?.items || []), { 
          id: Date.now().toString(),
          price: parseFloat(price),
          timestamp: new Date().toISOString()
        }]
      }
    }));
  };

  const getCartTotal = (restaurantId) => {
    return restaurantCarts[restaurantId]?.total || 0;
  };
  
  const getCartItemCount = (restaurantId) => {
    const restaurantCart = restaurantCarts[restaurantId]?.items || []; // Use restaurantCarts
    return restaurantCart.length;
  };

  return (
    <CartContext.Provider value={{ addToCart, getCartTotal, getCartItemCount, restaurantCarts }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);