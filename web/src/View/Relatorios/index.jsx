import React from "react";
import { Route } from "react-router-dom";

import Membro from "./Membro";

const Relatorios = () => {
    return (
        <Route path="/relatorios/membro" component={Membro} />
    )
}

export default Relatorios;