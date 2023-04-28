import { createContext, useState } from "react";

export interface IProduct {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  numberPrice: number;
  description: String;
  defaultPriceId: string;
}

interface CartContextData {
  cartItems: IProduct[];
  addToCart: (product: IProduct) => void;
  checkIfItemAlreadyExists: (productId: string) => boolean;
  removeFromCart: (productId: string) => void;
  cartTotal: number;
}

interface CartContextProviderProps {
  children: React.ReactNode;
}

export const CartContext = createContext({} as CartContextData);

export function CartContextProvider({ children }: CartContextProviderProps) {
  const [cartItems, setCartItems] = useState<IProduct[]>([]);

  const cartTotal = cartItems.reduce((acc, item) => {
    return acc + item.numberPrice;
  }, 0);

  function addToCart(product: IProduct) {
    setCartItems((state) => [...cartItems, product]);
  }

  function checkIfItemAlreadyExists(productId: string) {
    return cartItems.some((product) => product.id === productId);
  }

  function removeFromCart(productId: string) {
    setCartItems((state) =>
      state.filter((product) => product.id !== productId)
    );
  }

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        checkIfItemAlreadyExists,
        removeFromCart,
        cartTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
