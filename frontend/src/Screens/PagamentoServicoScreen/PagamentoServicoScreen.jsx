import {useState, useEffect} from 'react'
import {Form, Button, Col} from 'react-bootstrap'
import FormContainer from '../../components/FormContainer'
import CheckoutStepsmarcacao from '../../components/CheckoutStepsmarcacao.jsx'
import {useDispatch, useSelector} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import {salvarMetodoPagamento} from '../../slices/carrinhoSlice.js'

const PagamentoServicoScreen = () => {
    const [metodoPagamento, setMetodoPagamento] = useState('Paypal')
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const carrinho = useSelector((state) => state.carrinho)
    const {enderecoPostal} = carrinho;
    useEffect(() => {
        if(!enderecoPostal){
            navigate('/marcacao')
        }
    }, [enderecoPostal, navigate])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(salvarMetodoPagamento(metodoPagamento))
        navigate('/agendar')
    }
    return (
        <FormContainer>
            <CheckoutStepsmarcacao step1 step2 step3/>
            <h1>Metodo pagamento</h1>
            <Form onSubmit={submitHandler}>
                <Form.Group>
                    <Form.Label as='legend'>Selecione o metodo</Form.Label>
                    <Col>
                        <Form.Check type='radio' className='my-2' label='Paypal or Credit Card' id='Paypal' name='metodoPagamento' value='Paypal' checked onChange={(e) => setMetodoPagamento(e.target.value)}></Form.Check>

                    </Col>
                </Form.Group>
                <Button type='submit' variant='primary' className='my-2'>Continuar</Button>

            </Form>

        </FormContainer>
    )
}

export default PagamentoServicoScreen