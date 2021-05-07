import knex from "../database/connection";

class MenuPermissaoModel {
    async index() {
        const menuPermissao = knex("menuPermissao").orderBy([{ column: "ordem", order: "asc" }]);

        return menuPermissao;
    }
}

export default MenuPermissaoModel;