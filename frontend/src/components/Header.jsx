import React from 'react'
import {Navbar, Nav, Container} from 'react-bootstrap'
import {FaShoppingCart, FaUser} from 'react-icons/fa'
import {LinkContainer} from 'react-router-bootstrap';

const Header = () => {
  return (
    <header>
    <Navbar className="custom-navbar" expand="lg" collapseOnSelect>
        <Container>
                <LinkContainer to="/">
                    <Navbar.Brand>ElectroFix</Navbar.Brand>
                </LinkContainer>
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className='ms-auto'>
                    <LinkContainer to="carrinho">
                        <Nav.Link >
                                <FaShoppingCart /> Carrinho
                            </Nav.Link>
                    </LinkContainer>
                    <LinkContainer to="login">
                        <Nav.Link>
                            <FaUser /> Entrar
                        </Nav.Link>
                    </LinkContainer>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    </header>
  )
}

export default Header