import React, { useEffect, useState } from 'react';
import { Autocomplete, Box, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { DesktopDatePicker } from '@mui/x-date-pickers';

const Profile = ({ membros = [], handleChange, handleClick, membro }) => {
  const [profile, setProfile] = useState({});

  useEffect(() => {
    if (membro?.id) {
      setProfile({
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
    }
  }, [membro])

  return (
    <Box>
      <Box display="flex" justifyContent="space-between">
      <Autocomplete
        fullWidth
        freeSolo
          options={membros.map((membro) => membro.nome)}
          value={membro?.nome}
        onChange={(event, newValue) => handleClick(newValue)}
          inputValue={profile?.nome ? profile?.nome : ""}
        onInputChange={(event, newInputValue) => handleChange("nome", newInputValue)}
          renderInput={params => <TextField label="Nome" sx={{ margin: 1, width: "calc(100% - 16px)" }} {...params} />}
      />
        <DesktopDatePicker
          label="Data de nascimento"
          inputFormat='DD/MM/YYYY'
          disableFuture
          value={profile.dataNascimento ? profile?.dataNascimento : null}
          onChange={value => handleChange("dataNascimento", value)}
          renderInput={(params) => <TextField sx={{ margin: 1 }} {...params} />}
        />
      </Box>
      <Box display="flex" justifyContent="flex-start">
        <FormControl sx={{ margin: 1, minWidth: 150 }} fullWidth>
          <InputLabel id="label-sexo">Sexo</InputLabel>
          <Select
            displayEmpty
            labelId='label-sexo'
            id="select-sexo"
            value={profile?.sexo ? parseInt(profile?.sexo) : 0}
            label="Sexo"
            onChange={(event) => handleChange("sexo", event.target.value)}
          >
            <MenuItem value={0}>Escolha</MenuItem>
            <MenuItem value={1}>Homem</MenuItem>
            <MenuItem value={2}>Mulher</MenuItem>
          </Select>
        </FormControl>
        <FormControl sx={{ margin: 1, minWidth: 150 }} fullWidth>
          <InputLabel id="label-estadoCivil">Estado Civil</InputLabel>
          <Select
            displayEmpty
            labelId='label-estadoCivil'
            id="select-estadoCivil"
            value={profile?.estadoCivil ? parseInt(profile?.estadoCivil) : 0}
            label="Estado Civil"
            onChange={(event) => handleChange("estadoCivil", event.target.value)}
          >
            <MenuItem value={0}>Escolha</MenuItem>
            <MenuItem value={1}>Solteiro(a)</MenuItem>
            <MenuItem value={2}>Casado(a)</MenuItem>
            <MenuItem value={3}>Divorciado(a)</MenuItem>
            <MenuItem value={4}>Viúvo(a)</MenuItem>
            <MenuItem value={5}>Separado(a)</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <Box display="flex" justifyContent="flex-start">
        <TextField
          label="Identidade"
          value={profile.identidade ? profile.identidade : ""}
          onChange={(event) => handleChange("identidade", event.target.value)}
          sx={{ margin: 1 }}
          fullWidth
        />
        <TextField
          label="Profissão"
          value={profile.profissao ? profile.profissao : ""}
          onChange={(event) => handleChange("profissao", event.target.value)}
          sx={{ margin: 1 }}
          fullWidth
        />
      </Box>
    </Box>
  );
}

export default Profile;