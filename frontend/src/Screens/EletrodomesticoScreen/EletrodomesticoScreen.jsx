import React from 'react'
import {useParams} from 'react-router-dom'
import eletrodomesticos from '../../eletrodomesticos'

const EletrodomesticoScreen = () => {
    const {id: eletrodomesticoId} = useParams()
    const eletrodomestico = eletrodomesticos.find((e) => e._id === eletrodomesticoId);
    console.log(eletrodomestico)
    return(
        <div>
            
           
        </div>
    )

}

export default EletrodomesticoScreen