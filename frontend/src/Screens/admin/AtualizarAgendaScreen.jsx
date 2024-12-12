import {useState, useEffect} from 'react'
import {Link, useNavigate, useParams} from 'react-router-dom'
import {Form, Button} from 'react-bootstrap'
import Message from '../../components/Message'
import Loader from '../../components/Loader'
import FormContainer from '../../components/FormContainer'
import {toast} from 'react-toastify'
import {useAtualizarAgendaMutation, useGetAgendaDetailsQuery} from '../../slices/agendasApiSlice.js'

const AtualizarAgendaScreen = () => {
	const {id: agendaId} = useParams();
	const [dataMarcacao, setDataMarcacao] = useState("")

	const {data: agenda, isLoading, refetch, error} = useGetAgendaDetailsQuery(agendaId);
    console.log("ID DA AGENDA: " + agendaId)
	const [atualizarAgenda, {isLoading: loadingUpdate}] = useAtualizarAgendaMutation()

	const navigate = useNavigate()

	useEffect(() => {
		if(agenda){
            const date = new Date(agenda.enderecoPostal.dataMarcacao);
            const formattedDate = date.toISOString().slice(0, 16);
            setDataMarcacao(formattedDate);
		}
	}, [agenda])
	const submitHandler = async(e) => {
		e.preventDefault()
		const agendaAtualizado = {
			agendaId,
			dataMarcacao
		};

		const result = await atualizarAgenda(agendaAtualizado)
		if(result.error){
			toast.error(result.error)
		} else {
			toast.success('agenda atualizado')
			navigate('/admin/listaagendas')
		}
	}

	return <>
		<Link to="/admin/listaagendas" className='btn btn-light my-3'>
		Voltar
		</Link>
		<FormContainer>
			<h1>Editar Agenda</h1>
			{loadingUpdate && <Loader/>}
			{isLoading ? <Loader/> : error ? <Message variant='danger'>{error}</Message> : (
				<Form onSubmit={submitHandler}>
					<Form.Group controlId='dataMarcacao'>
						<Form.Label>Data da Marcacao</Form.Label>
							<Form.Control type='datetime-local' value={dataMarcacao} onChange={(e) => setDataMarcacao(e.target.value)}>
								
							</Form.Control>
						
					</Form.Group>

					<Button type='submit' variant='primary' className='my-2'>Atualizar Agenda</Button>
				</Form>
			)}
		</FormContainer>
	</>
}

export default AtualizarAgendaScreen