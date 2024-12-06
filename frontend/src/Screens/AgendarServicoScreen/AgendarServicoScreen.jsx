import {useEffect} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import {Button, Row, Col, ListGroup, Image, Card} from 'react-bootstrap'
import CheckoutStepsmarcacao from '../../components/CheckoutStepsmarcacao.jsx'
import {toast} from 'react-toastify'
import Message from '../../components/Message'
import Loader from '../../components/Loader'
import {useCriarEncomendaMutation} from '../../slices/encomendasApiSlice.js'

const AgendarServicoScreen = () => {
	const navigate = useNavigate()
	const dispatch = useDispatch()
	const agenda = useSelector((state) => state.agenda)
	const [criarEncomenda, {isLoading, error}] = useCriarEncomendaMutation()
	useEffect(() => {
		if(!agenda.enderecoPostal.endereco){
			navigate('/marcacao')
		} else if(!agenda.metodoPagamento){
			navigate('/pagamentoservico')
		}
	}, [agenda.metodoPagamento, agenda.enderecoPostal.endereco, navigate])
	
	
	return <>
		<CheckoutStepsmarcacao step1 step2 step3 step4/>
		<Row>
			<Col md={8}>
				<ListGroup variant='flush'>
					<ListGroup.Item>
						<h2>Dados Pessoais</h2>
						<p>
							<strong>Endereco: </strong>
							{agenda.enderecoPostal.endereco}, {agenda.enderecoPostal.cidade} {agenda.enderecoPostal.codigoPostal}, {agenda.enderecoPostal.pais}
						</p>
					</ListGroup.Item>

					<ListGroup.Item>
						<h2>Metodo pagamento</h2>
						<strong>Metodo: </strong>
						{agenda.metodoPagamento}
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
									${agenda.precoDeslocamento}
								</Col>
							</Row>
						</ListGroup.Item>

						<ListGroup.Item>
							<Row>
								<Col>Taxa: </Col>
								<Col>
									${agenda.precoTaxa}
								</Col>
							</Row>
						</ListGroup.Item>

						<ListGroup.Item>
							<Row>
								<Col>Agendado: </Col>
								<Col>
									{agenda.enderecoPostal.dataMarcacao}
								</Col>
							</Row>
						</ListGroup.Item>

						<ListGroup.Item>
							<Row>
								<Col>Total: </Col>
								<Col>
									${agenda.precoTotal}
								</Col>
							</Row>
						</ListGroup.Item>
						<ListGroup.Item>
						    {error && <Message variant='danger'>{error.data?.message || error.error || 'An error occurred'}</Message>}
						</ListGroup.Item>
						<ListGroup.Item>
							<Button type='button' className='btn btn-block'>
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