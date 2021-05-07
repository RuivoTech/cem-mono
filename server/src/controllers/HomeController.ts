import { Request, Response } from "express";

import HomeModel from "../Model/HomeModel";

const homeModel = new HomeModel();

class HomeController {
    async index(request: Request, response: Response) {
        let membros = await homeModel.index();

        return response.json(membros);
    }

}

export default HomeController