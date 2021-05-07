import { Request, Response } from "express";
import knex from "../database/connection";
import crypto from "crypto";
import jwt from "jsonwebtoken";

import { Usuario } from "../interfaces/UsuarioInterface";
import { Permissao } from "../interfaces/PermissaoInterface";
import Mailer from "../config/Mailer";

const mailer = new Mailer();

class UsuariosController {
    async index() {
        try {
            const usuarios = await knex<Usuario[]>("usuarios")
                .select("id", "nome", "email", "nivel");

            const usuariosFiltrados = await Promise.all(usuarios.map(async (usuario) => {
                const permissoes = await knex("permissao AS p")
                    .join("menuPermissao AS mp", "mp.id", "p.chEsMenuPermissao")
                    .where("chEsUsuario", usuario.id)
                    .select(
                        "p.chEsUsuario",
                        "p.chEsMenuPermissao",
                        "p.inserir",
                        "p.alterar",
                        "p.visualizar",
                        "p.remover",
                        "mp.descricao as menuPermissao"
                    );

                return {
                    ...usuario,
                    permissoes
                }
            }));

            return usuariosFiltrados;
        } catch (error) {
            return { error: error };
        }

    }

    async show(id: number) {
        try {
            const usuario = await knex("usuarios")
                .where("id", id)
                .select("nome", "email", "nivel")
                .first();
            if (usuario) {
                usuario.permissoes = await knex<Permissao[]>("permissao AS p")
                    .join("menuPermissao AS mp", "mp.id", "p.chEsMenuPermissao")
                    .where("chEsUsuario", id)
                    .select(
                        "p.chEsUsuario",
                        "p.chEsMenuPermissao",
                        "p.inserir",
                        "p.alterar",
                        "p.visualizar",
                        "p.remover",
                        "mp.nome AS menuPermissao",
                        "mp.descricao"
                    )
                    .orderBy("mp.ordem", "asc")
                    .distinct();
            }

            return usuario;
        } catch (error) {
            return { error: error };
        }

    }

    async create(usuario: Usuario) {
        try {

            const senha = crypto.randomBytes(6).toString("hex");

            const salt = crypto.randomBytes(16).toString('hex');

            const hash = crypto.pbkdf2Sync(senha, salt,
                1000, 64, `sha512`).toString(`hex`);

            const insertedIds = await knex<Usuario>('usuarios')
                .insert({
                    nome: usuario.nome,
                    email: usuario.email,
                    nivel: usuario.nivel,
                    senha: hash,
                    salt
                });

            const usuarioId = insertedIds[0];

            usuario.id = usuarioId;

            usuario.permissoes.map(async (permissao) => {
                await knex<Permissao>("permissao")
                    .insert({
                        chEsUsuario: usuario.id.toString(),
                        chEsMenuPermissao: permissao.chEsMenuPermissao,
                        inserir: permissao.inserir,
                        alterar: permissao.alterar,
                        visualizar: permissao.visualizar,
                        remover: permissao.remover
                    });
            });

            await mailer.sendMail(usuario.email, usuario.nome, senha);

            return usuario;
        } catch (error) {
            return { error: error }
        }
    }

    async update(usuario: Usuario) {
        try {

            await knex<Usuario>('usuarios')
                .update({
                    id: usuario.id,
                    nome: usuario.nome,
                    email: usuario.email,
                    nivel: usuario.nivel
                })
                .where({ id: usuario.id });

            await knex("permissao").delete().where({ chEsUsuario: usuario.id });
            usuario.permissoes.map(async (permissao) => {
                await knex<Permissao>("permissao")
                    .insert({
                        chEsUsuario: permissao.chEsUsuario,
                        chEsMenuPermissao: permissao.chEsMenuPermissao,
                        inserir: permissao.inserir,
                        alterar: permissao.alterar,
                        visualizar: permissao.visualizar,
                        remover: permissao.remover
                    });
            });

            return usuario
        } catch (error) {
            return { error: error }
        }

    }

    async updatePerfil(request: Request, response: Response) {
        const {
            id,
            nome,
            email,
            senha

        } = request.body;
        try {
            const trx = await knex.transaction();

            const salt = crypto.randomBytes(16).toString('hex');

            const novaSenha = crypto.pbkdf2Sync(senha, salt,
                1000, 64, `sha512`).toString(`hex`);

            const usuario = {
                id,
                nome,
                email,
                senha: novaSenha,
                salt
            }

            await trx<Usuario>('usuarios').transacting(trx).update(usuario).where({ id });

            await trx.commit();

            return usuario
        } catch (error) {
            return { error: error }
        }

    }

    async delete(id: number) {
        try {
            await knex("usuarios")
                .delete()
                .where("id", id);

            return { mensagem: "Usuário removido com sucesso." };
        } catch (error) {
            return { error };
        }
    }

    async getUsuario(authorization: String) {

        const trx = await knex.transaction();

        const autorizado = jwt.verify(String(authorization).split(' ')[1], "RuivoTech-BibliotecaDD") as Usuario;
        const usuario = await trx<Usuario>("usuarios").transacting(trx)
            .where({ email: autorizado.email })
            .first();

        trx.commit();

        return usuario;
    }
}

export default UsuariosController;
