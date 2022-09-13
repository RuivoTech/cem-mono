import { DeleteOutline, Edit } from '@mui/icons-material';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, TableCell, Tooltip } from '@mui/material';
import React from 'react';
import { useState } from 'react';

function Options({ deleteMember = () => { }, editMember = () => { }, id = 0, minWidth = 40 }) {
  const [dialogOpened, setDialogOpened] = useState(false);

  function handleCloseDialog() {
    setDialogOpened(false);
  }

  function handleConfirmDelete(id) {
    deleteMember(id);

    setDialogOpened(false);
  }

  return (
    <>
      <TableCell sx={{ minWidth: `${minWidth}px`, width: `${minWidth}px` }}>
        <Tooltip title="Editar">
          <IconButton onClick={() => editMember(id)} size="small" color='primary'>
            <Edit />
          </IconButton>
        </Tooltip>
        <Tooltip title="Remover">
          <IconButton onClick={() => setDialogOpened(true)} size='small' color='error'>
            <DeleteOutline />
          </IconButton>
        </Tooltip>
      </TableCell>
      <Dialog
        open={dialogOpened}
        onClose={handleCloseDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Remover</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Tem certeza que quer remover esta informação?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} variant="contained" color='error'>Cancelar</Button>
          <Button onClick={() => handleConfirmDelete(id)} variant="outlined" color='success'>Confirmar</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default Options;