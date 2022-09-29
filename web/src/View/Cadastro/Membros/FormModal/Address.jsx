import React, { useEffect, useState } from 'react';
import { Box, Button, InputAdornment, TextField } from '@mui/material';
import Axios from 'axios';
import { Place } from '@mui/icons-material';

const Address = ({ membro, handleChange }) => {
  const endereco = membro?.endereco;
  const [address, setAddress] = useState({})

  useEffect(() => {
    setAddress({
      zipCode: endereco?.cep,
      city: endereco?.cidade,
      state: endereco?.uf,
      place: endereco?.logradouro,
      number: endereco?.numero,
      complement: endereco?.complemento
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [membro])

  function fetchAddress() {
    Axios.get("https://viacep.com.br/ws/" + address.zipCode + "/json/")
      .then(response => {
        handleChange("endereco", {
          cep: address.zipCode,
          logradouro: response.data.logradouro,
          cidade: response.data.localidade,
          uf: response.data.uf
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  return (
    <Box>
      <Box display="flex" justifyContent="flex-start" alignItems="center">
      <TextField
        label="CEP"
        value={address.zipCode}
          onChange={(event) => handleChange("endereco.cep", event.target.value)}
        sx={{ margin: 1 }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Place />
            </InputAdornment>
          ),
        }}
      />
        <Button variant='outlined' color='primary' size='large' onClick={() => fetchAddress()}>Buscar</Button>
      </Box>
      <Box display="flex" justifyContent="space-between">
        <TextField
          InputLabelProps={{
            shrink: Boolean(address.place)
          }}
          fullWidth
          label="Endereço"
          value={address.place}
          onChange={(event) => handleChange("endereco.logradouro", event.target.value)}
          sx={{ margin: 1 }}
        />
      </Box>
      <Box display="flex" justifyContent="flex-start">
        <TextField
          label="Número"
          value={address.number}
          onChange={(event) => handleChange("endereco.numero", event.target.value)}
          sx={{ margin: 1 }}
        />
        <TextField
          label="Complemento"
          value={address.complement}
          onChange={(event) => handleChange("endereco.complemento", event.target.value)}
          sx={{ margin: 1 }}
          fullWidth
        />
      </Box>
      <Box display="flex" justifyContent="flex-start">
        <TextField
          InputLabelProps={{
            shrink: Boolean(address.city)
          }}
          label="Cidade"
          value={address.city}
          onChange={(event) => handleChange("endereco.cidade", event.target.value)}
          sx={{ margin: 1 }}
        />
        <TextField
          InputLabelProps={{
            shrink: Boolean(address.state)
          }}
          label="Estado"
          value={address.state}
          onChange={(event) => handleChange("endereco.estado", event.target.value)}
          sx={{ margin: 1, width: 80 }}
        />
      </Box>
    </Box>
  );
}

export default Address;