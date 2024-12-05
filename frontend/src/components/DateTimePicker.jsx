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
        <div>
          <Form.Label>Selecione a data e a hora:</Form.Label>
          <Form.Control
            type="datetime-local"
            value={dateTime}
            onChange={handleChange}
          />
          </div>
  );
};

export default DateTimePicker;