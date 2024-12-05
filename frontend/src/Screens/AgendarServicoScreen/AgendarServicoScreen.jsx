import {useEffect} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import {Button, Row, Col, ListGroup, Image, Card} from 'react-bootstrap'
import CheckoutStepsmarcacao from '../../components/CheckoutStepsmarcacao.jsx'
import {toast} from 'react-toastify'
import Message from '../../components/Message'
import Loader from '../../components/Loader'
import {useCriarEncomendaMutation} from '../../slices/encomendasApiSlice.js'
import {limparCarrinhoItens} from '../../slices/carrinhoSlice'


const AgendarServicoScreen = () => {
	const navigate = useNavigate()
	const dispatch = useDispatch()
	const carrinho = useSelector((state) => state.carrinho)
	const [criarEncomenda, {isLoading, error}] = useCriarEncomendaMutation()
	useEffect(() => {
		if(!carrinho.enderecoPostal.endereco){
			navigate('/marcacao')
		} else if(!carrinho.metodoPagamento){
			navigate('/pagamentoservico')
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
		<CheckoutStepsmarcacao step1 step2 step3 step4/>
		<Row>
			<Col md={8}>
				<ListGroup variant='flush'>
					<ListGroup.Item>
						<h2>Dados Pessoais</h2>
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
						
						
					</ListGroup.Item>
				</ListGroup>
			</Col>
			<Col md={4}>
				<Card>
					<ListGroup variant='flush'>
						<ListGroup.Item>
							<h2>Resumo do Serviço</h2>
						</ListGroup.Item>

						<ListGroup.Item>
							<Row>
								<Col>Deslocamento: </Col>
								<Col>
									${carrinho.precoEnvio}
								</Col>
							</Row>
						</ListGroup.Item>

						<ListGroup.Item>
							<Row>
								<Col>Agendado: </Col>
								<Col>
									{carrinho.enderecoPostal.dataMarcacao}
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
								Agendar
							</Button>
							{isLoading && <Loader/>}
						</ListGroup.Item>

					</ListGroup>
				</Card>
			</Col>
		</Row>
	</>
}

export default AgendarServicoScreen