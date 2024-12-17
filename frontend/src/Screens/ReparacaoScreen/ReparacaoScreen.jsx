import {Link, useParams, useNavigate} from 'react-router-dom'
import {Row, Col, ListGroup, Image, Form, Button, Card} from 'react-bootstrap'
import Message from '../../components/Message'
import Loader from '../../components/Loader'
import {useGetReparacaoDetailsQuery, usePagarReparacaoMutation, useRecusarReparacaoMutation, useGetPayPalClientIdQuery} from '../../slices/reparacoesApiSlice';

import {PayPalButtons, usePayPalScriptReducer} from '@paypal/react-paypal-js'
import {toast} from 'react-toastify'
import {useSelector} from 'react-redux'
import {useEffect} from 'react'
import {LinkContainer} from 'react-router-bootstrap'

const ReparacaoScreen = () => {
	const {id: reparacaoId} = useParams();
	const navigate = useNavigate()
	const {data: reparacao, refetch, isLoading, error} = useGetReparacaoDetailsQuery(reparacaoId)
  console.log(reparacao)
	const [pagarReparacao, {isLoading:loadingPay}] = usePagarReparacaoMutation()
  const [recusarReparacao, {isLoading:recusarDeliver}] = useRecusarReparacaoMutation()
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
			if(reparacao && !reparacao.isPago){
				if(!window.paypal){
					loadPayPalScript()
				}
			}
		}
	}, [reparacao, paypal, paypalDispatch, loadingPayPal, errorPayPal])
	
	function onApprove(data, actions){
		return actions.order.capture().then(async function(details){
			try{
				await pagarReparacao({reparacaoId, details})
				refetch();
				toast.success('Reparacao pago com successo!')
			} catch(err){
				toast.error(err?.data?.message || err.message)
			}
		})
	}

	async function onApproveTest(){
		await pagarReparacao({reparacaoId, details: {payer:{}}})
				refetch();
				toast.success('Reparacao pago com successo!')
	}

	function onError(err){
		toast.error(err.message)
	}

	function createOrder(data, actions){
		return actions.order.create({
			purchase_units: [
				{
					amount: {
						value: reparacao.valor_orcamento
					}
				}
			]
		}).then((reparacaoId) => {
			return reparacaoId
		})
	}

	const recusarOrderHandler = async () => {
		try {
			await recusarReparacao(reparacaoId)
			refetch()
			toast.success('Reparacao Recusado')
		} catch(err) {
			toast.error(err?.data?.message || err.message)
		}
	}

	return isLoading ? <Loader/> : error ? <Message variant='danger'/> : (
		<>
			<h1>Reparacao {reparacaoId}</h1>
			<Row>
				<Col md={8}>
					<ListGroup>
						<ListGroup.Item>
							<h2>Reparação</h2>
							<p>Descrição: {reparacao.descricao}</p>
							<p>
                <LinkContainer to={`/agenda/${reparacao.agenda}`}>
                  <Button variant='primary'>Visualizar Agenda</Button>
                </LinkContainer>
							</p>
							<p>
							</p>
							<p>
							</p>
							<p>
							
							</p>
							{reparacao.status === "Concluido" ? (
								<Message variant='success'>
									Concluido em {reparacao.concluidoEm}
								</Message>
							) : reparacao.status === "Recusado" ? (
								<Message variant='danger'>
									Recusado em {reparacao.recusadoEm}
								</Message>
							) : (
								<Message variant='warning'>
                                    Pendente
                                </Message>
							)}						
						</ListGroup.Item>
						<ListGroup.Item>
							<h2>Método de pagamento</h2>
							<p>
								<strong>Método: </strong>
								{reparacao.metodoPagamento}
							</p>
							{reparacao.isPago ? (
								<Message variant='success'>
									Pago em {reparacao.pagoEm}
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
								<h2>Resumo da reparação</h2>
							</ListGroup.Item>
							<ListGroup.Item>
								<Row>
									<Col>Valor Orcamento</Col>
									<Col>${reparacao.valor_orcamento}</Col>
								</Row>
							</ListGroup.Item>
							{reparacao.status !== "Recusado" && (
								<ListGroup.Item>
									{loadingPay && <Loader/>}
									{isPending? <Loader/> : (
										<div>
											<br />
											<Button onClick={recusarOrderHandler} style={{marginBottom: '10px'}}>Recusar Reparação
											</Button>
											<div>
												<PayPalButtons createOrder={createOrder} onApprove={onApprove} onError={onError}></PayPalButtons>
											</div>
										</div>
									)}
								</ListGroup.Item>
							)}				
						</ListGroup>
					</Card>
				</Col>
			</Row>
		</>
	)
}

export default ReparacaoScreen