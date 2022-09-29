import React, { useEffect, useState } from 'react';
import { Autocomplete, Box, TextField } from '@mui/material';
import { DesktopDatePicker } from '@mui/x-date-pickers';
import CustomTable from '../../../../componentes/Table';

const colums = {
  title: "Filhos",
  fields: [
    {
      id: "nome",
      label: "Nome",
      minWidth: 180
    },
    {
      id: "email",
      label: "E-mail",
      minWidth: 180
    },
    {
      id: "celular",
      label: "Celular",
      minWidth: 120
    },
    {
      id: "options",
      label: "Ações",
      minWidth: 80,
      align: "center"
    }
  ]
}

const Family = ({ membro, membros = [], handleChange }) => {
  const [spouse, setSpouse] = useState(null);
  const [dad, setDad] = useState(null);
  const [mother, setMother] = useState(null);

  useEffect(() => {
    if (membro?.id) {
      const newSpouse = membros.filter(member => member.id === membro?.parentes.chEsConjuge);
      setSpouse(newSpouse[0]);
      const newDad = membros.filter(member => member.id === membro?.parentes.chEsPai);
      setDad(newDad[0]);
      const newMother = membros.filter(member => member.id === membro?.parentes.chEsMae);
      setMother(newMother[0]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function handleClick(field, value) {
    switch (field) {
      case "spouse":
        setSpouse(value)
        break;
      case "dad":
        setDad(value);
        break;
      case "mother":
        setMother(value);
        break;
      default:
        break;
    }
  }

  function handleClickChild(child) {

  }

  return (
    <Box>
      <Box display="flex" justifyContent="space-between">
        <Autocomplete
          disabled={membro?.estadoCivil !== 2}
          fullWidth
          freeSolo
          getOptionLabel={membro => membro.nome}
          options={membros}
          value={spouse}
          onChange={(_, newValue) => handleClick("spouse", newValue)}
          inputValue={membro?.parentes?.nomeConjuge ? membro?.parentes?.nomeConjuge : ""}
          onInputChange={(_, newInputValue) => handleChange("parentes.nomeConjuge", newInputValue)}
          renderInput={params => <TextField label="Conjuge" sx={{ margin: 1, width: "calc(100% - 16px)" }} {...params} />}
        />
        <DesktopDatePicker
          disabled={membro?.estadoCivil !== 2}
          label="Data de casamento"
          inputFormat='DD/MM/YYYY'
          value={membro?.dataCasamento ? membro?.dataCasamento : null}
          onChange={value => handleChange("dataCasamento", value)}
          renderInput={(params) => <TextField sx={{ margin: 1 }} {...params} />}
        />
      </Box>
      <Box display="flex" justifyContent="space-between">
        <Autocomplete
          fullWidth
          freeSolo
          getOptionLabel={membro => membro.nome}
          options={membros}
          value={dad}
          onChange={(_, newValue) => handleClick("dad", newValue)}
          inputValue={membro?.parentes?.nomePai ? membro?.parentes?.nomePai : ""}
          onInputChange={(_, newInputValue) => handleChange("parentes.nomePai", newInputValue)}
          renderInput={params => <TextField label="Pai" sx={{ margin: 1, width: "calc(100% - 16px)" }} {...params} />}
        />
        <Autocomplete
          fullWidth
          freeSolo
          getOptionLabel={membro => membro.nome}
          options={membros}
          value={mother}
          onChange={(_, newValue) => handleClick("mother", newValue)}
          inputValue={membro?.parentes?.nomeMae ? membro?.parentes?.nomeMae : ""}
          onInputChange={(_, newInputValue) => handleChange("parentes.nomeMae", newInputValue)}
          renderInput={params => <TextField label="Mãe" sx={{ margin: 1, width: "calc(100% - 16px)" }} {...params} />}
        />
      </Box>
      <Box display="flex" justifyContent="space-between">
        <Autocomplete
          fullWidth
          freeSolo
          options={membros.map((membro) => membro.nome)}
          onChange={(_, newValue) => handleClickChild(newValue)}
          renderInput={params => <TextField label="Filho(a)" sx={{ margin: 1, width: "calc(100% - 16px)" }} {...params} />}
        />
      </Box>
      <Box>
        <CustomTable
          data={membro?.parentes?.filhos}
          colums={colums}
        />
      </Box>
    </Box>
  );
}

export default Family;