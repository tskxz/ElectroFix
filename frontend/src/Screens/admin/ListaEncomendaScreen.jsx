import {LinkContainer} from 'react-router-bootstrap'
import {Table, Button} from 'react-bootstrap'
import {FaTimes} from 'react-icons/fa'
import Message from '../../components/Message';
import Loader from '../../components/Loader'
import {useGetEncomendasQuery} from '../../slices/encomendasApiSlice.js'

const ListaEncomendaScreen = () => {
	const {data: encomendas, isLoading, error} = useGetEncomendasQuery()
	console.log(encomendas)

	return <>
		<h1>Encomendas</h1>
		{isLoading ? <Loader/> : error ? <Message variant='danger'>{error}</Message> : (
			<Table striped bordered hover responsive className='table-sm'>
				<thead>
					<th>ID</th>
					<th>UTILIZADOR</th>
					<th>DATE</th>
					<th>TOTAL</th>
					<th>PAGO</th>
					<th>ENTREGUE</th>
					<th></th>
				</thead>
				<tbody>
					{encomendas.map((encomenda) => (
						<tr key={encomenda._id}>
							<td>{encomenda._id}</td>
							<td>{encomenda.utilizador && encomenda.utilizador.nome}</td>
							<td>{encomenda.createdAt.substring(0,10)}</td>
							<td>{encomenda.precoTotal}</td>
							<td>
										{encomenda.isPago ? (
										encomenda.pagoEm.substring(0,10)
										) : (
											<FaTimes style={{color: 'red'}}/>
										)}
									</td>
									<td>
										{encomenda.isEntregue ? (
										encomenda.entregueEm.substring(0,10)
										) : (
											<FaTimes style={{color: 'red'}}/>
										)}
									</td>
									<td>
										<LinkContainer to={`/encomenda/${encomenda._id}`}>
											<Button className='btn-sm' variant='light'>
												Detalhes
											</Button>
										</LinkContainer>
									</td>
						</tr>
					))}
				</tbody>
			</Table>
		)}
	</>
}

export default ListaEncomendaScreen