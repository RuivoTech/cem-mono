import React, { useEffect, useState } from 'react';
import { Box, CircularProgress, Modal, Typography } from '@mui/material';

import api from '../../../../services/api';
import Profile from './Profile';
import { useAuth } from '../../../../context/auth';

const FormModal = ({ show, handleShow, userId = 0 }) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState({});
  const [members, setMembers] = useState([]);
  const { user: userAuth } = useAuth();

  useEffect(() => {
    fetchMembers();
    if (parseInt(userId) !== 0)
      fetchUser(userId)

    setLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userAuth, userId])

  function fetchUser(id) {
    api.get("/usuarios/" + userId)
      .then(response => {
        setUser(response.data)
      })
      .catch(error => {
        console.log(error)
      })
  }

  function fetchMembers() {
    api.get("/membros")
      .then(response => {
        if (!response.data.message)
          setMembers(response.data?.membros)
      })
      .catch(error => {
        console.log(error)
      })
  }

  function handleChange(field, value) {
    setUser({
      ...user,
      [field]: value
    })
  }

  function handleClick(userSelected) {
    console.log(userSelected)
    setUser({
      ...user,
      nome: userSelected?.nome,
      email: userSelected?.contato?.email
    })
  }

  return (
    <Modal
      open={show}
      onClose={handleShow}
    >
      {loading ?
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <CircularProgress />
        </Box>
        :
        <Box sx={{
          position: 'absolute',
          top: '10px',
          left: '50%',
          transform: 'translate(-50%, 0%)',
          width: {
            xs: "80%",
            md: "60%"
          },
          bgcolor: 'background.paper',
          border: '2px solid #c7c7c7',
          boxShadow: 24,
          padding: 2,
          marginTop: 4
        }}
        >
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Typography variant="h6" component="h2">
              {user?.nome ? `${user?.nome}` : "Novo usuário"}
            </Typography>
          </Box>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Box
              component="h3"
              borderBottom="1px solid grey"
            >
              Perfil
            </Box>
            <Profile
              user={user}
              members={members}
              handleChange={(field, value) => handleChange(field, value)}
              handleClick={(userSelected) => handleClick(userSelected)}
            />
          </Box>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Box
              component="h3"
              borderBottom="1px solid grey"
            >
              Permissões
            </Box>
            <Profile
              user={user}
              members={members}
              handleChange={(field, value) => handleChange(field, value)}
              handleClick={(userSelected) => handleClick(userSelected)}
            />
          </Box>
        </Box>
      }
    </Modal>
  );
}

export default FormModal;