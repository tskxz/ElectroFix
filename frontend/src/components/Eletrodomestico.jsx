import React from 'react'
import {Card, CardBody} from 'react-bootstrap'

const Eletrodomestico = ({eletrodomestico}) => {
  return (
    <Card className="my-3 card-equal">
    <a href={`/eletrodomestico/${eletrodomestico.id}`}>
        <Card.Img className="card-img-custom" variant="top" src={eletrodomestico.imagem} />
    </a>

    <CardBody>
        <a href={`/eletrodomestico/${eletrodomestico.id}`}>
           <Card.Title as="div">
                <strong>{eletrodomestico.nome}</strong>
            </Card.Title>
        </a>

        <Card.Text as="h3">
            {eletrodomestico.preco}€
        </Card.Text>
    </CardBody>
</Card>

  )
}

export default Eletrodomestico