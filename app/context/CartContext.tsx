import React, { createContext, ReactNode, useContext, useState } from 'react';

type Product = {
  id: number;
  name: string;
  price: number;
  image: any; // usamos require()
  quantity?: number;
};

type Order = {
  id: string;
  date: string;
  items: Product[];
  total: number;
  paymentMethod: string;
  address: string;
  status: string;
};

type CartContextType = {
  cartItems: Product[];
  orders: Order[];
  addToCart: (product: Product) => void;
  increaseQuantity: (id: number) => void;
  decreaseQuantity: (id: number) => void;
  removeFromCart: (id: number) => void;
  clearCart: () => void;
  addOrder: (order: Omit<Order, 'id' | 'date' | 'status'>) => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);

  const addToCart = (product: Product) => {
    setCartItems((prev) => {
      const existing = prev.find((p) => p.id === product.id);
      if (existing) {
        return prev.map((p) =>
          p.id === product.id ? { ...p, quantity: p.quantity! + 1 } : p
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const increaseQuantity = (id: number) => {
    setCartItems((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, quantity: p.quantity! + 1 } : p
      )
    );
  };

  const decreaseQuantity = (id: number) => {
    setCartItems((prev) =>
      prev.map((p) =>
        p.id === id
          ? { ...p, quantity: Math.max(p.quantity! - 1, 1) }
          : p
      )
    );
  };

  const removeFromCart = (id: number) => {
    setCartItems((prev) => prev.filter((p) => p.id !== id));
  };

  const clearCart = () => setCartItems([]);

  const addOrder = (order: Omit<Order, 'id' | 'date' | 'status'>) => {
    const newOrder: Order = {
      ...order,
      id: Date.now().toString(),
      date: new Date().toISOString(),
      status: 'En preparación',
    };
    setOrders((prev) => [newOrder, ...prev]);
  };

  return (
    <CartContext.Provider
      value={{ cartItems, orders, addToCart, increaseQuantity, decreaseQuantity, removeFromCart, clearCart, addOrder }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart debe usarse dentro de un CartProvider');
  return context;
};

