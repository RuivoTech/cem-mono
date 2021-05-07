import React from "react";
import { useLocation } from "react-router-dom";

const Menu = ({ nome }) => {
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