import React, {useEffect, useState, createContext} from 'react'
export const CartContext = createContext();

export const CartContextProvider = ({ children }) => {
    const [cart, setCart] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
      let price = 0;
      cart.forEach((item) => {
        price += item.item.price * item.quantity;
      });
      setTotalPrice(price);
    }, [cart]);
  

    const addToCart = (item, quantity) => {
      setCart(prevCart => {
        const existingItemIndex = prevCart.findIndex(cartItem => cartItem.item.ide === item.ide);
        if (existingItemIndex !== -1) {
          const updatedCart = [...prevCart];
          updatedCart[existingItemIndex].quantity += quantity; // Update quantity if item already exists
          return updatedCart;
        }

        return [...prevCart, { item, quantity }]; // Add new item if it doesn't exist
      });
        
      };
    
      const removeFromCart = (item, quantity) => {
        setCart(prevCart => {
          const updatedCart = [...prevCart];
          const index = updatedCart.findIndex(cartItem => cartItem.item.ide === item.ide);
          if (index !== -1) {
            const updatedQuantity = updatedCart[index].quantity - quantity;
            if (updatedQuantity <= 0) {
              updatedCart.splice(index, 1); // Remove item from cart if quantity becomes zero or less
            } else {
              updatedCart[index] = { ...updatedCart[index], quantity: updatedQuantity }; // Update item quantity
            }
          }
          return updatedCart;
        });
    };
    
      const clearCart = () => {
        setCart([]);
      };    

      return (
        <CartContext.Provider value={{ totalPrice, cart, addToCart, removeFromCart, clearCart }}>
          {children}
        </CartContext.Provider>
      );
}