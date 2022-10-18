import React, { useEffect, useRef, useState } from 'react';
import { Autocomplete, Box, TextField } from '@mui/material';
import { DesktopDatePicker } from '@mui/x-date-pickers';
import { GridActionsCellItem } from '@mui/x-data-grid';
import { Delete } from '@mui/icons-material';

import CustomTable from '../../../../componentes/Table';

const Family = ({ membro, membros = [], handleChange, handleSelectChild, handleRemoveChild }) => {
  const columns = [
    {
      field: "nome",
      headerName: "Nome",
      flex: 1
    },
    {
      field: "actions",
        headerName: "Ações",
        type: "actions",
        getActions: ({ id }) => {
          console.log(id)
            return [
                <GridActionsCellItem
                icon={<Delete />}
                label="Remove"
                onClick={() => handleRemoveChild(id)}
                />,
            ];
        }
    }
  ]
  const [spouse, setSpouse] = useState("");
  const [dad, setDad] = useState("");
  const [mother, setMother] = useState("");
  const childRef = useRef();

  useEffect(() => {
    if (membro?.id) {
      const newSpouse = membros.filter(member => member.id === membro?.parentes.chEsConjuge);
      const newDad = membros.filter(member => member.id === membro?.parentes.chEsPai);
      const newMother = membros.filter(member => member.id === membro?.parentes.chEsMae);

      setSpouse(newSpouse[0] ? newSpouse[0] : "");
      setDad(newDad[0] ? newDad[0] : "");
      setMother(newMother[0] ? newMother[0] : "");
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
    handleSelectChild(child);
    childRef.current.value = "";
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
          getOptionLabel={(option) => option.nome}
          options={membros}
          onChange={(_, value) => handleClickChild(value)}
          renderInput={params => <TextField
            ref={childRef}
            label="Filho(a)"
            sx={{ margin: 1, width: "calc(100% - 16px)" }}
            {...params}
          />
          }
        />
      </Box>
      <Box>
        <CustomTable
        title="Filhos"
          data={membro?.parentes?.filhos}
          columns={columns}
          getRowId={(row) => row.chEsFilho}
        />
      </Box>
    </Box>
  );
}

export default Family;