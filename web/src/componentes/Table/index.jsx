import React, { useState } from 'react';
import { Paper, CircularProgress, Box, Button, Divider } from '@mui/material';
import Options from './Options';
import { DataGrid, ptBR } from '@mui/x-data-grid';

function CustomTable({
  title,
  data = [],
  columns = {},
  loading = false,
  showOptions = false,
  showHeaderButtons = false,
  deleteMember,
  editMember,
  openFormModal,
  rowHeight,
  getRowId,
  sx
}) {
  const [pageSize, setPageSize] = useState(10)
  const rowsPerPageOptions = [5, 10, 15, 20, 25];

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
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 1
        }}
      >
        <Box component="h3" sx={{ marginBlockStart: "0", marginBlockEnd: "0" }}>
          {title}
        </Box>
        <Box width={showHeaderButtons ? "90%" : "0"} display="flex" justifyContent="flex-end">
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
      <DataGrid
        rows={data}
        columns={columns}
        rowsPerPageOptions={rowsPerPageOptions}
        pageSize={pageSize}
        onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
        pagination
        autoHeight
        rowHeight={rowHeight ? rowHeight : 32}
        localeText={ptBR.components.MuiDataGrid.defaultProps.localeText}
        getRowId={(row) => getRowId ? getRowId(row) : row.id}
      />
    </Paper>
  );
}

export default CustomTable;