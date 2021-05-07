import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

import knex from "../database/connection";
import LoginModel from "../Model/LoginModel";

const loginModel = new LoginModel();

interface Usuario {
    id: number,
    nomeUsuario: string,
    nome: string,
    email: string,
    nivel: number,
    senha: string,
    salt: string
}

class LoginController {
    async login(request: Request, response: Response) {
        const { email, senha } = request.body;

        const token = await loginModel.login(email, senha);

        return response.json(token);
    }

    async verificarToken(request: Request, response: Response, next: NextFunction) {
        const { authorization } = request.headers;

        if (authorization && authorization.split(' ')[0] === 'Bearer') {
            if (authorization.split(' ')[1] === "undefined") {
                return response.json({ error: "undefined" });
            }
            try {
                const autorizado = jwt.verify(authorization.split(' ')[1], "RuivoTech-BibliotecaDD") as Usuario;
                const usuario = await knex<Usuario>("usuarios")
                    .where({ email: autorizado.email })
                    .first();

                if (!usuario) {
                    return response.json({ error: "Você não tem autorização para acessar esta rota!" });
                }

                next();
            } catch (error) {

                return response.json({ error: error });
            }
        } else {
            return response.json({ error: "Você não tem autorização para acessar esta rota!" });
        }
    }
}

export default LoginController;