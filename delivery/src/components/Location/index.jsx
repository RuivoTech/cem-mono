import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { faLocationArrow, faPen } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { getInformation } from "../../services/auth";

import './styles.css';

function Location() {
    const [data, setData] = useState({
        name: "",
        contact: "",
        address: "",
        number: "",
        city: ""
    });
    const history = useHistory();

    useEffect(() => {
        const informations = getInformation();

        if (informations) {
            setData(informations);
        }
    }, []);

    return (
        <div id="locationContainer" onClick={() => { history.push("/dados") }}>
            <div className="locationIcon">
                <FontAwesomeIcon icon={faLocationArrow} color="#00BBAE" size="lg" />
            </div>
            <div className="locationInformation">
                <p className="locationName">
                    {data.name || data.contact ? `${data.name} - ${data.contact}` : "Dados não informados!!"}
                </p>
                <div className="locationAddress">
                    {data.address ? `${data.address}, ${data.number}, ${data.city}` : ""}
                </div>
            </div>
            <div className="editIcon">
                <FontAwesomeIcon icon={faPen} color="#00BBAE" size="lg" />
            </div>
        </div >
    );
}

export default Location;