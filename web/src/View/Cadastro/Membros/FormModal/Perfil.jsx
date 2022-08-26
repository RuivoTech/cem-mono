import React, { useState } from 'react';
import { Autocomplete, Box, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { useEffect } from 'react';

function Perfil({ membros, membro, handleChange }) {
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    if (inputValue.length > 0 && membro) {
      setInputValue(membro?.nome);
    }
  }, [membro, inputValue])

  return (
    <Box component="div">
      <Box width="25vw">
        <Autocomplete
          getOptionLabel={option => option?.nome}
          value={membro?.nome}
          onChange={(_, value) => handleChange("nome", value?.nome)}
          inputValue={inputValue}
          onInputChange={(_, value) => setInputValue(value)}
          id='find-name'
          options={membros}
          renderOption={(props, option) => (
            <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props} key={option.id}>
              {option.id} - {option.nome}
            </Box>
          )}
          renderInput={(params) => <TextField {...params} label="Nome" />}
        />
      </Box>
      <Box width="10vw">
        <FormControl fullWidth>
          <InputLabel id="genderLabel">Sexo</InputLabel>
          <Select
            labelId='genderLabel'
            id="genderSelect"
            value={membro?.sexo}
            label="Sexo"
            onChange={value => handleChange("sexo", value)}
          >
            <MenuItem value=""></MenuItem>
            <MenuItem value={1}>Homem</MenuItem>
            <MenuItem value={2}>Mulher</MenuItem>
          </Select>
        </FormControl>
      </Box>
      {/* <div className="col-sm-4 col-md-4 col-lg-4">
        <div className="form-group">
          <label htmlFor="sexo">Sexo:</label>
          <select
            className="custom-select"
            id="sexo"
            name="sexo"
            value={membro?.sexo}
            onChange={(event) => handleChange("sexo", event.currentTarget.value)}
          >
            <option value="0">Escolha...</option>
            <option value="1">Homem</option>
            <option value="2">Mulher</option>
          </select>
        </div>
      </div> */}
      <div className="col-sm-4 col-md-4 col-lg-4">
        <div className="form-group">
          <label htmlFor="dataNascimento">Data de Nascimento:</label>
          <input className="form-control" id="dataNascimento" name="dataNascimento" type="date"
            value={membro?.dataNascimento ? membro.dataNascimento.split("T")[0] : ""} onChange={() => { }} />
        </div>
      </div>
      <div className="col-sm-4 col-md-4 col-lg-4">
        <div className="form-group">
          <label htmlFor="estadoCivil">Estado Civil:</label>
          <select className="custom-select" id="estadoCivil" name="estadoCivil" value={membro?.estadoCivil}
            onChange={() => { }}>
            <option value="0">Escolha...</option>
            <option value="1">Solteiro(a)</option>
            <option value="2">Casado(a)</option>
            <option value="3">Divorciado(a)</option>
            <option value="4">Viúvo(a)</option>
            <option value="5">Separado(a)</option>
          </select>
        </div>
      </div>
      <div className="col-sm-4 col-md-4 col-lg-4">
        <div className="form-group">
          <label htmlFor="indentidade">Identidade:</label>
          <input
            className="form-control"
            id="indentidade"
            name="identidade"
            type="text"
            value={membro?.identidade ? membro.identidade : ""}
            onChange={() => { }}
          />
        </div>
      </div>
      <div className="col-sm-4 col-md-4 col-lg-4">
        <div className="form-group">
          <label htmlFor="profissao">Profissão:</label>
          <input className="form-control" id="profissao" name="profissao" type="text"
            value={membro?.profissao ? membro.profissao : ""} onChange={() => { }} />
        </div>
      </div>
    </Box>
  );
}

export default Perfil;