import { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import FormContainer from '../../components/FormContainer';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { salvarEnderecoPostal } from '../../slices/agendaSlice';
import CheckoutStepsmarcacao from '../../components/CheckoutStepsmarcacao';

const ServicoMarcacaoScreen = () => {
    const agenda = useSelector((state) => state.agenda);
    const { enderecoPostal } = agenda;

    const [endereco, setEndereco] = useState(enderecoPostal?.endereco || '');
    const [cidade, setCidade] = useState(enderecoPostal?.cidade || '');
    const [codigoPostal, setCodigoPostal] = useState(enderecoPostal?.codigoPostal || '');
    const [pais, setPais] = useState(enderecoPostal?.pais || '');
    const [dataMarcacao, setDataMarcacao] = useState(enderecoPostal?.dataMarcacao || '');
    const [errors, setErrors] = useState({});

    const handleChange = (event) => {
        setDataMarcacao(event.target.value);
    };

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const submitHandler = (e) => {
        e.preventDefault();
        let validationErrors = {};

        // Verificar se os campos estão vazios
        if (!endereco.trim()) validationErrors.endereco = 'O endereço é obrigatório.';
        if (!cidade.trim()) validationErrors.cidade = 'A cidade é obrigatória.';
        if (!codigoPostal.trim()) validationErrors.codigoPostal = 'O código postal é obrigatório.';
        if (!pais.trim()) validationErrors.pais = 'O país é obrigatório.';
        if (!dataMarcacao) validationErrors.dataMarcacao = 'A data e hora são obrigatórias.';

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        dispatch(salvarEnderecoPostal({ endereco, cidade, codigoPostal, pais, dataMarcacao }));
        navigate('/pagamentoservico');
    };

    return (
        <FormContainer>
            <CheckoutStepsmarcacao step1 step2 />
            <h1>Marcação</h1>

            <Form onSubmit={submitHandler}>
                <Form.Group controlId="endereco" className="my-2">
                    <Form.Label>Endereço</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Digite o endereço"
                        value={endereco}
                        onChange={(e) => setEndereco(e.target.value)}
                        isInvalid={!!errors.endereco}
                    />
                    <Form.Control.Feedback type="invalid">{errors.endereco}</Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="cidade" className="my-2">
                    <Form.Label>Cidade</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Digite a cidade"
                        value={cidade}
                        onChange={(e) => setCidade(e.target.value)}
                        isInvalid={!!errors.cidade}
                    />
                    <Form.Control.Feedback type="invalid">{errors.cidade}</Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="codigoPostal" className="my-2">
                    <Form.Label>Código Postal</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Digite o código postal"
                        value={codigoPostal}
                        onChange={(e) => setCodigoPostal(e.target.value)}
                        isInvalid={!!errors.codigoPostal}
                    />
                    <Form.Control.Feedback type="invalid">{errors.codigoPostal}</Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="pais" className="my-2">
                    <Form.Label>País</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Digite o país"
                        value={pais}
                        onChange={(e) => setPais(e.target.value)}
                        isInvalid={!!errors.pais}
                    />
                    <Form.Control.Feedback type="invalid">{errors.pais}</Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="dataMarcacao" className="my-2">
                    <Form.Label>Selecione a data e a hora:</Form.Label>
                    <Form.Control
                        type="datetime-local"
                        value={dataMarcacao}
                        onChange={handleChange}
                        isInvalid={!!errors.dataMarcacao}
                    />
                    <Form.Control.Feedback type="invalid">{errors.dataMarcacao}</Form.Control.Feedback>
                </Form.Group>

                <Button type="submit" variant="primary" className="my-2">
                    Continuar
                </Button>
            </Form>
        </FormContainer>
    );
};

export default ServicoMarcacaoScreen;