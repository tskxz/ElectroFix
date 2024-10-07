import { Link } from "react-router-dom";
import { Carousel,Image } from "react-bootstrap";
import Loader from './Loader'
import Message from './Message'
import {useGetTopEletrodomesticosQuery} from '../slices/eletrodomesticosApiSlice';

const EletrodomesticoCarousel = () => {
    const {data: eletrodomesticos, isLoading, error} = useGetTopEletrodomesticosQuery()
    return isLoading ? <Loader/> : error ? <Message variant='danger'>{Error}</Message> : (
        <Carousel pause='hover' className="bg-primary mb-4">
            {eletrodomesticos.map(eletrodomestico=>(
                <Carousel.Item key={eletrodomestico._id}>
                    <Link to={`/eletrodomestico/${eletrodomestico._id}`}>
                        <div className="carousel-image-container">
                            <Image className="carousel-image" src={eletrodomestico.imagem} alt={eletrodomestico.nome} fluid />
                        </div>
                        <Carousel.Caption className="carousel-caption">
                            <h2>{eletrodomestico.nome} (€{eletrodomestico.preco}) </h2>
                        </Carousel.Caption>
                        </Link>

                </Carousel.Item>
            ))}
        </Carousel>
    )
}

export default EletrodomesticoCarousel
