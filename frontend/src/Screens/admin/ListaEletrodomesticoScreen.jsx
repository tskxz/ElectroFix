import {LinkContainer} from 'react-router-bootstrap'
import {Table, Button, Row, Col} from 'react-bootstrap'
import {FaTimes, FaEdit, FaTrash} from 'react-icons/fa'
import Message from '../../components/Message.jsx';
import Loader from '../../components/Loader.jsx'
import {toast} from 'react-toastify'
import {useGetEletrodomesticosQuery, useCriarEletrodomesticoMutation} from '../../slices/eletrodomesticosApiSlice.js'

const ListaEletrodomesticoScreen = () => {
	const {data: eletrodomesticos, isLoading, error, refetch} = useGetEletrodomesticosQuery()
	const [criarEletrodomestico, {isLoading:loadingCreate}] = useCriarEletrodomesticoMutation()
	const deleteHandler = (id) => {
		console.log('delete', id)
	}
	const criarEletrodomesticooHandler = async() => {
		if(window.confirm('Tens a certeza que queres criar um eletrodoméstico novo?')){
			try {
				await criarEletrodomestico()
				refetch()
			} catch(err){
				toast.error(err?.data?.message || err.error)
			}
		}
	}
	return <>
		<Row className='align-items-center'>
			<Col>
				<h1>Eletrodomesticos</h1>
			</Col>
			<Col className='text-end'>
				<Button className='btn-sm m-3' onClick={criarEletrodomesticooHandler}>
					<FaEdit/> Criar Eletrodoméstico
				</Button>
			</Col>
		</Row>
		{loadingCreate && <Loader/>}
		{isLoading ? <Loader/> : error ? <Message variant='danger'>{error}</Message> : (
			<>
				<Table striped hover responsive className='table-sm'>
					<thead>
						<tr>
							<th>ID</th>
							<th>NOME</th>
							<th>PRECO</th>
						</tr>
					</thead>
					<tbody>
						{eletrodomesticos.map((eletrodomestico) => (
							<tr key={eletrodomestico._id}>
								<td>{eletrodomestico._id}</td>
								<td>{eletrodomestico.nome}</td>
								<td>{eletrodomestico.preco}</td>
								<td>
									<LinkContainer to={`/admin/eletrodomestico/${eletrodomestico._id}/edit`}>
											<Button className='btn-sm mx-2' variant='light'>
												<FaEdit/>
											</Button>
											
										</LinkContainer>
									<Button className='btn-sm mx-2' variant='danger' onClick={() => deleteHandler(eletrodomestico._id)}>
												<FaTrash/>
											</Button>	
								</td>
							</tr>
						))}
					</tbody>
				</Table>
			</>
		)}
	</>
}

export default ListaEletrodomesticoScreen