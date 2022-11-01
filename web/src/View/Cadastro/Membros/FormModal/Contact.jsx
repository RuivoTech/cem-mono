import { Box, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';

import Utils from "../../../../componentes/Utils";

const Contact = ({ membro, handleChange }) => {
  const [contact, setContact] = useState({});

  useEffect(() => {
    setContact({
      email: membro?.contato?.email,
      celular: membro?.contato?.celular,
      telefone: membro?.contato?.telefone,
    })
  }, [membro])

  function handleMask(field, phone) {
    const newPhone = Utils.mascaraTelefone(phone)

    handleChange(field, newPhone);
  }

  return (
    <Box>
      <TextField
        fullWidth
        label="E-mail"
        value={contact.email ? contact.email : ""}
        onChange={(event) => handleChange("contato.email", event.target.value)}
        sx={{ margin: 1, width: "calc(100% - 16px)" }}
      />
      <Box display="flex" justifyContent="space-between">
        <TextField
          fullWidth
          label="Celular"
          value={contact.celular ? contact.celular : ""}
          onChange={(event) => handleChange("contato.celular", event.target.value)}
          onBlur={(event) => handleMask("contato.celular", event.target.value)}
          sx={{ margin: 1 }}
        />
        <TextField
          fullWidth
          label="Telefone"
          value={contact.telefone ? contact.telefone : ""}
          onChange={(event) => handleChange("contato.telefone", event.target.value)}
          onBlur={(event) => handleMask("contato.telefone", event.target.value)}
          sx={{ margin: 1 }}
        />
      </Box>
    </Box>
  );
}

export default Contact;