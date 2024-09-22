import React from 'react'
import { useEffect, useState } from 'react'
import axios from 'axios'
import {Row, Col} from 'react-bootstrap'
import Eletrodomestico from '../../components/Eletrodomestico'

const HomeScreen = () => {

  const [eletrodomesticos, setEletrodomesticos] = useState([])
  useEffect(() => {
    const fetchEletrodomesticos = async () => {
      const {data} = await axios.get('/api/eletrodomesticos');
      setEletrodomesticos(data);
    }
    fetchEletrodomesticos();
  }, [])
  return (
    <>
        <h1>Os nossos eletrodomésticos</h1>
        <Row>
            {eletrodomesticos.map(eletrodomestico => (
                <Col sm={12} md={6} lg={4} xl={3}>
                    <Eletrodomestico eletrodomestico={eletrodomestico} />
                </Col>
            ))}
        </Row>
    </>
  )
}

export default HomeScreen