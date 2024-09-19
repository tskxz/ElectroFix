import React from 'react'
import {Card, CardBody} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import Rating from './Rating'

const Eletrodomestico = ({eletrodomestico}) => {
  return (
    <Card className="my-3 card-equal">
    <Link to ={`/eletrodomestico/${eletrodomestico.id}`}>
        <Card.Img className="card-img-custom" variant="top" src={eletrodomestico.imagem} />
    </Link>

    <CardBody>
        <Link to={`/eletrodomestico/${eletrodomestico.id}`}>
           <Card.Title as="div">
                <strong>{eletrodomestico.nome}</strong>
            </Card.Title>
        </Link>

        <Card.Text as="div" className="product-title">
            <Rating value={eletrodomestico.rating} text={`${eletrodomestico.numReviews} reviews`} />
        </Card.Text>

        <Card.Text as="h3">
            {eletrodomestico.preco}€
        </Card.Text>
    </CardBody>
</Card>

  )
}

export default Eletrodomestico