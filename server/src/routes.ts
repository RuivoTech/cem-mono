import express from "express";

import MembrosController from "./controllers/MembrosController";
import VisitantesController from "./controllers/VisitantesController";
import LoginController from "./controllers/LoginController";
import UsuarioController from "./controllers/UsuarioController";
import HomeController from "./controllers/HomeController";
import MenuPermisaoController from "./controllers/MenuPermissaoController";
import MinisteriosController from "./controllers/MinisteriosController";
import EventosController from "./controllers/EventosController";
import InscricoesController from "./controllers/InscricoesController";
import DizimosController from "./controllers/DizimosController";
import OfertasController from "./controllers/OfertasController";
import RelatoriosController from "./controllers/RelatoriosController";

const routes = express.Router();

const homeController = new HomeController();
const membrosController = new MembrosController();
const visitantesController = new VisitantesController();
const loginController = new LoginController();
const usuarioController = new UsuarioController();
const menuPermisaoController = new MenuPermisaoController();
const ministeriosController = new MinisteriosController();
const eventosController = new EventosController();
const inscricoesController = new InscricoesController();
const dizimosController = new DizimosController();
const ofertasController = new OfertasController();
const relatoriosController = new RelatoriosController();

routes.post("/login", loginController.login);

routes.get("/relatorios/:route", relatoriosController.switch);

routes.get("/eventosInscricao", eventosController.inscricao);

routes.use(loginController.verificarToken);

routes.route("/home")
    .get(homeController.index);

routes.route("/membros/:id?")
    .get(membrosController.show)
    .get(membrosController.index)
    .post(membrosController.create)
    .put(membrosController.update)
    .delete(membrosController.delete);

routes.route("/visitantes/:id?")
    .get(visitantesController.index)
    .post(visitantesController.create)
    .put(visitantesController.update)
    .delete(visitantesController.delete);

routes.route("/usuarios/:id?")
    .get(usuarioController.index)
    .get(usuarioController.show)
    .post(usuarioController.create)
    .put(usuarioController.update)
    .delete(usuarioController.delete);

routes.route("/menuPermissao")
    .get(menuPermisaoController.index);

routes.route("/ministerios/:id?")
    .get(ministeriosController.index)
    .post(ministeriosController.create)
    .put(ministeriosController.update)
    .delete(ministeriosController.delete);

routes.route("/eventos/:id?")
    .get(eventosController.index)
    .post(eventosController.create)
    .put(eventosController.update)
    .delete(eventosController.delete)

routes.route("/inscricoes/:id?")
    .get(inscricoesController.index)
    .post(inscricoesController.create)
    .put(inscricoesController.update)
    .delete(inscricoesController.delete);

routes.route("/dizimos/:id?")
    .get(dizimosController.index)
    .post(dizimosController.create)
    .put(dizimosController.update)
    .delete(dizimosController.delete);

routes.route("/ofertas/:id?")
    .get(ofertasController.index)
    .post(ofertasController.create)
    .put(ofertasController.update)
    .delete(ofertasController.delete);

export default routes;