import React, { useState } from 'react';
import { Paper, CircularProgress, TableContainer, Table, TableHead, Box, TableRow, TableCell, TableBody, TablePagination, Button, Divider } from '@mui/material';
import Options from './Options';

function CustomTable({
  data = [],
  colums = {},
  loading = true,
  showOptions = false,
  showHeaderButtons = false,
  deleteMember,
  editMember,
  openFormModal,
  sx
}) {
  const rowsPerPageOptions = [5, 10, 15, 20, 25];
  const [rowsPerPage, setRowsPerPage] = useState(rowsPerPageOptions[1]);
  const [page, setPage] = useState(0);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', width: "100%", height: "calc(100vh - 65px)", justifyContent: "center", alignItems: "center" }}>
        <CircularProgress />
      </Box>
    )
  }

  return (
    <Paper sx={{
      padding: "16px",
      margin: "16px",
      width: "calc(100% - 34px)",
      ...sx
    }}
    >
      <Box
        component="div"
        sx={{
          padding: "5px 10px 5px 10px",
          display: "flex",
          justifyContent: "space-evenly"
        }}
      >
        <Box width="90%" component="h3" sx={{ marginBlockStart: "0", marginBlockEnd: "0" }}>
          {colums.title}
        </Box>
        <Box width="90%" display="flex" justifyContent="flex-end">
          {showHeaderButtons &&
            <>
              <Button variant="outlined" color='info' size="small" onClick={() => { }} sx={{ mr: "5px" }}>
                Exportar
              </Button>
              <Button
                variant="contained"
                color='success'
                size="small"
                onClick={(event) => openFormModal(event)}
                sx={{
                  paddingLeft: "3em",
                  paddingRight: "3em"
                }}
              >
                Novo
              </Button>
            </>
          }
        </Box>
      </Box>
      <Divider />
      <TableContainer>
        <Table size='small'>
          <TableHead>
            <TableRow>
              {colums.fields.map((field) => (
                <TableCell
                  key={field.id}
                  align={field.align}
                  sx={{ minWidth: field.minWidth, width: field.minWidth }}
                >
                  {field.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover key={row.id}>
                    {colums.fields.map((column) => {
                      const value = column.id.indexOf(".") > 0 ? row[column.id.split(".")[0]][column.id.split(".")[1]] : row[column.id];

                      if (column.id === "options") {
                        return <Options
                          key={column.id}
                          deleteMember={deleteMember}
                          editMember={editMember} id={row.id}
                        />
                      }

                      return (
                        <TableCell
                          key={column.id}
                          align={column.align}
                          sx={{ minWidth: column.minWidth, width: column.minWidth }}
                        >
                          {column.format ? column.format(value) : value}
                        </TableCell>
                      )
                    })}
                  </TableRow>
                )
              })}
            {data.length === 0 && (
              <TableRow>
                <TableCell colSpan={6}>Nenhuma informação encontrada.</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      {data.length > 0 && (
        <TablePagination
          labelRowsPerPage="Linhas"
          labelDisplayedRows={({ from, to, count }) => {
            return `Exibindo ${from}-${to} de ${count !== -1 ? count : to}`
          }}
          rowsPerPageOptions={rowsPerPageOptions}
          component="div"
          count={data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          sx={{
            mr: "10px"
          }}
        />
      )}
    </Paper>
  );
}

export default CustomTable;