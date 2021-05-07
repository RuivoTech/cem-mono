import { Request, Response } from "express";

import MenuPermissaoModel from "../Model/MenuPermissaoModel";

const menuPermissaoModel = new MenuPermissaoModel();

class MenuPermissaoController {
    async index(request: Request, response: Response) {
        const menuPermissao = await menuPermissaoModel.index();

        return response.json(menuPermissao);
    }
}

export default MenuPermissaoController;