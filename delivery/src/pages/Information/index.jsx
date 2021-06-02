import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';

import Button from '../../components/Button';
import Input from '../../components/Input';
import Menu from "../../components/Menu";
import { getInformation, saveInformation } from "../../services/auth";

import "./styles.css";

function Information() {
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
        const localData = getInformation();

        if (localData) {
            setData(localData);
        }
    }, [])

    const handleChange = (event) => {
        setData({
            ...data,
            [event.name]: event.value
        });
    }

    const handleClick = () => {
        if (data.name && data.contact) {
            saveInformation(data);

            setTimeout(() => {
                history.push("/");
            }, 1000);
        }
    }

    const setLabel = () => {
        if (!data.name || !data.contact) {
            return "Por favor, preencha o nome e contato!!";
        } else {
            return "SALVAR";
        }
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
                    />
                    <Input
                        className="informationInput"
                        onChange={event => handleChange(event)}
                        name="address"
                        label="Endereço"
                        description="Informe o seu endereço"
                        value={data.address}
                    />
                    <Input
                        className="informationInput"
                        onChange={event => handleChange(event)}
                        name="number"
                        label="Número"
                        description="Informe o seu número"
                        value={data.number}
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
                    />
                    <span className="informationObservation">Os campos com <sup>*</sup> são obrigatórios</span>
                    <Button className={`${!data.name || !data.contact ? "btnDisabled" : null} btnSave`} label={setLabel()} onClick={() => handleClick()} />
                </div>
            </div>
        </>
    );
}

export default Information;