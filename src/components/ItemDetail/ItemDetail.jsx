import {React, useState, useEffect, useContext} from 'react'
import { useParams } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import Card from 'react-bootstrap/Card';
import { Button, Container } from 'react-bootstrap';
import './ItemDetail.css'
import { Link } from "react-router-dom"
import { db } from '../../firebase/firebaseConfig';
import { collection, query, where, getDocs, orderBy } from "firebase/firestore"
import { CartContext, CartContextProvider } from '../CartContextProvider/CartContextProvider';


const ItemDetail = () => {

  const { log, cart, addToCart, removeFromCart, clearCart } = useContext(CartContext)
  const [detail, setDetail] = useState();
  let { category, name, id } = useParams();

  useEffect(() => {
  const getItems = async () => {
    const q = query(collection(db, name), where('ide', "==", Number(id)))
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      setDetail(doc.data())
    })
  }
  getItems();
  }, [name, id])

  const [quantity, setQuantity] = useState(0);

  const increment = () => {
    setQuantity(prevQuantity => prevQuantity + 1 ) 
  }

  const decrement = () => {
    setQuantity(prevQuantity => {
      if (prevQuantity > 0 ){
        return prevQuantity - 1;
      }
      return prevQuantity;
    }) 
  }

    let currentCat;

    if(window.location.href.includes('pokemon')){
      currentCat='pokemon'
    }
    else if(window.location.href.includes('item')){
      currentCat='objects'
    }


    return(
      <Container className="d-flex justify-content-center">
        <Card className="detailCardWrapper align-items-center d-flex flex-column rounded-4 bg-transparent border border-0">
        <Card.Header className="detailCardId d-flex justify-content-center rounded-top-4">{detail?.name}</Card.Header>
        <Card.Body className="detailCardContent d-flex flex-column rounded-bottom-4">
          <div className="detailCardImage d-flex align-self-center">
            <Card.Img
              variant="top"
              src={detail?.img}
              alt={detail?.name}
            />
          </div>
          <div className="detailCardDescription">
            {detail?.description}
          </div>
          <CartContextProvider>
            <div className="quantityChoose">
              <Button onClick={() => decrement()}>-</Button>
              {quantity}
              <Button onClick={() => increment()}>+</Button>
            </div>
            <div className="detailCardPrice">Precio por <span className="price">&nbsp;{quantity}&nbsp;</span> unidades: ${(detail?.price)*quantity}</div>
              <Button onClick={() => addToCart(detail, quantity)}className="addToCart align-self-center">Agregar <b>{quantity}</b>  al carrito</Button>
              </CartContextProvider>
        </Card.Body>
      </Card>
    </Container>
    )
}

export default ItemDetail