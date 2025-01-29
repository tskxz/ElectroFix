import {useEffect} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import {Button, Row, Col, ListGroup, Image, Card} from 'react-bootstrap'
import CheckoutStepsmarcacao from '../../components/CheckoutStepsmarcacao.jsx'
import {toast} from 'react-toastify'
import Message from '../../components/Message'
import Loader from '../../components/Loader'
import {useCriarAgendaMutation} from '../../slices/agendasApiSlice.js'

const AgendarServicoScreen = () => {
	const navigate = useNavigate()
	const dispatch = useDispatch()
	const {utilizadorInfo} = useSelector((state) => state.auth)
	const agenda = useSelector((state) => state.agenda)
	const [criarAgenda, {isLoading, error}] = useCriarAgendaMutation()
	useEffect(() => {
		if(!agenda.enderecoPostal.endereco){
			navigate('/marcacao')
		} else if(!agenda.metodoPagamento){
			navigate('/pagamentoservico')
		}
	}, [agenda.metodoPagamento, agenda.enderecoPostal.endereco, navigate])
	
	const agendarHandler = async () => {
		try {
			const res = await criarAgenda({
				enderecoPostal: agenda.enderecoPostal,
				metodoPagamento: agenda.metodoPagamento,
				precoDeslocamento: agenda.precoDeslocamento,
				precoTaxa: agenda.precoTaxa,
				precoTotal: agenda.precoTotal
			}).unwrap();
			
			navigate(`/agenda/${res._id}`)
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
						<strong>Nome: </strong>
						{utilizadorInfo.nome}
						<br></br>
						<strong>Email: </strong>
						{utilizadorInfo.email}
						<br></br>
						<strong>Número de Telemóvel: </strong>
						{utilizadorInfo.num_telemovel}
						<br></br>
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
									{agenda.precoDeslocamento}€
								</Col>
							</Row>
						</ListGroup.Item>

						<ListGroup.Item>
							<Row>
								<Col>Taxa: </Col>
								<Col>
									{agenda.precoTaxa}€
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
									{agenda.precoTotal}€
								</Col>
							</Row>
						</ListGroup.Item>
						<ListGroup.Item>
						    {error && <Message variant='danger'>{error.data?.message || error.error || 'An error occurred'}</Message>}
						</ListGroup.Item>
						<ListGroup.Item>
							<Button type='button' className='btn btn-block' onClick={agendarHandler}>
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