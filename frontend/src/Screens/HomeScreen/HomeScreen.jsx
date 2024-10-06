import React from 'react'
import { useEffect, useState } from 'react'
import axios from 'axios'
import {Row, Col} from 'react-bootstrap'
import Eletrodomestico from '../../components/Eletrodomestico'
import { useGetEletrodomesticosQuery } from '../../slices/eletrodomesticosApiSlice'
import Loader from '../../components/Loader'
import Message from '../../components/Message'
import {useParams} from 'react-router-dom'
import Paginate from '../../components/Paginate'
import {Link} from 'react-router-dom'
import EletrodomesticoCarousel from '../../components/EletrodomesticoCarousel.jsx'


const HomeScreen = () => {
  const {pageNumber, keyword} = useParams()
  const {data, isLoading, error} = useGetEletrodomesticosQuery({keyword, pageNumber});
  return (
    <>
       {!keyword ? <EletrodomesticoCarousel/> : (<Link to='/' className='btn btn-light mb-4'> Go back </Link>)}
       {isLoading ? (<Loader/>) : error ? (<Message variant='danger'>{error?.data?.message || error.error}</Message>) : (<>
        <h1>Os nossos eletrodomésticos</h1>
        <Row>
          {data.eletrodomesticos.map( (eletrodomestico) => (
            <Col key={eletrodomestico._id} sm={12} md={6} lg={4} xl={3}>
              <Eletrodomestico eletrodomestico={eletrodomestico} /> 
            </Col>
          ))}
        </Row><br /><br />
        <Paginate pages={data.pages} page={data.page} keyword={keyword ? keyword : ''}/>
       </>)}
    </>
  )
}

export default HomeScreen