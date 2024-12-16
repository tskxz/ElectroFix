import {Link, useParams, useNavigate} from 'react-router-dom'
import React from 'react'

const ReparacaoScreen = () => {
    const {id: reparacaoId} = useParams();
  return (
    <>
        <h1>Reparação {reparacaoId}</h1>
        <div>ReparacaoScreen</div>
    </>
    
  )
}

export default ReparacaoScreen