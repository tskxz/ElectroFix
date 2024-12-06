import {useState} from 'react'
import {Form, Button} from 'react-bootstrap'
import FormContainer from '../../components/FormContainer'
import {useDispatch, useSelector} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import {salvarEnderecoPostal} from '../../slices/agendaSlice'
import CheckoutStepsmarcacao from '../../components/CheckoutStepsmarcacao'

const ServicoMarcacaoScreen = () => {
    const agenda = useSelector((state)=>state.agenda)
    const {enderecoPostal} = agenda

    const [endereco, setEndereco] = useState(enderecoPostal?.endereco || '')
    const [cidade, setCidade] = useState(enderecoPostal?.cidade || '')
    const [codigoPostal, setCodigoPostal] = useState(enderecoPostal?.codigoPostal || '')
    const [pais, setPais] = useState(enderecoPostal?.pais || '')
    const [dataMarcacao, setDataMarcacao] = useState(enderecoPostal?.dataMarcacao || '');

    const handleChange = (event) => {
        setDataMarcacao(event.target.value);
    };
    console.log(dataMarcacao)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(salvarEnderecoPostal({endereco, cidade, codigoPostal, pais, dataMarcacao}))
        navigate('/pagamentoservico')
    }
    return (
        <FormContainer>
            <CheckoutStepsmarcacao step1 step2/>
            <h1>Marcação</h1>

            <Form onSubmit={submitHandler}>
                <Form.Group controlId='endereco' className='my-2'>
                    <Form.Label>Endereco</Form.Label>
                    <Form.Control type='text' placeholder='enter morada' value={endereco} onChange={(e) => setEndereco(e.target.value)}></Form.Control>
                </Form.Group>

                <Form.Group controlId='cidade' className='my-2'>
                    <Form.Label>Cidade</Form.Label>
                    <Form.Control type='text' placeholder='enter cidade' value={cidade} onChange={(e) => setCidade(e.target.value)}></Form.Control>
                </Form.Group>

                <Form.Group controlId='codigoPostal' className='my-2'>
                    <Form.Label>Codigo Postal</Form.Label>
                    <Form.Control type='text' placeholder='enter codigo postal' value={codigoPostal} onChange={(e) => setCodigoPostal(e.target.value)}></Form.Control>
                </Form.Group>

                <Form.Group controlId='pais' className='my-2'>
                    <Form.Label>País</Form.Label>
                    <Form.Control type='text' placeholder='enter país' value={pais} onChange={(e) => setPais(e.target.value)}></Form.Control>
                </Form.Group>

                <Form.Group controlId='dataMarcacao' className='my-2'>
                    <Form.Label>Selecione a data e a hora:</Form.Label>
                    <Form.Control
                        type="datetime-local"
                        value={dataMarcacao}
                        onChange={handleChange}
                    />
                </Form.Group>
        
                <Button type='submit' variant='primary' className='my-2'>Continuar</Button>
            </Form>
        </FormContainer>
    )
    
}

export default ServicoMarcacaoScreen