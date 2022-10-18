import React from 'react';
import { Copyright } from '@mui/icons-material';
import { Box, Typography } from '@mui/material';

import packageJSON from "../../../package.json";

const CustomFooter = () => {
  const date = new Date();
  return (
    <Box
      bgcolor="background.paper"
      width="100%"
      minHeight={24}
      position="fixed"
      left={0}
      bottom={0}
      right={0}
      display="flex"
      justifyContent="space-between"
      padding="10px 20px"
    >
      <Box>
        <Typography variant='subtitle2'>
          RuivoTech <Copyright sx={{ fontSize: 12 }} /> 2018-{date.getFullYear()}
        </Typography>
      </Box>
      <Box>
        <Typography variant='subtitle2'>
          Versão {packageJSON.version}
        </Typography>
      </Box>
    </Box >
  );
}

export default CustomFooter;