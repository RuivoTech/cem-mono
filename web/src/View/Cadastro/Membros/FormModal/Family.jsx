import React, { useEffect, useState } from 'react';
import { Box, TextField } from '@mui/material';
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

const Family = ({ membro, filhos, membros, handleChange }) => {
  const [family, setFamily] = useState({})

  useEffect(() => {
    setFamily({
      spouseID: membro.parentes.chEsConjuge,
      spouse: membro.parentes.nomeConjuge,
      weddingDate: membro.dataCasamento,
      motherId: membro.parentes.chEsMae,
      mother: membro.parentes.nomeMae,
      dadID: membro.parentes.chEsPai,
      dad: membro.parentes.nomePai,
      children: membro.parentes.filhos
    })
  }, [membro])

  return (
    <Box>
      <Box display="flex" justifyContent="space-between">
        <TextField
          fullWidth
          label="Cônjuge"
          value={family.spouse}
          onChange={(event) => handleChange("parentes.nomeConjuge", event.target.value)}
          sx={{ margin: 1, width: "calc(100% - 16px)" }}
        />
        <DesktopDatePicker
          label="Data de casamento"
          inputFormat='DD/MM/YYYY'
          disableFuture
          value={family.weddingDate}
          onChange={value => handleChange("dataCasamento", value)}
          renderInput={(params) => <TextField sx={{ margin: 1 }} {...params} />}
        />
      </Box>
      <Box display="flex" justifyContent="space-between">
        <TextField
          fullWidth
          label="Pai"
          value={family.dad}
          onChange={(event) => handleChange("parentes.pai", event.target.value)}
          sx={{ margin: 1, width: "calc(100% - 16px)" }}
        />
        <TextField
          fullWidth
          label="Mãe"
          value={family.mother}
          onChange={(event) => handleChange("parentes.mae", event.target.value)}
          sx={{ margin: 1, width: "calc(100% - 16px)" }}
        />
      </Box>
      <Box display="flex" justifyContent="space-between">
        <TextField
          label="Filho(a)"
          value={family.mother}
          onChange={(event) => handleChange("parentes.mae", event.target.value)}
          sx={{ margin: 1, width: "calc(50% - 16px)" }}
        />
      </Box>
      <Box>
        <CustomTable
          data={family.children}
          colums={colums}
        />
      </Box>
    </Box>
  );
}

export default Family;