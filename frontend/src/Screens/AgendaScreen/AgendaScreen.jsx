import {Link, useParams, useNavigate} from 'react-router-dom'
import {Row, Col, ListGroup, Image, Form, Button, Card} from 'react-bootstrap'
import Message from '../../components/Message'
import Loader from '../../components/Loader'
import {useGetAgendaDetailsQuery, usePagarAgendaMutation, useGetPayPalClientIdQuery, useConfirmarAgendaMutation, useRecusarAgendaMutation} from '../../slices/agendasApiSlice';
import {useCriarReparacaoMutation} from '../../slices/reparacoesApiSlice';

import {PayPalButtons, usePayPalScriptReducer} from '@paypal/react-paypal-js'
import {toast} from 'react-toastify'
import {useSelector} from 'react-redux'
import {useEffect} from 'react'
import {LinkContainer} from 'react-router-bootstrap'

const AgendaScreen = () => {
	const {id: agendaId} = useParams();
	const navigate = useNavigate()
	const {data: agenda, refetch, isLoading, error} = useGetAgendaDetailsQuery(agendaId)
	const [pagarAgenda, {isLoading:loadingPay}] = usePagarAgendaMutation()
	const [confirmarAgenda, {isLoading:loadingDeliver}] = useConfirmarAgendaMutation()
	const [recusarAgenda, {isLoading:recusarDeliver}] = useRecusarAgendaMutation()
	const [criarReparacao, {isLoadingReparacao, errorReparacao}] = useCriarReparacaoMutation()
	const [{isPending}, paypalDispatch] = usePayPalScriptReducer()
	const {data:paypal, isLoading:loadingPayPal, error: errorPayPal} = useGetPayPalClientIdQuery()
	const {utilizadorInfo} = useSelector((state) => state.auth)

	useEffect(() => {
		if(!errorPayPal && !loadingPayPal && paypal.clientId){
			const loadPayPalScript = async() => {
				paypalDispatch({
					type: 'resetOptions',
					value: {
						'client-id': paypal.clientId,
						 currency: 'EUR',
					}
				});
				paypalDispatch({type: 'setLoadingStatus', value: 'pending'})
			}
			if(agenda && !agenda.isPago){
				if(!window.paypal){
					loadPayPalScript()
				}
			}
		}
		console.log(agenda)
	}, [agenda, paypal, paypalDispatch, loadingPayPal, errorPayPal])
	
	function onApprove(data, actions){
		return actions.order.capture().then(async function(details){
			try{
				await pagarAgenda({agendaId, details})
				refetch();
				toast.success('Agenda pago com successo!')
			} catch(err){
				toast.error(err?.data?.message || err.message)
			}
		})
	}

	async function onApproveTest(){
		await pagarAgenda({agendaId, details: {payer:{}}})
				refetch();
				toast.success('Agenda pago com successo!')
	}

	function onError(err){
		toast.error(err.message)
	}

	function createOrder(data, actions){
		return actions.order.create({
			purchase_units: [
				{
					amount: {
						value: agenda.precoTotal
					}
				}
			]
		}).then((agendaId) => {
			return agendaId
		})
	}

	const  deliverOrderHandler = async () => {
		try {
			await confirmarAgenda(agendaId)
			refetch()
			toast.success('Agenda Atualizado')
		} catch(err) {
			toast.error(err?.data?.message || err.message)
		}
	}

	const recusarOrderHandler = async () => {
		try {
			await recusarAgenda(agendaId)
			refetch()
			toast.success('Agenda Recusado')
		} catch(err) {
			toast.error(err?.data?.message || err.message)
		}
	}

	const criarReparacaoHandler = async() => {
		if(window.confirm('Tens a certeza que queres criar uma reparação?')){
			try {
				let descricao = prompt("Descricao do problema");
				let valor_orcamento = prompt("Valor do Orçamento", 30);
				const res = await criarReparacao({
					agenda: agendaId,
					valor_orcamento: valor_orcamento,
					descricao: descricao,
				}).unwrap();
				console.log('reparacao criado')
				navigate(`/reparacao/${res._id}`)
			} catch(err){
				toast.error(err?.data?.message || err.error)
			}
		}
	}

	return isLoading ? <Loader/> : error ? <Message variant='danger'/> : (
		<>
			<h1>Agenda</h1>
			<Row>
				<Col md={8}>
					<ListGroup>
						<ListGroup.Item>
							<h2>Agenda {agendaId}</h2>
							<p>
								<strong>Nome: {agenda.utilizador.nome}</strong>
							</p>
							<p>
								<strong>Email: {agenda.utilizador.email}</strong>
							</p>
							<p>
								<strong>Número de Telemóvel: {agenda.utilizador.num_telemovel}</strong>
							</p>
							<p>
								<strong>Endereco: {agenda.enderecoPostal.endereco}, {agenda.enderecoPostal.cidade}{' '}{agenda.enderecoPostal.codigoPostal}, {agenda.enderecoPostal.pais}</strong>
							</p>
							{agenda.status === "Confirmado" ? (
								<Message variant='success'>
									Confirmado em {agenda.confirmadoEm}
								</Message>
							) : agenda.status === "Recusado" ? (
								<Message variant='danger'>
									Recusado em {agenda.recusadoEm}
								</Message>
							) : (
								<Message variant='warning'>
                                    Pendente
                                </Message>
							)}						
						</ListGroup.Item>
						<ListGroup.Item>
							{agenda.isPago ? (
								<Message variant='success'>
									Pago em {agenda.pagoEm}
								</Message>
							) : (
								<Message variant='danger'>
									Não pago
								</Message>
							)}
							
						</ListGroup.Item>
						
					</ListGroup>
				</Col>
				<Col md={4}>
					<Card>
						<ListGroup variant='flush'>
							<ListGroup.Item>
								<h2>Resumo da agenda</h2>
							</ListGroup.Item>
							<ListGroup.Item>
								<Row>
									<Col>Deslocamento</Col>
									<Col>{agenda.precoDeslocamento}€</Col>
								</Row>
							</ListGroup.Item>
							<ListGroup.Item>
								<Row>
									<Col>Agendado</Col>
									<Col>{agenda.enderecoPostal.dataMarcacao}</Col>
								</Row>
							</ListGroup.Item>
							<ListGroup.Item>
								<Row>
									<Col>Taxa</Col>
									<Col>{agenda.precoTaxa}€</Col>
								</Row>
							</ListGroup.Item>
							<ListGroup.Item>
								<Row>
									<Col>Total</Col>
									<Col>{agenda.precoTotal}€</Col>
								</Row>
							</ListGroup.Item>
							{!agenda.isPago && (
								<ListGroup.Item>
									{loadingPay && <Loader/>}
									{isPending? <Loader/> : (
										<div>
											<Button onClick={onApproveTest} style={{marginBottom: '10px'}}>Test Pay Order</Button>
											<div>
												<PayPalButtons createOrder={createOrder} onApprove={onApprove} onError={onError}></PayPalButtons>
											</div>
										</div>
									)}
								</ListGroup.Item>
							)}

							{loadingDeliver && <Loader/>}
							{utilizadorInfo && utilizadorInfo.isAdmin && agenda.isPago && agenda.status === "Pendente" && (
								<ListGroup.Item>
									<Button type='button' className='btn btn-block' onClick={deliverOrderHandler}>
									Marcar como Confirmado
									</Button>
								</ListGroup.Item>
							)}
							{utilizadorInfo && utilizadorInfo.isAdmin && agenda.isPago && agenda.status === "Pendente" && (
								<ListGroup.Item>
									<Button type='button' className='btn btn-block' onClick={recusarOrderHandler}>
									Recusar Agenda
									</Button>
								</ListGroup.Item>
							)}
							{utilizadorInfo && utilizadorInfo.isAdmin && agenda.isPago && agenda.status === "Pendente" && (
								<ListGroup.Item>
									<LinkContainer to={`/admin/agenda/${agenda._id}/edit`}>
										<Button type='button' className='btn btn-block'>
										Alterar Data
										</Button>
									</LinkContainer>
								</ListGroup.Item>
								
							)}
							{utilizadorInfo && utilizadorInfo.isAdmin && agenda.isPago && agenda.status === "Confirmado" && (
								<ListGroup.Item>
									
										<Button type='button' className='btn btn-block' onClick={criarReparacaoHandler}> 
										Criar Reparação
										</Button>

								</ListGroup.Item>
								
							)}
							{agenda.reparacao && (
  <ListGroup.Item>
    <LinkContainer to={`/reparacao/${agenda.reparacao._id}`}>
      <Button variant="primary">Visualizar Reparação</Button>
    </LinkContainer>
  </ListGroup.Item>
)}
						</ListGroup>
					</Card>
				</Col>
			</Row>
		</>
	)
}

export default AgendaScreen