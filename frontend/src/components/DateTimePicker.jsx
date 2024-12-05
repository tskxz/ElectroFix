import React, { useState } from "react";
import { Form, Button, Container } from "react-bootstrap";

const DateTimePicker = () => {
  const [dateTime, setDateTime] = useState("");

  const handleChange = (event) => {
    setDateTime(event.target.value);
  };

  const handleSubmit = () => {
    alert(`Data e hora selecionadas: ${dateTime}`);
  };

  return (
    <Container className="mt-4">
          <Form.Label>Selecione a data e a hora:</Form.Label>
          <Form.Control
            type="datetime-local"
            value={dateTime}
            onChange={handleChange}
          />
    </Container>
  );
};

export default DateTimePicker;