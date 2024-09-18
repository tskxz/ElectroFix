import React from 'react'
import {Row, Col} from 'react-bootstrap'
import eletrodomesticos from '../../eletrodomesticos'

const HomeScreen = () => {
  return (
    <>
        <h1>Os nossos eletrodomésticos</h1>
        <Row>
            {eletrodomesticos.map(eletrodomestico => (
                <Col sm={12} md={6} lg={4} xl={3}>
                    <h3>{eletrodomestico.nome}</h3>
                </Col>
            ))}
        </Row>
    </>
  )
}

export default HomeScreen