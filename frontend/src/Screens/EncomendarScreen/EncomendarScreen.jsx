import {useEffect} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import {Button, Row, Col, ListGroup, Image, Card} from 'react-bootstrap'
import CheckoutSteps from '../../components/CheckoutSteps'
import {toast} from 'react-toastify'
import Message from '../../components/Message'
import Loader from '../../components/Loader'
import {useCriarEncomendaMutation} from '../../slices/encomendasApiSlice.js'
import {limparCarrinhoItens} from '../../slices/carrinhoSlice'


const EncomendarScreen = () => {
	const navigate = useNavigate()
	const dispatch = useDispatch()
	const carrinho = useSelector((state) => state.carrinho)
	const [criarEncomenda, {isLoading, error}] = useCriarEncomendaMutation()
	useEffect(() => {
		if(!carrinho.enderecoPostal.endereco){
			navigate('/compra')
		} else if(!carrinho.metodoPagamento){
			navigate('/pagamento')
		}
	}, [carrinho.metodoPagamento, carrinho.enderecoPostal.endereco, navigate])
	console.log(carrinho.carrinhoItens)
	const encomendarHandler = async () => {
		try {
			const res = await criarEncomenda({
				encomendaItens: carrinho.carrinhoItens,
				enderecoPostal: carrinho.enderecoPostal,
				metodoPagamento: carrinho.metodoPagamento,
				precoItens: carrinho.precoItens,
				precoEnvio: carrinho.precoEnvio,
				precoTaxa: carrinho.precoTaxa,
				precoTotal: carrinho.precoTotal
			}).unwrap();
			dispatch(limparCarrinhoItens());
			navigate(`/encomenda/${res._id}`)
		} catch(err) {
			toast(err)
		}
	}
	return <>
		<CheckoutSteps step1 step2 step3 step4/>
		<Row>
			<Col md={8}>
				<ListGroup variant='flush'>
					<ListGroup.Item>
						<h2>Shipping</h2>
						<p>
							<strong>Endereco: </strong>
							{carrinho.enderecoPostal.endereco}, {carrinho.enderecoPostal.cidade} {carrinho.enderecoPostal.codigoPostal}, {carrinho.enderecoPostal.pais}
						</p>
					</ListGroup.Item>

					<ListGroup.Item>
						<h2>Metodo pagamento</h2>
						<strong>Metodo: </strong>
						{carrinho.metodoPagamento}
					</ListGroup.Item>

					<ListGroup.Item>
						<h2>Itens da encomenda</h2>
						{carrinho.carrinhoItens.length === 0 ? (
							<Message>O teu carrinho esta vazio</Message>) : (
							<ListGroup variant='flush'>
								{carrinho.carrinhoItens.map((item, index) => (
									<ListGroup.Item>
										<Row>
											<Col md={1}>
												<Image src={item.imagem} alt={item.nome} fluid rounded/>
											</Col>

											<Col>
												<Link to={`/eletrodomestico/${item._id}`}>{item.nome}</Link>
											</Col>
											<Col md={4}>
												{item.quantidade} x {item.preco} = ${item.quantidade * item.preco}
											</Col> 
										</Row>
									</ListGroup.Item>
								))}
							</ListGroup>
							)}
					</ListGroup.Item>
				</ListGroup>
			</Col>
			<Col md={4}>
				<Card>
					<ListGroup variant='flush'>
						<ListGroup.Item>
							<h2>Resumo da encomenda</h2>
						</ListGroup.Item>
						<ListGroup.Item>
							<Row>
								<Col>Itens: </Col>
								<Col>
									${carrinho.precoItens}
								</Col>
							</Row>
						</ListGroup.Item>

						<ListGroup.Item>
							<Row>
								<Col>Preco Envio: </Col>
								<Col>
									${carrinho.precoEnvio}
								</Col>
							</Row>
						</ListGroup.Item>

						<ListGroup.Item>
							<Row>
								<Col>Itens: </Col>
								<Col>
									${carrinho.precoTaxa}
								</Col>
							</Row>
						</ListGroup.Item>

						<ListGroup.Item>
							<Row>
								<Col>Total: </Col>
								<Col>
									${carrinho.precoTotal}
								</Col>
							</Row>
						</ListGroup.Item>
						<ListGroup.Item>
						    {error && <Message variant='danger'>{error.data?.message || error.error || 'An error occurred'}</Message>}
						</ListGroup.Item>
						<ListGroup.Item>
							<Button type='button' className='btn btn-block' disabled={carrinho.carrinhoItens.length === 0} onClick={encomendarHandler}>
								Encomendar
							</Button>
							{isLoading && <Loader/>}
						</ListGroup.Item>

					</ListGroup>
				</Card>
			</Col>
		</Row>
	</>
}

export default EncomendarScreen