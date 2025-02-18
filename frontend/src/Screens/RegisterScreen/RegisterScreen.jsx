import React, { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Form, Button, Row, Col } from 'react-bootstrap'
import FormContainer from '../../components/FormContainer'
import Loader from '../../components/Loader'
import { useRegisterMutation } from '../../slices/utilizadoresApiSlice'
import { setCredentials } from '../../slices/authSlice'
import { toast } from 'react-toastify'

const RegisterScreen = () => {
  const [nome, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [num_telemovel, setNum_telemovel] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [register, { isLoading }] = useRegisterMutation()

  const { utilizadorInfo } = useSelector((state) => state.auth)

  const { search } = useLocation()
  const sp = new URLSearchParams(search)
  const redirect = sp.get('redirect') || '/'

  useEffect(() => {
    if (utilizadorInfo) {
      navigate(redirect)
    }
  }, [utilizadorInfo, redirect, navigate])

  const submitHandler = async (e) => {
    e.preventDefault()

    // Força a validação nativa do HTML5
    // Se houver campo inválido, o browser exibe o balão de erro e não prossegue.
    if (!e.currentTarget.reportValidity()) {
      return
    }

    if (password !== confirmPassword) {
      toast.error('As passwords não são iguais!')
      return
    }

    try {
      const res = await register({ nome, email, password, num_telemovel }).unwrap()
      dispatch(setCredentials({ ...res }))
      navigate(redirect)
    } catch (err) {
      toast.error(err.data.message || err.error)
    }
  }

  return (
    <FormContainer>
      <h1>Criar conta</h1>
      <Form onSubmit={submitHandler} noValidate={false}>
        <Form.Group controlId='nome' className='my-3'>
          <Form.Label>Nome</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter nome'
            value={nome}
            onChange={(e) => setName(e.target.value)}
            required
            minLength={10}
            maxLength={50}
            onInvalid={(e) => {
              if (e.target.value.length < 10) {
                e.target.setCustomValidity('O nome deve ter pelo menos 10 caracteres!')
              } else if (e.target.value.length > 50) {
                e.target.setCustomValidity('O nome não pode exceder 50 caracteres!')
              }
            }}
            onInput={(e) => e.target.setCustomValidity('')}
          />
        </Form.Group>

        <Form.Group controlId='email' className='my-3'>
          <Form.Label>Endereço de Email</Form.Label>
          <Form.Control
            type='email'
            placeholder='Enter email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId='num_telemovel' className='my-3'>
          <Form.Label>Telemóvel</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter Phone Number'
            value={num_telemovel}
            onChange={(e) => setNum_telemovel(e.target.value)}
            required
            minLength={3}
            maxLength={13}
            pattern='[0-9]+'
            onInvalid={(e) => {
              // Define mensagem personalizada conforme o caso
              if (e.target.value.length < 3) {
                e.target.setCustomValidity('O número de telemóvel deve ter pelo menos 3 dígitos!')
              } else if (e.target.value.length > 13) {
                e.target.setCustomValidity('O número de telemóvel não pode exceder 13 dígitos!')
              } else {
                e.target.setCustomValidity('Só são permitidos dígitos (0-9)!')
              }
            }}
            onInput={(e) => e.target.setCustomValidity('')}
          />
        </Form.Group>

        <Form.Group controlId='password' className='my-3'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Enter password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId='confirmPassword' className='my-3'>
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Confirmar password'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </Form.Group>

        <Button type='submit' variant='primary' className='mt-2' disabled={isLoading}>
          Criar conta
        </Button>
        {isLoading && <Loader />}
      </Form>

      <Row className='py-3'>
        <Col>
          Já tem conta?{' '}
          <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>Entrar</Link>
        </Col>
      </Row>
    </FormContainer>
  )
}

export default RegisterScreen