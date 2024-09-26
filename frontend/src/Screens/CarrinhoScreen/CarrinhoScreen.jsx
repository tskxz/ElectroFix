import React from 'react'
import {Link, useNavigate} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {Row, Col, ListGroup, Image, Form, Button, Card} from 'react-bootstrap'
import { FaTrash } from 'react-icons/fa'
import Message from '../../components/Message'
import {adicionarToCarrinho} from '../../slices/carrinhoSlice'
import { removerFromCarrinho } from '../../slices/carrinhoSlice'

const CarrinhoScreen = () => {

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const carrinho = useSelector((state) => state.carrinho);
  const {carrinhoItens} = carrinho;

  const adicionarToCarrinhoHandler = async(eletrodomestico, quantidade) => {
    dispatch(adicionarToCarrinho({...eletrodomestico, quantidade}))
  }

  const removerFromCarrinhoHandler = (eletrodomesticoId) => {
    dispatch(removerFromCarrinho(eletrodomesticoId))
  }

  const checkoutHandler = () => {
    navigate('/login?redirect=/compra')
  }
  
  return (
    <Row>
      <Col md={8}>
        <h1 style={{marginBottom: '20px'}}>Carrinho de Compras</h1>
        {carrinhoItens.length === 0 ? (
          <Message variant='info'>Seu carrinho está vazio. <Link to='/'>Voltar atrás</Link> </Message>
        ) : (
          <ListGroup variant='flush'>
            {carrinhoItens.map((item) => (
              <ListGroup.Item key={item._id}>
                <Row>
                  <Col md={2}>
                    <Image src={item.imagem} alt={item.nome} fluid rounded/>
                  </Col>
                  <Col md={3}>
                    <Link to={`/eletrodomesticos/${item._id}`}>{item.nome}</Link>
                  </Col>
                  <Col md={2}>
                    {item.preco}€
                  </Col>

                  <Col md={2}>
                    <Form.Control as='select' value={item.quantidade} onChange={(e) => adicionarToCarrinhoHandler(item, Number(e.target.value))}>
                      {[...Array(item.emStock).keys()].map((x) => (<option key={x+1} value={x+1}>{x+1}</option>))}
                    </Form.Control>
                  </Col>
                  <Col md={2}>
                    <Button type='button' variant='light' onClick={() => removerFromCarrinhoHandler(item._id)}><FaTrash/></Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
            
          </ListGroup>
        )}
      </Col>

        <Col md={4}>
          <Card>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h2>Sub-Total ({carrinhoItens.reduce((acc, item) => acc+item.quantidade, 0)}) itens</h2>
                ${carrinhoItens.reduce((acc, item) => acc+item.quantidade * item.preco, 0).toFixed(2)}
              </ListGroup.Item>
              <ListGroup.Item>
                <Button type='button' className='btn-block' disabled={carrinhoItens.length === 0} onClick={checkoutHandler}>
                  Proceder a compra
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>

    </Row>
  )
}

export default CarrinhoScreen