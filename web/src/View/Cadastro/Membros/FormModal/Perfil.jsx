import React, { useEffect, useState } from 'react';
import { Autocomplete, Box, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';

function Perfil({ membros = [], handleChange, handleClick, membro, loading }) {
  const [perfil, setPerfil] = useState({});

  useEffect(() => {
    setPerfil({
      id: membro.id,
      nome: membro.nome,
      sexo: membro.sexo,
      ativo: membro.ativo,
      dataCadastro: membro.dataCadastro,
      dataCasamento: membro.dataCasamento,
      dataNascimento: membro.dataNascimento,
      estadoCivil: membro.estadoCivil,
      identidade: membro.identidade,
      profissao: membro.profissao
    })
  }, [membro])

  return (
    <Box>
        <Autocomplete
        loading={loading}
        freeSolo
        getOptionLabel={option => option.nome}
        options={membros}
        value={perfil?.nome}
        onChange={(event, newValue) => handleClick(newValue.id)}
        inputValue={perfil?.nome}
        onInputChange={(event, newInputValue) => handleChange("nome", newInputValue)}
        renderInput={params => <TextField label="Nome" sx={{ marginBottom: 2 }} {...params} />}
      />

      <FormControl>
        <InputLabel id="label-sexo">Sexo</InputLabel>
        <Select
          defaultValue={0}
          labelId='label-sexo'
          id="select-sexo"
          value={parseInt(perfil?.sexo)}
          label="Sexo"
          onChange={(event) => handleChange("sexo", event.target.value)}
        >
          <MenuItem value={0}>Escolha...</MenuItem>
          <MenuItem value={1}>Homem</MenuItem>
          <MenuItem value={2}>Mulher</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}

export default Perfil;