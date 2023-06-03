import React from 'react'
import { Container, Nav, Navbar, Image } from 'react-bootstrap'
import './Navbar.css'
import CartWidget from '../CartWidget/CartWidget'

const NavBar = () => {
  return (
    <Navbar className="navbar-expand-lg d-flex mb-3 mt-1">
        <Container className="d-flex flex-sm-column flex-md-row">
            <Navbar.Brand className="fs-4 d-flex flex-sm-column flex-md-row align-items-center me-sm-0"><Image className="me-3" src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Pok%C3%A9_Ball_icon.svg/1200px-Pok%C3%A9_Ball_icon.svg.png"></Image>Pokéstore!
                
            </Navbar.Brand>
            <Nav className="d-flex flex-sm-column align-items-center flex-md-row">
                <Nav.Link href="#">Pokemons</Nav.Link>
                <Nav.Link href="#">Objetos</Nav.Link>
                <CartWidget></CartWidget>
            </Nav>
        </Container>
    </Navbar>
  )
}

export default NavBar