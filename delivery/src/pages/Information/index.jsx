import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';

import Button from '../../components/Button';
import Input from '../../components/Input';
import Menu from "../../components/Menu";
import { getInformation, saveInformation } from "../../services/auth";

import "./styles.css";

function Information() {
    const [params, setParams] = useState();
    const [buttonStatus, setButtonStatus] = useState("none");
    const [addressRequired, setAddressRequired] = useState(false);
    const [data, setData] = useState({
        name: "",
        contact: "",
        postalCode: "",
        address: "",
        number: "",
        complement: "",
        city: ""
    });
    const history = useHistory();

    useEffect(() => {
        const urlParams = new URLSearchParams(history.location.search);
        setParams(urlParams);
        const localData = getInformation();

        if (parseInt(urlParams.get("delivery"))) {
            setAddressRequired(true);
        }

        if (Object.keys(localData).length > 0) {
            setData(localData);
        }
        // eslint-disable-next-line
    }, [])

    const handleChange = (event) => {
        setData({
            ...data,
            [event.name]: event.value
        });
    }

    const handleClick = () => {
        setButtonStatus("loading");
        if (verifyInformations()) {
            saveInformation(data);

            setButtonStatus("success");

            if (params.get("from")) {
                setTimeout(() => {
                    history.push("/carrinho");
                }, 1000);
            } else {
                setTimeout(() => {
                    history.push("/loja");
                }, 1000);
            }
        }
    }

    const setLabel = () => {
        if (!verifyInformations()) {
            return "Por favor, preencha os campos obrigatórios!!";
        } else {
            return "SALVAR";
        }
    }

    const verifyInformations = () => {
        let proceed = true;
        Object.keys(data).forEach(function (key) {
            if (key !== "complement" && !data[key]) {
                if (addressRequired) {
                    proceed = false;
                }
            } else if (!data.name || !data.contact) {
                proceed = false;
            }
        });
        return proceed;
    }

    return (
        <>
            <div id="informationcontainer">
                <Menu showBack showCart={false} />
                <div className="informationContent">
                    <Input
                        className="informationInput"
                        onChange={event => handleChange(event)}
                        name="name"
                        label="Nome"
                        description="Informe o seu nome"
                        value={data.name}
                        required
                    />
                    <Input
                        className="informationInput"
                        onChange={event => handleChange(event)}
                        name="contact"
                        label="Contato"
                        description="Informe o seu telefone"
                        value={data.contact}
                        required
                    />
                    <Input
                        className="informationInput"
                        onChange={event => handleChange(event)}
                        name="postalCode"
                        label="Cep"
                        description="Informe o seu cep"
                        value={data.postalCode}
                        required={addressRequired}
                    />
                    <Input
                        className="informationInput"
                        onChange={event => handleChange(event)}
                        name="address"
                        label="Endereço"
                        description="Informe o seu endereço"
                        value={data.address}
                        required={addressRequired}
                    />
                    <Input
                        className="informationInput"
                        onChange={event => handleChange(event)}
                        name="number"
                        label="Número"
                        description="Informe o seu número"
                        value={data.number}
                        required={addressRequired}
                    />
                    <Input
                        className="informationInput"
                        onChange={event => handleChange(event)}
                        name="complement"
                        label="Complemento"
                        description="Informe o seu complemento"
                        value={data.complement}
                    />
                    <Input
                        className="informationInput"
                        onChange={event => handleChange(event)}
                        name="city"
                        label="Cidade"
                        description="Informe a sua cidade"
                        value={data.city}
                        required={addressRequired}
                    />
                    <span className="informationObservation">Os campos com <sup>*</sup> são obrigatórios</span>
                    <div className="buttonContainer">
                        <Button
                            className={`${!verifyInformations() ? "btnDisabled" : ""} btnSave`}
                            label={setLabel()}
                            onClick={() => handleClick()}
                            status={buttonStatus}
                            showLoading
                        />
                    </div>
                </div>
            </div>
        </>
    );
}

export default Information;