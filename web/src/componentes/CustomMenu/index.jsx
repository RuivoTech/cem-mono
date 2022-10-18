import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { useNavigate } from "react-router-dom";
import { Brightness4Rounded, Brightness7Rounded } from '@mui/icons-material';
import { Tooltip } from '@mui/material';

import { getThemeInUse } from '../../services/authStorage';
import { useAuth } from '../../context/auth';

export default function CustomMenu({ switchSidebar, name }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();
  const { Logout, toggleTheme } = useAuth();

  const isMenuOpen = Boolean(anchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleChangeTheme = () => {
    toggleTheme();
  }

  const handleNavigateToPerfil = () => {
    navigate("/perfil");
    handleMenuClose();
  }

  const handleNavigateToSettings = () => { }

  const handleLogOut = () => {
    Logout();
    navigate("/");
  }

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
      sx={{
        marginTop: 4,
        width: 280
      }}
    >
      <MenuItem onClick={handleNavigateToPerfil}>Perfil</MenuItem>
      <MenuItem onClick={handleNavigateToSettings}>Configurações</MenuItem>
      <MenuItem onClick={handleLogOut}>Sair</MenuItem>
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ width: "100%" }} color="secondary">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
            onClick={() => switchSidebar()}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: 'block', sm: 'block' } }}
          >
            {name}
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: 'flex', md: 'flex' } }}>
            <Tooltip title={`Mudar o tema para ${getThemeInUse() === "dark" ? '"CLARO"' : '"ESCURO"'}`}>
              <IconButton
                size="large"
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleChangeTheme}
                color="inherit"
                sx={{
                  mr: "3px"
                }}
              >
                {
                  getThemeInUse() === "dark" ?
                    <Brightness7Rounded />
                    :
                    <Brightness4Rounded />
                }
              </IconButton>
            </Tooltip>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMenu}
    </Box>
  );
}
