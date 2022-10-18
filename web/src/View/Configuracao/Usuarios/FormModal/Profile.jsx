import React, { useEffect, useState } from 'react';
import { Autocomplete, Box, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';

const Profile = ({ handleChange, handleClick, user, members = [] }) => {
  const [profile, setProfile] = useState({});

  useEffect(() => {
    setProfile(user)
  }, [user])

  return (
    <Box>
      <Autocomplete
        fullWidth
        freeSolo
        options={members.map((membro) => membro.nome)}
        value={user?.nome}
        onChange={(event, newValue) => handleClick(newValue)}
        inputValue={profile?.nome ? profile?.nome : ""}
        onInputChange={(event, newInputValue) => handleChange("nome", newInputValue)}
        renderInput={params => <TextField label="Nome" sx={{ margin: 1, width: "calc(100% - 16px)" }} {...params} />}
      />
      <TextField
        label="E-mail"
        value={profile?.email}
        onChange={event => handleChange("email", event.target.value)}
        fullWidth
        sx={{ margin: 1, width: "calc(100% - 16px)" }}
      />
      <FormControl sx={{ margin: 1, minWidth: "25%" }}>
        <InputLabel id="label-nivel">Nivel</InputLabel>
        <Select
          displayEmpty
          labelId='label-nivel'
          id="select-nivel"
          value={profile?.nivel ? profile?.nivel : ""}
          label="Nivel"
          onChange={(event) => handleChange("nivel", event.target.value)}
        >
          <MenuItem value="">Escolha</MenuItem>
          <MenuItem value="Admin">Admin</MenuItem>
          <MenuItem value="Editor(a)">Editor(a)</MenuItem>
          <MenuItem value="Secretário(a)">Secretário(a)</MenuItem>
          <MenuItem value="Tesoureiro(a)">Tesoureiro(a)</MenuItem>
          <MenuItem value="Professor(a)">Professor(a)</MenuItem>
        </Select>
      </FormControl>
      <FormControl sx={{ margin: 1, minWidth: "25%" }}>
        <InputLabel id="label-active">Ativo</InputLabel>
        <Select
          displayEmpty
          labelId='label-active'
          id="select-active"
          value={profile?.active ? profile?.active : -1}
          label="Ativo"
          onChange={(event) => handleChange("active", event.target.value)}
        >
          <MenuItem value={-1}>Escolha</MenuItem>
          <MenuItem value={1}>Sim</MenuItem>
          <MenuItem value={0}>Não</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}

export default Profile;