import {Nav} from 'react-bootstrap'
import {LinkContainer} from 'react-router-bootstrap'

const CheckoutSteps = ({step1,step2,step3,step4}) => {
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
					<LinkContainer to='/compra'>
						<Nav.Link>Compra</Nav.Link>
					</LinkContainer>
				) : (
					<Nav.Link disabled>Compra</Nav.Link>
				)}
			</Nav.Item>

			<Nav.Item>
				{step3? (
					<LinkContainer to='/pagamento'>
						<Nav.Link>Pagamento</Nav.Link>
					</LinkContainer>
				) : (
					<Nav.Link disabled>Pagamento</Nav.Link>
				)}
			</Nav.Item>

			<Nav.Item>
				{step4? (
					<LinkContainer to='/encomendar'>
						<Nav.Link>Encomendar</Nav.Link>
					</LinkContainer>
				) : (
					<Nav.Link disabled>Encomendar</Nav.Link>
				)}
			</Nav.Item>
		</Nav>
	)
}

export default CheckoutSteps