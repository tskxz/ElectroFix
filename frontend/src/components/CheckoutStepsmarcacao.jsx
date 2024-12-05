import {Nav} from 'react-bootstrap'
import {LinkContainer} from 'react-router-bootstrap'

const CheckoutStepsmarcacao = ({step1,step2,step3,step4}) => {
	return(
		<Nav className='justify-content-center mb-4'>
			<Nav.Item>
				{step1? (
					<LinkContainer to='/login'>
						<Nav.Link>Entrar conta</Nav.Link>
					</LinkContainer>
				) : (
					<Nav.Link disabled>Entrar conta</Nav.Link>
				)}
			</Nav.Item>

			<Nav.Item>
				{step2? (
					<LinkContainer to='/marcacao'>
						<Nav.Link>Dados Pessoais</Nav.Link>
					</LinkContainer>
				) : (
					<Nav.Link disabled>Dados Pessoais</Nav.Link>
				)}
			</Nav.Item>

			<Nav.Item>
				{step3? (
					<LinkContainer to='/pagamentoservico'>
						<Nav.Link>Pagamento</Nav.Link>
					</LinkContainer>
				) : (
					<Nav.Link disabled>Pagamento</Nav.Link>
				)}
			</Nav.Item>

			<Nav.Item>
				{step4? (
					<LinkContainer to='/agendar'>
						<Nav.Link>Agendar</Nav.Link>
					</LinkContainer>
				) : (
					<Nav.Link disabled>Agendar</Nav.Link>
				)}
			</Nav.Item>
		</Nav>
	)
}

export default CheckoutStepsmarcacao