import React from 'react'
import {Navbar, Nav, Container} from 'react-bootstrap'
import {FaShoppingCart, FaUser} from 'react-icons/fa'

const Header = () => {
  return (
    <header>
    <Navbar className="custom-navbar" expand="lg" collapseOnSelect>
        <Container>
                <Navbar.Brand href="/">ElectroFix</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className='ms-auto'>
                        <Nav.Link href="/carrinho">
                            <FaShoppingCart /> Carrinho
                        </Nav.Link>
                        <Nav.Link href="/login">
                            <FaUser /> Entrar
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    </header>
  )
}

export default Header