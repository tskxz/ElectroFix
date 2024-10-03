import {useState, useEffect} from 'react'
import {Link, useNavigate, useParams} from 'react-router-dom'
import {Form, Button} from 'react-bootstrap'
import Message from '../../components/Message'
import Loader from '../../components/Loader'
import FormContainer from '../../components/FormContainer'
import {toast} from 'react-toastify'
import {useAtualizarUtilizadorMutation, useGetUtilizadorQuery} from '../../slices/utilizadoresApiSlice.js'

const AtualizarUtilizadorScreen = () => {
	const {id: utilizadorId} = useParams();
	const [nome, setNome] = useState("")
	const [email, setEmail] = useState("")
	const [isAdmin, setIsAdmin] = useState(false)


	const {data: utilizador, isLoading, refetch, error} = useGetUtilizadorQuery(utilizadorId);
	const [atualizarUtilizador, {isLoading: loadingUpdate}] = useAtualizarUtilizadorMutation()


	const navigate = useNavigate()

	useEffect(() => {
		if(utilizador){
			setNome(utilizador.nome)
			setEmail(utilizador.email)
			setIsAdmin(utilizador.isAdmin)
		}
	}, [utilizador])
	const submitHandler = async(e) => {
		e.preventDefault()

		try {
			await atualizarUtilizador({utilizadorId, nome, email, isAdmin})
			toast.success('Utilizador atualizado')
			refetch()
			navigate('/admin/listautilizador')
		} catch(err) {
			toast.error(err?.data?.message || err.error)
		}
	}

	return <>
		<Link to="/admin/listautilizador" className='btn btn-light my-3'>
		Voltar
		</Link>
		<FormContainer>
			<h1>Editar Utilizador</h1>
			{loadingUpdate && <Loader/>}
			{isLoading ? <Loader/> : error ? <Message variant='danger'>{error}</Message> : (
				<Form onSubmit={submitHandler}>
					<Form.Group controlId='nome'>
						<Form.Label>Nome</Form.Label>
							<Form.Control type='text' placeholder='escreve o nome' value={nome} onChange={(e) => setNome(e.target.value)}>

							</Form.Control>

					</Form.Group>
					<Form.Group controlId='email'>
						<Form.Label>Email</Form.Label>
							<Form.Control type='email' placeholder='escreve o email' value={email} onChange={(e) => setEmail(e.target.value)}>

							</Form.Control>

					</Form.Group>
					<Form.Group controlId='isAdmin'>
						<Form.Check type='checkbox' label='Is Admin' checked={isAdmin} onChange={(e) => setIsAdmin(e.target.checked)}></Form.Check>
					</Form.Group>
					<Button type='submit' variant='primary' className='my-2'>Atualizar utilizador</Button>
				</Form>
			)}
		</FormContainer>
	</>
}

export default AtualizarUtilizadorScreen