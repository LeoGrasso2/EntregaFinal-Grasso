import React, {useContext} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Card from 'react-bootstrap/Card';
import '../CartItem/CartItem.css'
import { CartContext } from '../../CartContextProvider/CartContextProvider';

const CartItem = ({data, pos}) => {

    const { cart, removeFromCart, addToCart } = useContext(CartContext)

    return (
        <Card className="cartItemWrapper rounded-4 bg-transparent border border-0">
        <Card.Body className="cartItemContent">
          <div className="cartItemImg">
            <Card.Img
              variant="top"
              src={`${data.item.img}`}
              alt={data.item.name}
            />
          </div>
          <Card.Title className="cartItemName">{data.item.name}</Card.Title>
          <div className="quantityChoose">
            <button onClick={() => removeFromCart(data.item, 1)}>-</button><div className="itemQuantity">{data.quantity}</div><button onClick={() => addToCart(data.item, 1)}>+</button>
          </div>
        </Card.Body>
      </Card>
  )
}

export default CartItem