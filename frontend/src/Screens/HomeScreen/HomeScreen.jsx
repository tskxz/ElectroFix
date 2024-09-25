import React from 'react'
import { useEffect, useState } from 'react'
import axios from 'axios'
import {Row, Col} from 'react-bootstrap'
import Eletrodomestico from '../../components/Eletrodomestico'
import { useGetEletrodomesticosQuery } from '../../slices/eletrodomesticosApiSlice'
import Loader from '../../components/Loader'

const HomeScreen = () => {

  const {data: eletrodomesticos, isLoading, error} = useGetEletrodomesticosQuery();
  return (
    <>
       {isLoading ? (<Loader/>) : error ? (<div>{error?.data?.message || error.error}</div>) : <>
        <h1>Os nossos eletrodomésticos</h1>
        <Row>
          {eletrodomesticos.map( (eletrodomestico) => (
            <Col key={eletrodomestico._id} sm={12} md={6} lg={4} xl={3}>
              <Eletrodomestico eletrodomestico={eletrodomestico} /> 
            </Col>
          ))}
        </Row>
       </>}
    </>
  )
}

export default HomeScreen