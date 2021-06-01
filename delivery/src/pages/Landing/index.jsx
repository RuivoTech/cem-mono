import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Button from '../../components/Button';

import { getInformation } from "../../services/auth";

import "./styles.css";

function Landing() {
    const history = useHistory();

    useEffect(() => {
        if (getInformation()) {
            history.push("/loja");
        }
        // eslint-disable-next-line
    }, [])

    return (
        <>
            <div id="page-landing">
                <div className="card">
                    <p className="textVisit">
                        Olá, visitante
                    </p>
                    <p className="textInformation">
                        Não encontrei suas informações, será que você poderia me dizer?
                    </p>
                </div>
                <Button className="btnInformation" label="INFORMAR AGORA" onClick={() => history.push("/dados")} />
                <Button className="btnLater" label="DEIXAR PRA DEPOIS" onClick={() => history.push("/loja")} />
                <div className="developed">
                    <a href="https://github.com/RuivoTech" target="_blank" rel="noopener noreferrer">&copy; RuivoTech</a>
                </div>
            </div>
        </>
    );
}

export default Landing;