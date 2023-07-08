import React, { useEffect, useContext, useState} from 'react'
import { CartContext } from '../CartContextProvider/CartContextProvider';
import { Container, Button } from 'react-bootstrap';
import CartItem from './CartItem/CartItem';
import './Cart.css'
import { db } from '../../firebase/firebaseConfig';
import 'bootstrap/dist/css/bootstrap.min.css';
import { doc, addDoc, collection, setDoc} from 'firebase/firestore';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

const Cart = () => {

  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("")
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const { cart, totalPrice } = useContext(CartContext)
  const [orderId, setOrderId] = useState(null);
  const createOrder = async (cartItems, userInfo) => {
      const docRef = await addDoc(collection(db, "orders"), {cartItems, userInfo}
      )
    setOrderId(docRef.id);
  }
  const handleSave = (event) => {
    event.preventDefault();
    let userInfo = [];
    userInfo = {
      userName: name,
      userLastname:lastname,
      userEmail:email,
      orderValue: totalPrice
  }
    createOrder(cart, userInfo);
    console.log(userInfo)
    handleClose();

  }
  const renderCart = () => {
    const cartItems = {};

  // Group the items in the cart
  cart.forEach(item => {
    if (cartItems[item.id]) {
      // If the item already exists, increase the quantity count
      cartItems[item.id].quantity++;
    } else {
      // If the item doesn't exist, add it to the cartItems object
      cartItems[item.id] = {
        ...item,
        quantity: 1
      };
    }
  });
    return cart.map((item, i)=> (
        <CartItem data={item} pos={i}></CartItem>
    ))

  }
  return (
    <div className="d-flex flex-column cart">
      <Container className="itemListContainer">
        {(orderId===null) ? (renderCart()) : (console.log('xd'))}
      </Container>
      {(totalPrice > 0) && ( <div className="totalPrice">Precio total: ${totalPrice}</div> )}
        {(cart[0] && orderId===null) ? (
          (<Button onClick={handleShow} className='finishBtn'>Finalizar compra</Button>)
        ) : (console.log('NO EXISTE!!'))}

<Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Finaliza tu compra</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>Necesitamos algunos datos para efectuar tu pedido.</div>
          <hr className="hr hr-blurry" />
          <Form.Label htmlFor="inputName">Nombre</Form.Label>
          <Form.Control
            type="text"
            id="inputName"
            onChange={e=> setName(e.target.value)}
            aria-describedby="name"
          />
          <Form.Label htmlFor="inputLastname">Apellido</Form.Label>
          <Form.Control
            type="text"
            id="inputLastname"
            onChange={e=> setLastname(e.target.value)}
            aria-describedby="lastname"
          />
          <Form.Label htmlFor="inputEmail">Correo</Form.Label>
          <Form.Control
            type="email"
            id="inputEmail"
            onChange={e=> setEmail(e.target.value)}
            aria-describedby="email"
          />
          <Form.Label htmlFor="inputEmailTwo">Reingrese su correo</Form.Label>
          <Form.Control
            type="email"
            id="inputEmailTwo"
            aria-describedby="emailtwo"
          />
          </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancelar
          </Button>
          <Button variant="primary" type="submit" onClick={handleSave}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
      
        {orderId && <div className='d-flex align-content-center orderId'>Muchas gracias,<b>{name}</b>, su compra fue efectuada con éxito. <br></br>Su ID de compra es {orderId}</div>}
      
    </div>
  )
}

export default Cart