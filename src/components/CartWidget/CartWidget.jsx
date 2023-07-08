import React, { useContext, useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import './CartWidget.css'
import { CartContext } from '../CartContextProvider/CartContextProvider';

export const CartWidget = () => {
  const { cart } = useContext(CartContext)
  const [cartQuantity, setCartQuantity] = useState(0);

  useEffect(() => {
    const totalQuantity = cart.reduce((total, item) => total + item.quantity, 0);
    setCartQuantity(totalQuantity);
  }, [cart])
  
  return (
    <div className="logo d-flex ms-2 me-sm-0 justify-content-center">
      <img src="/src/components/CartWidget/assets/img/cart-icon.png" alt="" srcset="" />
      <div className="number-container">
        <div className="number">{cartQuantity}
        </div>
      </div>
    </div>
  );
}

export default CartWidget;