import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import Button from '../../components/Button';
import Loading from "../../components/Loading";

import { getInformation } from "../../services/auth";

import "./styles.css";

function Landing() {
    const history = useHistory();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const informations = getInformation();

        if (informations && informations.name) {
            history.push("/loja");
        }
        setLoading(false);
        // eslint-disable-next-line
    }, [])

    return (
        <>
            {loading ?
                <Loading />
                :
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
            }
        </>
    );
}

export default Landing;