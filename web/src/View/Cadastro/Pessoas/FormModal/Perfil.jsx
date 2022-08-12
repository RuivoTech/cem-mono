import React, { useState } from 'react';
import { Autocomplete, Box, TextField } from '@mui/material';

const options = ['Option 1', 'Option 2', 'Option 3', 'Option 4'];

function Perfil({ membros, membro = {}, handleChange }) {
  const [value, setValue] = useState(options[0]);
  const [inputValue, setInputValue] = useState('');

  return (
    <div className="panel-body">
      <div className="row">
        <div className="col-sm-10 col-md-10 col-lg-10 col-xl-10">
          <div className="form-group">
            <Autocomplete
              value={value}
              onChange={(event, newValue) => {
                setValue(newValue);
              }}
              inputValue={inputValue}
              onInputChange={(event, newInputValue) => {
                setInputValue(newInputValue);
              }}
              id="controllable-states-demo"
              options={membros}
              sx={{ width: 300 }}
              renderInput={(params) => <TextField {...params} label="Controllable" />}
            />
            {/* <Autocomplete
              value={membro.nome ? membro.nome : ""}
              onChange={(_, value) => handleChange("nome", value)}
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
            /> */}
          </div>
        </div>
        <div className="col-sm-4 col-md-4 col-lg-4">
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
        </div>
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
      </div>
    </div>
  );
}

export default Perfil;