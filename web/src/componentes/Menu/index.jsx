import React, { useContext } from "react";
import { Button } from "@material-ui/core";
import { MenuBook } from "@material-ui/icons";
import { useLocation } from "react-router-dom";

import { AuthContext } from "../../context";

const Menu = ({ nome }) => {
    const { switchSidebar } = useContext(AuthContext);
    const location = useLocation();

    const renderHeader = (texto) => {
        const textoQuebrado = texto.split("/");

        return textoQuebrado[2] ? textoQuebrado[1] + " > " + nome : nome;
    }

    return (
        <div className="menu">
            <div className="col-sm-12 col-lg-12">
                <div className="row">
                    <div className="col-lg-6">
                        <Button onClick={switchSidebar}>
                            <MenuBook />
                        </Button>
                    </div>
                    <div className="col-lg-6">
                        <h2 className="h2 m-b-none" style={{ textTransform: 'capitalize' }}>
                            {renderHeader(location.pathname)}
                        </h2>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Menu;