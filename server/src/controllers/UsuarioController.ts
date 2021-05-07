import { Request, Response, NextFunction } from "express";

import UsuarioModel from "../Model/UsuarioModel";

const usuarioModel = new UsuarioModel();

class UsuarioController {
    async index(request: Request, response: Response, next: NextFunction) {
        try {
            if (request.params.id) {
                next();
            } else {
                const usuarios = await usuarioModel.index();

                return response.json(usuarios);
            }
        } catch (error) {
            return response.json(error);
        }
    }

    async show(request: Request, response: Response) {
        try {
            const { id } = request.params;

            const usuario = await usuarioModel.show(Number(id));

            return response.json(usuario);
        } catch (error) {
            return response.json(error);
        }
    }

    async create(request: Request, response: Response) {
        try {
            const usuario = request.body;

            const novoUsuario = await usuarioModel.create(usuario);

            return response.json(novoUsuario);
        } catch (error) {
            return response.json(error);
        }
    }

    async update(request: Request, response: Response) {
        try {
            const usuario = request.body;

            const novoUsuario = await usuarioModel.update(usuario);

            return response.json(novoUsuario);
        } catch (error) {
            return response.json({ error: error });
        }
    }

    async delete(request: Request, response: Response) {
        const usuario = await usuarioModel.delete(Number(request.params.id));

        return response.json(usuario);
    }
}

export default UsuarioController;