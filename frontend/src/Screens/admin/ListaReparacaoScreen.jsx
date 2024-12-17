import {LinkContainer} from 'react-router-bootstrap'
import {Table, Button} from 'react-bootstrap'
import {FaTimes, FaClock} from 'react-icons/fa'
import Message from '../../components/Message';
import Loader from '../../components/Loader'
import {useGetEncomendasQuery} from '../../slices/encomendasApiSlice.js'
import { useGetTodasReparacoesQuery } from '../../slices/reparacoesApiSlice.js';
const ListaReparacaoScreen = () => {
	const {data: reparacoes, isLoading, error} = useGetTodasReparacoesQuery()
	
	return <>
		<h1>Reparações</h1>
		{isLoading ? <Loader/> : error ? <Message variant='danger'>{error}</Message> : (
			<Table striped bordered hover responsive className='table-sm'>
				<thead>
					<th>ID</th>
					<th>UTILIZADOR</th>
					<th>MARCAÇÃO</th>
					<th>PAGO</th>
					<th>CONFIRMADO</th>
					<th></th>
				</thead>
				<tbody>
					{reparacoes.map((reparacao) => (
						<tr key={reparacao._id}>
							<td>{reparacao._id}</td>
							<td>{reparacao.utilizador && reparacao.utilizador.nome}</td>
							<td>
										{reparacao.isPago ? (
										reparacao.pagoEm.substring(0,10)
										) : (
											<FaTimes style={{color: 'red'}}/>
										)}
									</td>
									<td>
										{reparacao.status === "Confirmado" ? (
										reparacao.confirmadoEm.substring(0,10)
										) : reparacao.status === "Recusado" ? (
											<FaTimes style={{color: 'red'}}/>
										) : (
											<FaClock style={{color: 'orange'}}/>
										)}
									</td>
									<td>
										<LinkContainer to={`/reparacao/${reparacao._id}`}>
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

export default ListaReparacaoScreen