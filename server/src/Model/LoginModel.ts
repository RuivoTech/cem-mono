import knex from "../database/connection";
import crypto from "crypto";
import jwt from 'jsonwebtoken';

import { Usuario } from "../interfaces/UsuarioInterface";

class LoginModel {
    async login(email: string, senha: string) {
            const trx = await knex.transaction();

            const usuario = await trx<Usuario>('usuarios').transacting(trx)
                .where({ email })
                .first();

            await trx.commit();

            const salt: string = usuario?.salt || "";

            const hash = crypto.pbkdf2Sync(
                senha,
                salt,
                1000,
                64,
                `sha512`
            )
                .toString(`hex`);

            if (usuario && usuario?.senha === hash) {
                const token = jwt.sign(
                    {
                        id: usuario.id,
                        email: usuario.email,
                        nome: usuario.nome,
                        nivel: usuario.nivel
                    },
                    "RuivoTech-BibliotecaDD"
                )

                return { token };
            }

        throw new Error("Por favor, verifique suas credenciais!");
    }
}

export default LoginModel;