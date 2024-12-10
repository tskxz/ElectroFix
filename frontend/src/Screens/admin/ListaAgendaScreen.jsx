import {LinkContainer} from 'react-router-bootstrap'
import {Table, Button} from 'react-bootstrap'
import {FaTimes} from 'react-icons/fa'
import Message from '../../components/Message';
import Loader from '../../components/Loader'
import {useGetEncomendasQuery} from '../../slices/encomendasApiSlice.js'
import { useGetTodasAgendasQuery } from '../../slices/agendasApiSlice.js';
const ListaAgendaScreen = () => {
	const {data: agendas, isLoading, error} = useGetTodasAgendasQuery()
	console.log(agendas)

	return <>
		<h1>Agendas</h1>
		{isLoading ? <Loader/> : error ? <Message variant='danger'>{error}</Message> : (
			<Table striped bordered hover responsive className='table-sm'>
				<thead>
					<th>ID</th>
					<th>UTILIZADOR</th>
					<th>TOTAL</th>
					<th>DATE</th>
					<th>PAGO</th>
					<th>ENTREGUE</th>
					<th></th>
				</thead>
				<tbody>
					{agendas.map((agenda) => (
						<tr key={agenda._id}>
							<td>{agenda._id}</td>
							<td>{agenda.utilizador && agenda.utilizador.nome}</td>
                            <td>{agenda.precoTotal}</td>
							<td>{agenda.createdAt.substring(0,10)}</td>
							<td>
										{agenda.isPago ? (
										agenda.pagoEm.substring(0,10)
										) : (
											<FaTimes style={{color: 'red'}}/>
										)}
									</td>
									<td>
										{agenda.isEntregue ? (
										agenda.entregueEm.substring(0,10)
										) : (
											<FaTimes style={{color: 'red'}}/>
										)}
									</td>
									<td>
										<LinkContainer to={`/agenda/${agenda._id}`}>
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

export default ListaAgendaScreen