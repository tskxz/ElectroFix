import React from 'react'
import {useParams, useNavigate} from 'react-router-dom'
import {Row, Col, Image, ListGroup, Card, Button, Form} from 'react-bootstrap';
import Rating from '../../components/Rating'
import {useState, useEffect} from 'react'
import axios from 'axios';
import { useGetEletrodomesticoQuery,useCriarReviewMutation } from '../../slices/eletrodomesticosApiSlice';
import Loader from '../../components/Loader'
import Message from '../../components/Message';
import {useDispatch, useSelector} from 'react-redux'
import { adicionarToCarrinho } from '../../slices/carrinhoSlice';
import {toast} from 'react-toastify'
import {Link} from 'react-router-dom'
import Meta from '../../components/Meta';

const EletrodomesticoScreen = () => {
    const {id: eletrodomesticoId} = useParams()
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [quantidade, setQuantidade] = useState(1);
    const [rating, setRating] = useState(0);
    const [comentario, setComentario] = useState(0) 
    const {data: eletrodomestico, refetch, isLoading, error}  = useGetEletrodomesticoQuery(eletrodomesticoId);
    const [criarReview, {isLoading:loadingEletrodomesticoReview}] = useCriarReviewMutation() 
    const {utilizadorInfo} = useSelector((state) => state.auth)
    const adicionarToCarrinhoHandler = () => {
      dispatch(adicionarToCarrinho({...eletrodomestico, quantidade}))
      navigate('/carrinho')
    }
    const submitHandler = async(e) => {
      e.preventDefault()
      try{
        await criarReview({
          eletrodomesticoId,
          rating,
          comentario
        }).unwrap()
        refetch()
        toast.success('review submitted')
        setRating(0)
        setComentario('')
      } catch(err){
        toast.error(err?.data?.message || err.error)
      }
    }  
    return(
      <>
      {isLoading ? (<Loader/>) : error ? (<Message variant='danger'>{error?.data?.message || error.error}</Message>) : (<>
      <Meta title={eletrodomestico.nome}/>
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
            Preco: {eletrodomestico.preco}€ 
          </ListGroup.Item>
          <ListGroup.Item>
            Descricao: {eletrodomestico.descricao} 
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
                  <strong>{eletrodomestico.preco}€</strong>
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
      <Row className='review'>
        <Col md={6}>
          <h2>Reviews</h2>
          {eletrodomestico.reviews.length===0 && <Message>Sem reviews</Message>}
          <ListGroup variant='flush'>
            {eletrodomestico.reviews.map(review => (
              <ListGroup.Item key={review._id}>
                <strong>{review.nome}</strong>
                <Rating value={review.rating}/>
                <p>{review.createdAt.substring(0,10)}</p>
                <p>{review.comentario}</p>
              </ListGroup.Item>
            ))}
          </ListGroup>
          <ListGroup.Item>
            <h2>Escreva uma review</h2>
            {loadingEletrodomesticoReview && <Loader/>}
            {utilizadorInfo ? (
              <Form onSubmit={submitHandler}>
                <Form.Group controlId='rating' className='my-2'>
                  <Form.Label>Rating</Form.Label>
                  <Form.Control as='select' value={rating} onChange={(e) => setRating(Number(e.target.value))}>
                    <option value=''>Select ...</option>
                    <option value='1'>1 - Poor</option>
                    <option value='2'>2 - Fair</option>
                    <option value='3'>3 - Good</option>
                    <option value='4'>4 - Very Good</option>
                    <option value='5'>5 - Excellent</option>
                  </Form.Control>
                </Form.Group>
                <Form.Group controlId='comentario' className='my-2'>
                  <Form.Label>
                    Comentário
                  </Form.Label>
                  <Form.Control as='textarea' row='3' value={comentario} onChange={(e) => setComentario(e.target.value)}>
                  </Form.Control>
                </Form.Group>
                <Button disabled={loadingEletrodomesticoReview} type='submit' variant='primary'>Submit</Button>
              </Form>
            ) : (
            <Message>Por favor faça <Link to='/login'>login</Link> para escrever uma review</Message>)}
          </ListGroup.Item>
        </Col>
      </Row>
      </>)}
        
      </>
    )

}

export default EletrodomesticoScreen