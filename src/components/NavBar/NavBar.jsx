import React from 'react'
import { Container, Nav, Navbar, Image } from 'react-bootstrap'
import './Navbar.css'
import CartWidget from '../CartWidget/CartWidget'

const NavBar = () => {
  return (
    <Navbar className="navbar-expand-lg mb-3 mt-1">
        <Container>
            <Navbar.Brand className="fs-4 d-flex align-items-center"><Image className="me-3" src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Pok%C3%A9_Ball_icon.svg/1200px-Pok%C3%A9_Ball_icon.svg.png"></Image>Pokéstore!
                
            </Navbar.Brand>
            <Nav>
                <Nav.Link href="#">Pokemons</Nav.Link>
                <Nav.Link href="#">Objetos</Nav.Link>
                <CartWidget></CartWidget>
            </Nav>
        </Container>
    </Navbar>
  )
}

export default NavBar