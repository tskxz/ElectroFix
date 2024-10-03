import {LinkContainer} from 'react-router-bootstrap'
import {Table, Button} from 'react-bootstrap'
import {FaTimes, FaTrash, FaEdit, FaCheck} from 'react-icons/fa'
import Message from '../../components/Message';
import Loader from '../../components/Loader'
import {toast} from 'react-toastify'
import {useGetUtilizadoresQuery, useDeleteUtilizadorMutation} from '../../slices/utilizadoresApiSlice.js'

const ListaUtilizadorScreen = () => {
	const {data: utilizadores, refetch, isLoading, error} = useGetUtilizadoresQuery()
    const [deleteUtilizador, {isLoading: loadingDelete}] = useDeleteUtilizadorMutation()
	const deleteHandler = async (id) => {
		if(window.confirm('Tens a certeza que queres apagar o utilizador?')){
			try {
				await deleteUtilizador(id)
				toast.success('Utilizador apagado')
				refetch()
			} catch(err) {
				toast.error(err?.data?.message || err.error)
			}
		}
	}
	

	return <>
		<h1>Utilizadores</h1>
		{isLoading ? <Loader/> : error ? <Message variant='danger'>{error}</Message> : (
			<Table striped bordered hover responsive className='table-sm'>
				<thead>
					<th>ID</th>
					<th>UTILIZADOR</th>
					<th>EMAIL</th>
					<th>ADMIN</th>
					<th></th>
				</thead>
				<tbody>
					{utilizadores.map((utilizador) => (
						<tr key={utilizador._id}>
							<td>{utilizador._id}</td>
							<td>{utilizador.nome}</td>
							<td><a href={`mailto:${utilizador.email}`}>{utilizador.email}</a></td>
							<td>
										{utilizador.isAdmin ? (
										<FaCheck style={{color: 'green'}}/>
										) : (
											<FaTimes style={{color: 'red'}}/>
										)}
									</td>
									<td>
										<LinkContainer to={`/admin/utilizador/${utilizador._id}/edit`}>
											<Button className='btn-sm' variant='light'>
												<FaEdit/>
											</Button>
										</LinkContainer>
										<Button className='btn-sm' variant='danger' onClick={() => deleteHandler(utilizador._id)}>
												<FaTrash/>
											</Button>
									</td>
						</tr>
					))}
				</tbody>
			</Table>
		)}
	</>
}

export default ListaUtilizadorScreen