import {Link, useParams} from 'react-router-dom'
import {Row, Col, ListGroup, Image, Form, Button, Card} from 'react-bootstrap'
import Message from '../../components/Message'
import Loader from '../../components/Loader'
import {useGetEncomendaDetailsQuery, usePagarEncomendaMutation, useGetPayPalClientIdQuery, useEntregarEncomendaMutation} from '../../slices/encomendasApiSlice';
import {PayPalButtons, usePayPalScriptReducer} from '@paypal/react-paypal-js'
import {toast} from 'react-toastify'
import {useSelector} from 'react-redux'
import {useEffect} from 'react'
const EncomendaScreen = () => {
	const {id: encomendaId} = useParams();
	const {data: encomenda, refetch, isLoading, error} = useGetEncomendaDetailsQuery(encomendaId)
	const [pagarEncomenda, {isLoading:loadingPay}] = usePagarEncomendaMutation()
	const [entregarEncomenda, {isLoading:loadingDeliver}] = useEntregarEncomendaMutation()
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
			if(encomenda && !encomenda.isPago){
				if(!window.paypal){
					loadPayPalScript()
				}
			}
		}
	}, [encomenda, paypal, paypalDispatch, loadingPayPal, errorPayPal])
	
	function onApprove(data, actions){
		return actions.order.capture().then(async function(details){
			try{
				await pagarEncomenda({encomendaId, details})
				refetch();
				toast.success('Encomenda pago com successo!')
			} catch(err){
				toast.error(err?.data?.message || err.message)
			}
		})
	}

	async function onApproveTest(){
		await pagarEncomenda({encomendaId, details: {payer:{}}})
				refetch();
				toast.success('Encomenda pago com successo!')
	}

	function onError(err){
		toast.error(err.message)
	}

	function createOrder(data, actions){
		return actions.order.create({
			purchase_units: [
				{
					amount: {
						value: encomenda.precoTotal
					}
				}
			]
		}).then((encomendaId) => {
			return encomendaId
		})
	}

	const  deliverOrderHandler = async () => {
		try {
			await entregarEncomenda(encomendaId)
			refetch()
			toast.success('Encomenda Atualizado')
		} catch(err) {
			toast.error(err?.data?.message || err.message)
		}
	}

	return isLoading ? <Loader/> : error ? <Message variant='danger'/> : (
		<>
			<h1>Encomenda {encomendaId}</h1>
			<Row>
				<Col md={8}>
					<ListGroup>
						<ListGroup.Item>
							<h2>Shipping</h2>
							<p>
								<strong>Nome: {encomenda.utilizador.nome}</strong>
							</p>
							<p>
								<strong>Email: {encomenda.utilizador.email}</strong>
							</p>
							<p>
								<strong>Endereco: {encomenda.enderecoPostal.endereco}, {encomenda.enderecoPostal.cidade}{' '}{encomenda.enderecoPostal.codigoPostal}, {encomenda.enderecoPostal.pais}</strong>
							</p>
							{encomenda.isEntregue ? (
								<Message variant='success'>
									Entregue em {encomenda.entregueEm}
								</Message>
							) : (
								<Message variant='danger'>
									Não entregue
								</Message>
							)}						
						</ListGroup.Item>
						<ListGroup.Item>
							<h2>Método de pagamento</h2>
							<p>
								<strong>Método: </strong>
								{encomenda.metodoPagamento}
							</p>
							{encomenda.isPago ? (
								<Message variant='success'>
									Pago em {encomenda.pagoEm}
								</Message>
							) : (
								<Message variant='danger'>
									Não pago
								</Message>
							)}
							
						</ListGroup.Item>
						<ListGroup.Item>
							<h2>Itens de encomenda</h2>
							{encomenda.encomendaItens.map((item, index) => (
								<ListGroup.Item>
									<Row>
										<Col md={1}>
											<Image src={item.imagem} alt={item.nome} fluid rounded/>
										</Col>
										<Col>
											<Link to={`/eletrodomestico/${item.eletrodomestico}`}>
												{item.nome}
											</Link>
										</Col>

										<Col md={4}>
											{item.quantidade} x {item.preco}€ = {item.quantidade*item.preco}€
										</Col>
									</Row>
								</ListGroup.Item>
							))}
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
									<Col>Itens</Col>
									<Col>{encomenda.precoItens}€</Col>
								</Row>
							</ListGroup.Item>
							<ListGroup.Item>
								<Row>
									<Col>Envio</Col>
									<Col>{encomenda.precoEnvio}€</Col>
								</Row>
							</ListGroup.Item>
							<ListGroup.Item>
								<Row>
									<Col>Taxa</Col>
									<Col>{encomenda.precoTaxa}€</Col>
								</Row>
							</ListGroup.Item>
							<ListGroup.Item>
								<Row>
									<Col>Total</Col>
									<Col>{encomenda.precoTotal}€</Col>
								</Row>
							</ListGroup.Item>
							{!encomenda.isPago && (
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
							{utilizadorInfo && utilizadorInfo.isAdmin && encomenda.isPago && !encomenda.isEntregue && (
								<ListGroup.Item>
									<Button type='button' className='btn btn-block' onClick={deliverOrderHandler}>
									Marcar como entregue
									</Button>
								</ListGroup.Item>
							)}
						</ListGroup>
					</Card>
				</Col>
			</Row>
		</>
	)
}

export default EncomendaScreen