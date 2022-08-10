import { Autocomplete, Box, TextField } from '@mui/material';
import React from 'react';
import { useState } from 'react';

function Perfil({ membros }) {
  const [membro, setMembro] = useState({});

  return (
    <div className="panel-body">
      <div className="row">
        <div className="col-sm-10 col-md-10 col-lg-10 col-xl-10">
          <div className="form-group">
            <Autocomplete
              id='find-name'
              options={membros}
              autoHighlight
              getOptionLabel={(option) => option.nome}
              renderOption={(props, option) => (
                <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                  {option.id} - {option.nome}
                </Box>
              )}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Nome"
                  inputProps={{
                    ...params.inputProps,
                    autoComplete: 'new-password', // disable autocomplete and autofill
                  }}
                />
              )}
            />
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
              onChange={() => { }}
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
              value={membro?.dataNascimento} onChange={() => { }} />
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
              value={membro?.identidade}
              onChange={() => { }}
            />
          </div>
        </div>
        <div className="col-sm-4 col-md-4 col-lg-4">
          <div className="form-group">
            <label htmlFor="profissao">Profissão:</label>
            <input className="form-control" id="profissao" name="profissao" type="text"
              value={membro?.profissao} onChange={() => { }} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Perfil;