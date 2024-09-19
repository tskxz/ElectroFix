import React from 'react'
import {useParams} from 'react-router-dom'
import {Row, Col, Image, ListGroup, Card, Button} from 'react-bootstrap';
import Rating from '../../components/Rating'
import eletrodomesticos from '../../eletrodomesticos'

const EletrodomesticoScreen = () => {
    const {id: eletrodomesticoId} = useParams()
    const eletrodomestico = eletrodomesticos.find((e) => e._id === eletrodomesticoId);
    console.log(eletrodomestico)
    return(
        <div>
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
            
            <ListGroup.Item>
              <Button className='btn-block' type='button' disabled={eletrodomestico.emStock === 0}>Adicionar ao carrinho</Button>
            </ListGroup.Item>
          </ListGroup>
        </Card>
         </Col>
      </Row>
           
        </div>
    )

}

export default EletrodomesticoScreen