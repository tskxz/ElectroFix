import React from 'react'
import {useParams, useNavigate} from 'react-router-dom'
import {Row, Col, Image, ListGroup, Card, Button, Form} from 'react-bootstrap';
import Rating from '../../components/Rating'
import {useState, useEffect} from 'react'
import axios from 'axios';
import { useGetEletrodomesticoQuery } from '../../slices/eletrodomesticosApiSlice';
import Loader from '../../components/Loader'
import Message from '../../components/Message';
import {useDispatch} from 'react-redux'
import { adicionarToCarrinho } from '../../slices/carrinhoSlice';


const EletrodomesticoScreen = () => {
    const {id: eletrodomesticoId} = useParams()
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [quantidade, setQuantidade] = useState(1);
    const {data: eletrodomestico, isLoading, error} = useGetEletrodomesticoQuery(eletrodomesticoId);
    const adicionarToCarrinhoHandler = () => {
      dispatch(adicionarToCarrinho({...eletrodomestico, quantidade}))
      navigate('/carrinho')
    }
    return(
      <>
      {isLoading ? (<Loader/>) : error ? (<Message variant='danger'>{error?.data?.message || error.error}</Message>) : (<>
        <Row>
        <Col md={5}>
          <Image src={eletrodomestico.imagem} alt={eletrodomestico.nome} fluid />
        </Col>
        <Col md={4}>
        <ListGroup variant='flush'>
          <ListGroup.Item>
            <h3>{eletrodomestico.nome}</h3>
          </ListGroup.Item>
          <ListGroup.Item>
            <Rating value={eletrodomestico.rating} text={`${eletrodomestico.numReviews} reviews`} />
          </ListGroup.Item>
          <ListGroup.Item>
            Preco: ${eletrodomestico.preco} 
          </ListGroup.Item>
          <ListGroup.Item>
            Descricao: ${eletrodomestico.descricao} 
          </ListGroup.Item>
        </ListGroup>
        </Col>
        <Col md={3}>
        <Card>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <Row>
                <Col>Preco: </Col>
                <Col>
                  <strong>{eletrodomestico.preco}</strong>
                </Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col>Status: </Col>
                <Col>
                  <strong>{eletrodomestico.emStock > 0 ? 'Em Stock' : 'Fora do stock'}</strong>
                </Col>
              </Row>
            </ListGroup.Item>

            {eletrodomestico.emStock > 0 && (
              <ListGroup.Item>
                <Row>
                  <Col>Quantidade</Col>
                  <Col>
                    <Form.Control as='select' value={quantidade} onChange={(e) => setQuantidade(Number(e.target.value))}>
                      {[...Array(eletrodomestico.emStock).keys()].map((x) => (<option key={x+1} value={x+1}>{x+1}</option>))}
                    </Form.Control>
                  </Col>
                </Row>
              </ListGroup.Item>
            )}
            
            <ListGroup.Item>
              <Button className='btn-block' type='button' disabled={eletrodomestico.emStock === 0} onClick={adicionarToCarrinhoHandler}>Adicionar ao carrinho</Button>
            </ListGroup.Item>
          </ListGroup>
        </Card>
         </Col>
      </Row>
      </>)}
        
      </>
    )

}

export default EletrodomesticoScreen