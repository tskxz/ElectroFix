import {useState, useEffect} from 'react'
import {Link, useNavigate, useParams} from 'react-router-dom'
import {Form, Button} from 'react-bootstrap'
import Message from '../../components/Message'
import Loader from '../../components/Loader'
import FormContainer from '../../components/FormContainer'
import {toast} from 'react-toastify'
import {useAtualizarEletrodomesticoMutation, useGetEletrodomesticoQuery, useUploadEletrodomesticoImagemMutation} from '../../slices/eletrodomesticosApiSlice.js'

const AtualizarEletrodomesticoScreen = () => {
	const {id: eletrodomesticoId} = useParams();
	const [nome, setNome] = useState("")
	const [preco, setPreco] = useState(0)
	const [imagem, setImagem] = useState("")
	const [descricao, setDescricao] = useState("")
	const [emStock, setEmStock] = useState(0)

	const {data: eletrodomestico, isLoading, refetch, error} = useGetEletrodomesticoQuery(eletrodomesticoId);
	const [atualizarEletrodomestico, {isLoading: loadingUpdate}] = useAtualizarEletrodomesticoMutation()
	const [uploadEletrodomesticoImagem, {isLoading: loadingUpload}] = useUploadEletrodomesticoImagemMutation()

	const navigate = useNavigate()

	useEffect(() => {
		if(eletrodomestico){
			setNome(eletrodomestico.nome)
			setPreco(eletrodomestico.preco)
			setImagem(eletrodomestico.imagem)
			setDescricao(eletrodomestico.descricao)
			setEmStock(eletrodomestico.emStock)

		}
	}, [eletrodomestico])
	const submitHandler = async(e) => {
		e.preventDefault()
		const eletrodomesticoAtualizado = {
			eletrodomesticoId,
			nome,
			preco,
			imagem,
			descricao,
			emStock
		};

		const result = await atualizarEletrodomestico(eletrodomesticoAtualizado)
		if(result.error){
			toast.error(result.error)
		} else {
			toast.success('eletrodomestico atualizado')
			navigate('/admin/listaeletrodomestico')
		}
	}

	const uploadFileHandler = async(e) => {
		const formData = new FormData()
		formData.append('image', e.target.files[0])
		try {
			const res = await uploadEletrodomesticoImagem(formData).unwrap()
			toast.success(res.message)
			setImagem(res.image)
		} catch(err){
			toast.error(err?.data?.message || err.error)
		}
	}

	return <>
		<Link to="/admin/listaeletrodomestico" className='btn btn-light my-3'>
		Voltar
		</Link>
		<FormContainer>
			<h1>Editar eletrodomestico</h1>
			{loadingUpdate && <Loader/>}
			{isLoading ? <Loader/> : error ? <Message variant='danger'>{error}</Message> : (
				<Form onSubmit={submitHandler}>
					<Form.Group controlId='nome'>
						<Form.Label>Nome</Form.Label>
							<Form.Control type='nome' placeholder='escreve o nome' value={nome} onChange={(e) => setNome(e.target.value)}>
								
							</Form.Control>
						
					</Form.Group>


					<Form.Group controlId='preco'>
						<Form.Label>Preco</Form.Label>
							<Form.Control type='number' placeholder='escreve o preco' value={preco} onChange={(e) => setPreco(e.target.value)}>
								
							</Form.Control>
						
					</Form.Group>

					<Form.Group controlId='descricao'>
						<Form.Label>Descricao</Form.Label>
							<Form.Control type='text' placeholder='escreve a descricao' value={descricao} onChange={(e) => setDescricao(e.target.value)}>
								
							</Form.Control>
						
					</Form.Group>

					<Form.Group controlId='imagem'>
		              <Form.Label>Imagem</Form.Label>
					  <Form.Control type='text' placeholder='Enter image url' value={imagem} onChange={(e) => setImagem}></Form.Control>
		              <Form.Control type='file' label='escolher ficheiro' onChange={uploadFileHandler}></Form.Control>
					 </Form.Group>



					
					<Form.Group controlId='emStock'>
						<Form.Label>Em Stock</Form.Label>
							<Form.Control type='number' placeholder='escreve a descricao' value={emStock} onChange={(e) => setEmStock(e.target.value)}>
								
							</Form.Control>
						
					</Form.Group>
					<Button type='submit' variant='primary' className='my-2'>Atualizar eletrodomestico</Button>
				</Form>
			)}
		</FormContainer>
	</>
}

export default AtualizarEletrodomesticoScreen