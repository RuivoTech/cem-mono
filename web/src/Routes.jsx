import React from 'react';
import { Route, Routes } from 'react-router';

import PrivateRoute from './PrivateRoute';
import Evento from './View/Cadastro/Evento';
import Membros from './View/Cadastro/Membros';
import Ministerios from './View/Cadastro/Ministerio';
import Visitantes from './View/Cadastro/Visitantes';
import Perfil from './View/Configuracao/Perfil';
import Usuarios from './View/Configuracao/Usuarios';
import Campanha from './View/Delivery/Campanha';
import Pedido from './View/Delivery/Pedido';
import Home from './View/Home';
import Inscricoes from './View/Inscricoes';
import Login from './View/Login';
import NotFound from './View/NotFound';
import Recuperar from './View/Recuperar';
import Relatorios from './View/Relatorios';

function CustomRoutes() {
  return (
    <Routes>
      <Route
        path="/dashboard"
        element={
          <PrivateRoute name="Dashboard" group="Dashboard">
            <Home />
          </PrivateRoute>
        }
      />
      <Route
        path="/membros"
        element={
          <PrivateRoute name="Membros" group="Secretaria">
            <Membros />
          </PrivateRoute>
        }
      />
      <Route
        path="/visitantes"
        element={
          <PrivateRoute name="Visitantes" group="Secretaria">
            <Visitantes />
          </PrivateRoute>
        }
      />
      <Route
        path="/ministerios"
        element={
          <PrivateRoute name="Ministérios" group="Secretaria">
            <Ministerios />
          </PrivateRoute>
        }
      />
      <Route
        path="/eventos"
        element={
          <PrivateRoute name="Eventos" group="Secretaria">
            <Evento />
          </PrivateRoute>
        }
      />
      <Route
        path="/campanhas"
        element={
          <PrivateRoute name="Campanhas" group="Secretaria">
            <Campanha />
          </PrivateRoute>
        }
      />
      <Route
        path="/pedidos"
        element={
          <PrivateRoute name="Pedidos" group="Secretaria">
            <Pedido />
          </PrivateRoute>
        }
      />
      <Route
        path="/perfil"
        element={
          <PrivateRoute name="Perfil">
            <Perfil />
          </PrivateRoute>
        }
      />
      <Route
        path="/usuarios"
        element={
          <PrivateRoute name="Usuários" group="Configurações">
            <Usuarios />
          </PrivateRoute>
        }
      />
      <Route path="/relatorios/*" element={Relatorios} />
      <Route path="/recuperar" element={Recuperar} />
      <Route path="/inscricao" element={Inscricoes} />
      <Route index path="/" element={<Login />} />
      <Route path="*" element={NotFound} />
    </Routes>
  );
}

export default CustomRoutes;