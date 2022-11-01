import React from 'react';
import { Box, FormControl, FormControlLabel, FormLabel, Switch, TextField } from '@mui/material';
import { DesktopDatePicker } from '@mui/x-date-pickers';

const Church = ({ membro, handleChange }) => {
  return (
    <Box>
      <Box display="flex" justifyContent="space-between">
        <FormControl component="fieldset">
          <FormLabel component="legend">É batizado?</FormLabel>
          <FormControlLabel
            control={
              <Switch checked={membro?.igreja?.ehBatizado === 0} />
            }
            label={membro?.igreja?.ehBatizado === 0 ? "Sim" : "Não"}
          />
        </FormControl>
        <DesktopDatePicker
          label="Data do batismo"
          inputFormat='DD/MM/YYYY'
          value={membro?.igreja?.dataBatismo ? membro?.igreja?.dataBatismo : null}
          onChange={value => handleChange("igreja.dataBatismo", value)}
          renderInput={(params) => <TextField sx={{ margin: 1 }} {...params} />}
        />
        <TextField
          value={membro?.igreja?.igrejaBatizado}
          onChange={event => handleChange("igrejaBatizado", event.target.value)}
          label="Igreja batizado(a)"
          sx={{ margin: 1, width: "calc(50% - 16px)" }}
        />
      </Box>
      <Box display="flex" justifyContent="space-between">
        <TextField
          value={membro?.igreja?.ultimoPastor}
          onChange={event => handleChange("ultimoPastor", event.target.value)}
          label="Ultimo Pastor"
          sx={{ margin: 1, width: "calc(50% - 16px)" }}
        />
        <TextField
          value={membro?.igreja?.ultimaIgreja}
          onChange={event => handleChange("ultimaIgreja", event.target.value)}
          label="Ultima Igreja"
          sx={{ margin: 1, width: "calc(50% - 16px)" }}
        />
      </Box>
    </Box>
  );
}

export default Church;