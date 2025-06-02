import React, { createContext, useContext, useState } from 'react';

const StoreCartContext = createContext();

export const StoreCartProvider = ({ children }) => {
  // { [storeId]: [cartItems] }
  const [storeCarts, setStoreCarts] = useState({});

  // Get cart for a store
  const getCart = (storeId) => storeCarts[storeId] || [];

  // Set cart for a store
  const setCart = (storeId, items) => {
    setStoreCarts(prev => ({ ...prev, [storeId]: items }));
  };

  // Remove item by index
  const removeFromCart = (storeId, index) => {
    setStoreCarts(prev => {
      const prevCart = prev[storeId] || [];
      const newCart = prevCart.filter((_, i) => i !== index);
      return { ...prev, [storeId]: newCart };
    });
  };

  // Clear cart for a store
  const clearCart = (storeId) => {
    setStoreCarts(prev => {
      const newCarts = { ...prev };
      delete newCarts[storeId];
      return newCarts;
    });
  };

  return (
    <StoreCartContext.Provider value={{ getCart, setCart, removeFromCart, clearCart }}>
      {children}
    </StoreCartContext.Provider>
  );
};

export const useStoreCart = () => useContext(StoreCartContext);