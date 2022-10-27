import { Box, Button, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <Box sx={{
      height: "calc(100vh - 16px)",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center"
    }}>
      <Typography component="h1" variant="h3">
        Página não encontrada!
      </Typography>
      <Button variant="outlined" onClick={() => navigate(-1)}>Voltar</Button>
    </Box>
  )
}

export default NotFound;