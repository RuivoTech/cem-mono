import React from "react";

const Coluna = ({ valor, className, tamanho, corpo, ...props }) => {
    return (
        <>
            <td className={"align-middle " + className} style={{ width: tamanho + "vw" }} {...props}>{valor}</td>
        </>
    )
}

export default Coluna;